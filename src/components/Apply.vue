<!-- 权限申请 -> 一级路由 -->
<template>
  <div class="auth-application">
    <div class="applicant-msg">
      <span class="border-bottom">申请人</span>
      <el-row>
        <el-col :xs="24" :sm="8" :md="6" :lg="5">
          姓名：
          <span v-text="userMsg.name"></span>
          (
          <span></span>
          )
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="7">
          所属部门：
          <span v-text="userMsg.department"></span>
        </el-col>
      </el-row>
    </div>
    <el-row class="authority">
      <el-col class="border-bottom">申请内容：</el-col>
      <el-col :xs="24" :sm="3" :md="2" :lg="2">应用权限：</el-col>
      <el-col :xs="24" :sm="21" :md="22" :lg="22">支付后台APPID权限，会根据数据后台的BPID权限自动开通，如果没有某个应用的appid权限，请自行去data后台开通对应的bpid权限，如果在数据后台开通权限后，在支付后台还是提示无权限，请退出账号，清空浏览器缓存，重新登录一下即可查看；如果有疑问，请及时联系AnneDu，谢谢。
      </el-col>
    </el-row>
    <el-tabs value="first" style="min-height:400px" @tab-click="tabSwitch">
      <el-tab-pane label="查询权限" name="first">
        <div class="view-content">
          <table class="my-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>查看权限</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="showFlag === false">
              <tr v-for="(item, index) in viewAuth" v-show="item.have">
                <td>{{index + 1}}</td>
                <td>
                  <el-checkbox :checked="item.have" v-model.sync="item.have" disabled>{{item.authName}}</el-checkbox>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="(item, index) in viewAuth">
                <td>{{index + 1}}</td>
                <td>
                  <el-checkbox :checked="item.have" v-model.sync="item.have" @change="showPrompt">{{item.authName}}</el-checkbox>
                </td>
              </tr>
            </template>

            </tbody>
            <tfoot class="full-width" style="text-align: center;">
            <tr>
              <td colspan="2" style="padding: 0;">
                <el-button type="text" @click="showMore" :icon="showFlag ? 'arrow-up' : 'arrow-down'"></el-button>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
        <!--申请理由-->
        <div class="application-reason-wrap">
          <el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="viewAuthReason"></el-input>
        </div>

        <div class="bottom-btn-wrap">
          <el-button type="primary" @click="cancelApply">取消</el-button>
          <el-button type="primary" @click="viewAuthApply">提出申请</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="操作权限" name="second">
        <!--权限选择器-->
        <div class="select-auth-wrap">
          <select-auth v-on:addSelData="addSelData"></select-auth>
        </div>
        <!--待添加权限-->
        <div class="add-auth-wrap">
          <el-table :data="waitingAdd" border style="width: 100%">
            <el-table-column label="游戏" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.game">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="平台" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.platform">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="大厅" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.hall">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="终端" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.terminal">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="应用包" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.appPackage">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="APPID应用" align="center" width="300">
              <template scope="scope">
                <span v-for="child in scope.row.appid">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="权限内容" align="center">
              <el-table-column label="权限1" align="center">
                <template scope="scope">
                  <el-checkbox v-model="scope.row.deliverRefund">发货退款</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="权限2" align="center">
                <template scope="scope">
                  <el-checkbox v-model="scope.row.warningSetting">报警设置</el-checkbox>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="业务审核人" prop="assessor" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-button size="small" type="danger" @click="addAuth(scope.row, scope.$index)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--已添加权限-->
        <div class="own-auth-wrap">
          <el-table :data="addedData" border style="width: 100%">
            <el-table-column label="游戏" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.game">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="平台" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.platform">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="大厅" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.hall">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="终端" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.terminal">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="应用包" align="center">
              <template scope="scope">
                <span v-for="child in scope.row.appPackage">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="APPID应用" align="center" width="300">
              <template scope="scope">
                <span v-for="child in scope.row.appid">{{child}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="权限内容" align="center">
              <el-table-column label="权限1" align="center">
                <template scope="scope">
                  <el-checkbox v-model="scope.row.deliverRefund">发货退款</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="权限2" align="center">
                <template scope="scope">
                  <el-checkbox v-model="scope.row.warningSetting">报警设置</el-checkbox>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="业务审核人" prop="assessor" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-button size="small" type="danger" @click="deleteAuth(scope.row, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--申请理由-->
        <div class="application-reason-wrap">
          <el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="operateAuthReason"></el-input>
        </div>

        <div class="bottom-btn-wrap">
          <el-button type="primary" @click="cancelApply">取消</el-button>
          <el-button type="primary" @click="operateAuthApply">提出申请</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
import SelectAuth from 'components/SelectAuth'
export default {
  data () {
    return {
      showFlag: false,
      viewAuthReason: '',
      operateAuthReason: '',
      userMsg: {},
      checkList: [],
      waitingAdd: [],
      addedData: [],
      viewAuth: []
    }
  },
  components: {
    SelectAuth
  },
  methods: {
    showMore () {
      this.showFlag = !this.showFlag
    },
    showPrompt ($event) {
      console.log(1)
      if ($event.target.checked) {
        this.$alert('您所申请的内容，将会转到对应的业务审核人审核，如果您申请的内容与自己的工作职责不符，将不会予以通过；请慎重申请，谢谢', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    deleteAuth (item, index) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.addedData.splice(index, 1)
      }).catch(() => {
        console.log('已删除该权限申请')
      })
    },
    addSelData (data) {
      // 加入等待队列
      //  这里要对数据格式做些处理，然后push到waitingAdd数组中
      let _dataCache = {}
      _dataCache.game = data[0]['isAll'] ? ['全部游戏'] : data[0]['checked']
      _dataCache.platform = data[1]['isAll'] ? ['全部平台'] : data[1]['checked']
      _dataCache.hall = data[2]['isAll'] ? ['全部'] : data[2]['checked']
      _dataCache.terminal = data[3]['isAll'] ? ['全部'] : data[3]['checked']
      _dataCache.appPackage = data[4]['isAll'] ? ['全部'] : data[4]['checked']
      _dataCache.appid = data[5]['isAll'] ? ['全部'] : data[5]['checked']
      _dataCache.deliverRefund = false
      _dataCache.warningSetting = false
      console.dir(_dataCache)
      this.waitingAdd.push(_dataCache)
    },
    addAuth (item, index) {
      // 设置两个复选框
//        item.deliverRefund = this.deliverRefund
//        item.warningSetting = this.warningSetting
      // 添加权限
      console.log(item)
      this.addedData.push(item)
      // 将预添加队列中的删除
      this.waitingAdd.splice(index, 1)
      // 复位复选框
//        this.deliverRefund = false
//        this.warningSetting = false
    },
    cancelApply () {
      this.$confirm('确定取消申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.alert('取消申请')
      }).catch(() => {
        window.alert('点错了')
      })
    },
    operateAuthApply () {
      // 整合数据 addedData(操作权限) + 查看权限  +  申请理由
      let _oneApply = {}
      _oneApply.operateAuthLists = this.addedData
      _oneApply.applyReason = this.operateAuthReason

      if (_oneApply.operateAuthLists.length === 0) {
        this.$message({
          message: '请至少选择一种权限',
          type: 'warning'
        })
        console.log('由于无权限申请，申请被拒')
      } else if (_oneApply.applyReason.trim() === '') {
        this.$message({
          message: '申请理由不能为空',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '申请成功',
          type: 'success'
        })
        console.log('这就是一条后台数据')
        console.log(_oneApply)

        // 满足申请条件，发送ajax请求
        this.$http.post('/api/apply/operateAuthApply', _oneApply).then(response => {

        }, response => {
          // error callback
        })
      }
    },
    viewAuthApply () {
      let _this = this
      // 整合数据 查看权限  +  申请理由
      let _oneApply = {}
      _oneApply.viewAuth = this.viewAuth
      _oneApply.applyReason = this.viewAuthReason

      // 判断查看权限是否为空
      let _isNotEmpty = this.viewAuth.some((item) => {
        return item.have
      })
      if (!_isNotEmpty) {
        this.$message({
          message: '请至少选择一种权限',
          type: 'warning'
        })
        console.log('由于无权限申请，申请被拒')
      } else if (_oneApply.applyReason.trim() === '') {
        this.$message({
          message: '申请理由不能为空',
          type: 'warning'
        })
      } else {
        console.log('这就是一条后台数据')
        console.log(_oneApply)

        // 满足申请条件，发送ajax请求
        this.$http.post('/api/apply/viewAuthApply', _oneApply).then(response => {
          if (response.errno === 0) {
            _this.$message({
              message: '申请成功',
              type: 'success'
            })
          }
        }, response => {
          // error callback
        })
      }
    },
    tabSwitch () {
    }
  },
  created () {
    // 获取申请人基本信息
    this.$http.get('/api/apply/userMsg').then(response => {
      this.userMsg = response.body.data
    }, response => {
      // error callback
    })

    // 获取申请人已拥有的查看权限
    this.$http.get('/api/apply/viewAuth').then(response => {
      this.viewAuth = response.body.data
    }, response => {
      // error callback
    })
  }
}
</script>

<style scope>
.auth-application{
  margin: 10px;
}
.applicant-msg{
  line-height: 34px
}
.applicant-msg>span:first-child{
  display: block;
  font-weight: bold;
}
.authority,
.view-content{
  margin: 10px 0 20px 0;
  line-height: 34px;
}
.authority>.el-col:first-child,
.authority>.el-col:nth-child(2){
  font-weight: bold;
}
.my-table{
  width: 400px;
}
.my-table td{
  text-align: center;
}
.view-content .more-content{
  display: inline-block
}
.select-auth-wrap,
.add-auth-wrap,
.own-auth-wrap,
.application-reason-wrap,
.bottom-btn-wrap{
  margin-bottom: 50px;
}
.bottom-btn-wrap{
  text-align: center;
}
</style>
