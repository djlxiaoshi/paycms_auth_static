<!-- 权限申请/权限管理 -> 选择器 -> 子组件 -->
<template>
  <div class="select-application">
    <el-button @click="toggleSelected" class="please-select">--请选择--</el-button>
    <div class="select-box-wrap" id="select-box-wrap" v-show="showSelectAuthBox">
      <div class="box-header clearfix">
        <h5 class="box-title">应用选择器</h5>
        <div class="btn-wrap">
          <el-button type="primary" size="mini" @click="addSelect">确定</el-button>
          <el-button type="warning" size="mini" @click="clearAll">置空</el-button>
        </div>
      </div>
      <div class="box-body">
        <ul class="left-part">
          <li @click="switchMenu($event,index)" :class="{active: changeFlag === index}"
              v-for="(item, index) in menuData"><a href="javascript:void(0)">请选择{{item.labelName}}</a>
          </li>
          <!--<li @click="switchMenu($event,1)" :class="{active: changeFlag === 1}"><a href="javascript:void(0)">请选择平台</a>-->
          <!--</li>-->
          <!--<li @click="switchMenu($event,2)" :class="{active: changeFlag === 2}"><a href="javascript:void(0)">请选择大厅</a>-->
          <!--</li>-->
          <!--<li @click="switchMenu($event,3)" :class="{active: changeFlag === 3}"><a href="javascript:void(0)">请选择终端</a>-->
          <!--</li>-->
          <!--<li @click="switchMenu($event,4)" :class="{active: changeFlag === 4}"><a href="javascript:void(0)">请选择应用包</a>-->
          <!--</li>-->
          <!--<li @click="switchMenu($event,5)" :class="{active: changeFlag === 5}"><a-->
          <!--href="javascript:void(0)">请选择APPID</a>-->
          <!--</li>-->
        </ul>
        <div class="right-part">
          <div class="data-list">
            <div v-show="changeFlag === index" v-for="(item, index) in authSelect">
              <el-checkbox :indeterminate="isIndeterminate(index, subOpt)"
                           v-model="authSelect[index]['isAll']"
                           @change="handleCheckAllChange($event, subOpt, authSelect[index])">全选/全不选
              </el-checkbox>
              <div class="select-auth-input">
                <el-input placeholder="请输入关键词" icon="search" v-model="input"></el-input>
              </div>
              <el-checkbox-group v-model="authSelect[index]['checked']"
                                 @change="handleCheckedCitiesChange(subOpt, authSelect[index])">
                <div v-for="item in subOpt" v-show="result(item)">
                  <el-checkbox :label="item"></el-checkbox>
                </div>
              </el-checkbox-group>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 双向绑定搜索框
        input: '',
        changeFlag: 0,
        showSelectAuthBox: false,
        menuData: [],
        // 通过上级选择后的筛选信息
        filterData: {},
        subOpt: [],
        // 多选框，V-model双向绑定队列
        authSelect: []
      }
    },
    methods: {
      toggleSelected () {
        this.showSelectAuthBox = !this.showSelectAuthBox
      },
      switchMenu ($event, num) {
        // let _this = this
        // 传给后台的信息
        let _filterData = {}
        let _data = this.authSelect
        $event.target.style.background = 'lightgreeen'
        this.changeFlag = num
        this.input = ''

//      _filterData.currentMenu = {
//        'parentMenuId': this['menuData'][num]['menuId'],
//        'parentMenuName': this['menuData'][num]['menuName']
//      }

        _filterData.currentMenu = this['menuData'][num]['menuName']

       // _filterData.filterMsg = this.authSelect

        // 筛选信息格式转换
        for (let i = 0; i < _data.length; i++) {
          let _catch = {}
          // _catch.isAll = _data[i]['isAll']
          _catch.value = _data[i]['checked']
          _filterData[_data[i]['menuName']] = _catch
        }

        console.log('打印选择器需要传到后台的数据')
        console.dir(_filterData)

        // 后台获取数据,目前无数据，要后台给
        this.$http.post('/api/apply/subOpt', _filterData).then(response => {
          // _this.subOpt = response.body.data
        }, response => {
          // error callback
        })
      },
      handleCheckAllChange ($event, subOpt, authItem) {
        authItem['checked'] = $event.target.checked ? subOpt : []
      },
      handleCheckedCitiesChange (subOpt, authItem) {
        let checkedCount = authItem['checked'].length
        authItem['isAll'] = checkedCount === subOpt.length
//        清空输入框，便于直接输入
        this.input = ''
      },
//    // 显示部分选择状态
      isIndeterminate (index, subOpt) {
        return this.authSelect[index]['checked']['length'] > 0 && this.authSelect[index]['checked']['length'] < subOpt.length
      },
      result (item) {
        return !this.input.trim() || item.toUpperCase().indexOf(this.input.trim().toUpperCase()) > -1
      },
      clearAll () {
        this.$confirm('确定要清空所有吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.authSelect.forEach((item) => {
            item['checked'] = []
            item['isAll'] = false
          })
        }).catch(() => {
        })
      },
      addSelect () {
        // 判断是否填写完整
        let _appidData = this.authSelect.slice(-1)
        if (_appidData[0]['checked']['length'] === 0) {
          this.$message({
            message: '请至少选择一种APPID',
            type: 'warning'
          })
          return
        }

        // 触发父组件事件
        this.$emit('addSelData', this.authSelect)
        // 所有复选框复位
//        _data.forEach((item) => {
//          item['checked'] = []
//          item['isAll'] = false
//        })
        // 关闭权限选择框
        this.showSelectAuthBox = !this.showSelectAuthBox
      }
    },
    computed: {},
    props: ['parentRouter'],
    created () {
      // 保存this指针
      let _this = this
      let _filterData = {}
      // 发送ajax请求，获取菜单选项
      this.$http.get('/api/apply/parentMenu').then(response => {
        // 拿到菜单数据
        _this.menuData = response.body.data
        console.log('父级菜单信息')
        console.log(this.menuData)
        // 动态创建选中状态队列
        _this.menuData.forEach((value) => {
          // 每一个v-model绑定对象初始化,这里要循环创建，不然是按引用传递，会相互影响
          let _checkedItem = {}
          _checkedItem.checked = []
          _checkedItem.isAll = false  // 记住每个选项是否是全选状态
          _checkedItem.menuName = value.menuName
          _this.authSelect.push(_checkedItem)
        })
      }, response => {
        // error callback
      }).then(response => {
        _filterData.currentMenu = {
          'parentMenuId': _this['menuData'][0]['menuId'],
          'parentMenuName': _this['menuData'][0]['menuName']
        }
        _filterData.filterMsg = _this.authSelect
        // 发送ajax请求，后台提取数据
        _this.$http.post('/api/apply/subOpt', _filterData).then(response => {
         // _this.subOpt = response.body.data   //  后台返回数据
          _this.subOpt = [
            '德州扑克',
            '斗地主',
            '地方棋牌',
            '印尼棋牌',
            'IPOKER',
            '四人地主',
            '三公',
            '麻将',
            '博定'
          ]
        }, response => {
          // error callback
        })
      })
    },
    watch: {}
  }
