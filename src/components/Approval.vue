<!-- 我的审批 -> 一级路由 -->
<template>
  <div class='my-appoval-wrap container'>
    <h4>审批列表</h4>
    <hr>
    <el-tabs value="viewAuth" @tab-click="tabSwitch">

      <!--公共部分-->
      <div class="batch-operate">
        <el-button type="primary" size="small" @click="authPass(multipleSelection,true)">批量通过</el-button>
        <el-button type="warning" size="small" @click="authReject(multipleSelection, true)">批量驳回</el-button>
      </div>
      <div class="clearfix" size="small">
        <el-input class="search-input" placeholder="请输入关键字" icon="search"></el-input>
      </div>

      <!--查看权限-->
      <el-tab-pane name="viewAuth">
        <span slot="label">
          <el-badge :value="newMsg.arvView" class="item" size="small">
            <div style="margin: -10px 0;">查看权限</div>
          </el-badge>
        </span>
        <el-table :data="viewAuth" border style="width: 100%" resizable="true" border
                  @selection-change="handleSelectionChange" @select="add">
          <el-table-column label="选项" align="center" width="50" type="selection"></el-table-column>
          <el-table-column label="申请人" prop="applicant" align="center" width="90"></el-table-column>
          <el-table-column label="申请人角色" prop="role" align="center"></el-table-column>
          <el-table-column label="所属部门" prop="department" align="center"></el-table-column>
          <el-table-column label="查看权限" prop="viewAuth" align="left" header-align="center">
            <template scope="scope">
              <el-checkbox-group v-model="scope.row.auth">
                <el-checkbox :label="item" :key="index" v-for="(item, index) in scope.row.auth" disabled
                             style="margin-left: 10px;"></el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column label="申请时间" prop="applyTime" align="center"></el-table-column>
          <el-table-column label="申请理由" prop="reason" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="authPass(scope.row, false)">审核通过</el-button>
              <el-button type="warning" size="mini" @click="authReject(scope.row, false)">审核驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!--操作权限-->
      <el-tab-pane name="operateAuth">
        <span slot="label">
          <el-badge :value="newMsg.arvOpt" class="item" size="small">
            <div style="margin: -10px 0;">操作权限</div>
          </el-badge>
        </span>
        <div class="operate-auth">
          <el-table :data="operateAuth" border style="width: 100%" @select="add"
                    @selection-change="handleSelectionChange">
            <el-table-column label="选项" align="center" width="50" type="selection"></el-table-column>
            <el-table-column label="申请人" prop="applicant" align="center" width="90"></el-table-column>
            <el-table-column label="申请人角色" prop="role" align="center"></el-table-column>
            <el-table-column label="所属部门" prop="department" align="center"></el-table-column>
            <el-table-column label="游戏" prop="game" align="center"></el-table-column>
            <el-table-column label="平台" prop="platform" align="center"></el-table-column>
            <el-table-column label="大厅" prop="hall" align="center"></el-table-column>
            <el-table-column label="终端" prop="terminal" align="center"></el-table-column>
            <el-table-column label="应用包" prop="appPackage" align="center"></el-table-column>
            <el-table-column label="APPID应用" prop="APPID" align="center"></el-table-column>
            <el-table-column label="权限内容" align="left" width="240" header-align="center">
              <template scope="scope">
                <el-checkbox-group v-model="scope.row.auth">
                  <el-checkbox :label="item" :key="index" v-for="(item, index) in scope.row.auth" disabled
                               style="margin-left: 10px;"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" prop="applyTime" align="center"></el-table-column>
            <el-table-column label="申请理由" prop="reason" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template scope="scope">
                <el-button type="primary" size="mini" @click="authPass(scope.row,false)">审核通过</el-button>
                <el-button type="warning" size="mini" @click="authReject(scope.row, false)">审核驳回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  // import Vue from 'vue'
  export default {
    data () {
      return {
        viewAuth: [],
        operateAuth: [],
        currentTab: '',
        viewAuthSelectList: [],
        operateAuthSelectList: []
      }
    },
    props: ['newMsg'],
    methods: {
      tabSwitch (tab) {
        let _this = this
        tab.name === 'viewAuth' ? this.newMsg.arvView = 0 : this.newMsg.arvOpt = 0
        this.currentTab = tab.name
        this.$http.get(`/api/approval/loadData?authType=${tab.name}`).then(response => {
          _this[tab.name] = response.body.data
        }, response => {
          // error callback
        })
      },
      handleSelectionChange (val) {
        this.currentTab === 'viewAuth' ? this.viewAuthSelectList = val : this.operateAuthSelectList = val
      },
      add (selection, row) {
        row.checked = !row.checked
      },
      authPass (data, isBatch) {
        let _data = {}
        _data.type = this.currentTab
        // 批量通过
        if (isBatch) {
          if (!data.length) {
            this.$message({
              message: '请至少选择一项',
              type: 'warning'
            })
            return
          }
          _data.idList = data.map((item) => {
            return item.uuid
          })
          this.$http.post(`/api/approval/passBatch`, _data).then(response => {
            // 根据状态值判断，进行相关操作
            if (response.body.errno === 0) {
              this.$message({
                message: '通过申请',
                type: 'success'
              })
            }
          }, response => {
            // error callback
          })
        } else {
          if (!data.checked) {
            this.$message({
              message: '请选择当前项',
              type: 'warning'
            })
            return
          }
          _data.id = data.uuid
          this.$http.post(`/api/approval/passOne`, _data).then(response => {
            // 根据状态值判断，进行相关操作
            if (response.body.errno === 0) {
              this.$message({
                message: '通过申请',
                type: 'success'
              })
            }
          }, response => {
            // error callback
          })
        }
      },
      authReject (data, isBatch) {
        let _data = {}
        _data.type = this.currentTab
        if (isBatch) {
          if (!data.length) {
            this.$message({
              message: '请至少选择一项',
              type: 'warning'
            })
            return
          }
          _data.idList = data.map((item) => {
            return item.uuid
          })
          this.$http.post(`/api/approval/rejectBatch`, _data).then(response => {
            // 根据状态值判断，进行相关操作
            if (response.body.errno === 0) {
              this.$message({
                message: '驳回成功',
                type: 'success'
              })
            }
          }, response => {
            // error callback
          })
        } else {
          if (!data.checked) {
            this.$message({
              message: '请选择当前项',
              type: 'warning'
            })
            return
          }
          _data.id = data.uuid
          this.$http.post(`/api/approval/rejectOne`, _data).then(response => {
            // 根据状态值判断，进行相关操作
            if (response.body.errno === 0) {
              this.$message({
                message: '驳回成功',
                type: 'success'
              })
            }
          }, response => {
            // error callback
          })
        }
      }
    },
    created () {
      let _this = this
      this.currentTab = 'viewAuth'
      // 加载viewAuth
      this.$http.get('/api/approval/loadData?authType=viewAuth').then(response => {
        _this.viewAuth = response.body.data
      }, response => {
        // error callback
      })
    },
    computed: {
      multipleSelection () {
        return this.currentTab === 'viewAuth' ? this.viewAuthSelectList : this.operateAuthSelectList
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/css/common.styl'
  .my-appoval-wrap
    margin:0 50px
    .batch-operate
      display: inline-block
    .search-input
      width: 300px
      float: right
      margin-bottom: 10px
</style>
