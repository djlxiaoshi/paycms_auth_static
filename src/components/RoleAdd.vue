<!-- 权限管理 -> 角色管理 -> 添加角色 -> 子组件 -->
<template>
  <div class="RoleAdd">
    <el-button icon="plus" @click="roleAdd">添加角色</el-button>
    <el-dialog title="添加角色" v-model="dialogVisibleAdd" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" align="center">
      <el-row>
        <el-col :span="6">角色</el-col>
        <el-col :span="18">
        <el-input v-model="role" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">菜单选择</el-col>
        <el-col :span="18">
          <el-row type="flex" justify="space-between">
            <el-cascader
              :options="options"
              v-model="optionsData"
              @change="handleChange">
            </el-cascader>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">已选菜单</el-col>
        <el-col :span="18">
          <el-table :data="menuData">
            <el-table-column
              prop="firstMenu"
              label="一级菜单"
              align="center">
            </el-table-column>
            <el-table-column
              prop="secondMenu"
              label="二级菜单"
              align="center">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作"
              align="center">
              <template scope="scope">
                <el-button @click.native.prevent="delRow(scope.$index, menuData)" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">备注</el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="remark">
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleAddCancel">取 消</el-button>
        <el-button type="primary" @click="roleAddSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleAdd',
  data () {
    return {
      role: '',
      firstMenu: '',
      secondMenu: '',
      remark: '',
      dialogVisibleAdd: false,
      optionsData: [],
      options: [],
      menuData: []
    }
  },
  methods: {
    // 添加菜单
    handleChange (value) {
      let one = value[0]
      let two = value[1]
      let obj = {
        firstMenu: one,
        secondMenu: two
      }
      this.menuData.push(obj)
      for (let data of this.options) {
        if (data.value === one) {
          for (let i = 0; i < data.children.length; i++) {
            if (data.children[i].value === two) {
              data.children[i].disabled = true
            }
          }
        }
      }
      this.optionsData = []
    },
    // 删除菜单
    delRow (index, rows) {
      let array = rows[index]
      for (let data of this.options) {
        if (data.value === array.firstMenu) {
          for (let i = 0; i < data.children.length; i++) {
            if (data.children[i].value === array.secondMenu) {
              data.children[i].disabled = ''
            }
          }
        }
      }
      rows.splice(index, 1)
    },
    // 添加角色
    roleAdd () {
      this.$http.get('/api/roleAdd').then((res) => {
        this.options = res.data.menu.slice()
        for (let data of this.options) {
          data.label = data.value
          if (data.children) {
            for (let i = 0; i < data.children.length; i++) {
              let value = data.children[i]
              data.children[i] = {
                'value': value,
                'label': value
              }
            }
          }
        }
        this.dialogVisibleAdd = true
      }, (res) => {
        // error callback
        this.$message.error('服务器异常！')
      })
    },
    // 提交
    roleAddSubmit () {
      if (this.role === '') {
        this.$message.error('角色不能为空！')
        return
      }
      if (this.menuData.length === 0) {
        this.$message.error('菜单不能为空！')
        return
      }
      this.$http.post('/api/roleAddSubmit', {
        'role': this.role,
        'menuData': this.menuData,
        'remark': this.remark
      }).then((res) => {
        if (res.data.msg) {
          this.role = ''
          this.remark = ''
          this.menuData = []
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          // 更新表格
          this.$emit('loading')
        } else {
          this.$message.error('服务器异常！')
        }
      }, (res) => {
        // error callback
        this.$message.error('服务器异常！')
      })
      this.dialogVisibleAdd = false
    },
    // 取消
    roleAddCancel () {
      this.role = ''
      this.remark = ''
      this.menuData = []
      this.dialogVisibleAdd = false
      this.$message('已取消添加！')
    }
  }
}
</script>

<style scoped>
.el-row{
  line-height: 36px;
  border-bottom: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
}
.el-row .el-col{
  padding: 5px;
}
.el-row>.el-col{
  border-top: 1px solid #dfe6ec;
}
.el-row>.el-col:first-child{
  text-align: center;
}
.el-row>.el-col:nth-child(2){
  border-left: 1px solid #dfe6ec;
}
.RoleAdd>.el-button{
  width: 100%
}
</style>