</script>

<style scope>
  .select-application {
    display: inline-block;
  }

  .please-select {
    display: inline-block;
    width: 200px;
    text-align: center;
    color: black;
    border-right: 1px solid #e5e5e5;
  }

  .please-select:hover {
    text-decoration: none;
  }

  .select-box-wrap {
    position: absolute;
    top: 50px;
    z-index: 20;
    background: #ffffff;
    border: 5px solid #e5e5e5;
    border-radius: 5px;
  }

  .box-header {
    background: #0099CC;
    line-height: 14px;
    padding: 10px;
  }

  .box-title {
    float: left;
    margin: 0;
    font-weight: 700;
    font-size: 14px;
  }

  .btn-wrap {
    float: right;
  }

  .box-body {
    display: flex;
  }

  .left-part {
    flex: 0 0 130px;
    height: 100%;
    text-align: center;
    border-right: 5px solid #e5e5e5;
    padding-bottom: 20px;
  }

  .right-part {
    flex: 1;
    height: 100%;
    width: 400px;
    padding: 10px 20px;
  }

  .left-part li {
    padding: 10px;
  }

  .select-auth-input {
    margin: 10px 0;
  }

  .data-list {
    padding-right: 20px;
    height: 215px;
    overflow: auto;
  }

  .active {
    background: lightsalmon;
  }
</style>
