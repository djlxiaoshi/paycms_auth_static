<template>
  <div class="my-auth-wrap">
    <el-tabs value="ownedAuth" @tab-click="getMyAuthData">
      <!--我的权限-->
      <el-tab-pane label="我的权限" name="ownedAuth">
        <div class="own-auth">
          <!--搜索框-->
          <div class="clearfix">
            <el-input class="search-input" placeholder="请输入关键字" icon="search" v-model="searchInput" @click="search('ownedAuth')"></el-input>
          </div>
          <!--查看权限-->
          <div class="view-auth-wrap">
            <h3 class="auth-title">查看权限</h3>
            <el-table :data="ownedAuth.viewAuth" border style="width: 100%">
              <el-table-column label="ID" align="center">
                <template scope="scope">
                  <span>{{scope.row.index}}</span>
                </template>
              </el-table-column>
              <el-table-column label="菜单" align="center">
                <template scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--操作权限-->
          <div class="operate-auth-wrap">
            <h3 class="auth-title">操作权限</h3>
            <el-table :data="ownedAuth.operateAuth" border style="width: 100%">
              <el-table-column label="游戏" prop="game" align="center"></el-table-column>
              <el-table-column label="平台" prop="platform" align="center"></el-table-column>
              <el-table-column label="大厅" prop="hall" align="center"></el-table-column>
              <el-table-column label="终端" prop="terminal" align="center"></el-table-column>
              <el-table-column label="应用包" prop="appPackage" align="center"></el-table-column>
              <el-table-column label="APPID应用" prop="APPID" align="center"></el-table-column>
              <el-table-column label="权限内容" align="center" width="240">
                  <template scope="scope">
                    <el-checkbox  :checked="scope.row.authContent.deliver" disabled>发货退款</el-checkbox>
                    <el-checkbox :checked="scope.row.authContent.alarm" disabled>报警设置</el-checkbox>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="业务审核人" prop="handler" align="center"></el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="pagination-wrap">
            <el-pagination layout="prev, pager, next" :total="20" :page-size="pageSize" @current-change="switchPage"
                           style="display: inline-block;"></el-pagination>
          </div>
        </div>
      </el-tab-pane>

      <!--待审权限-->
      <el-tab-pane name="pendingAuth">
        <span slot="label">
          <el-badge :value="newMsg.pending" class="item" size="small">
            <div style="margin: -10px 0;">待审权限</div>
          </el-badge>
        </span>
        <!--搜索框-->
        <div class="clearfix">
          <el-input class="search-input" placeholder="请输入关键字" icon="search" @click="search('pendingAuth')" v-model="searchInput"></el-input>
        </div>

        <div class="view-auth-wrap">
          <h4 class="auth-title">查询权限</h4>
          <!--待审权限 -> 查看权限表-->
          <el-table :data="pendingAuth.viewAuth" border style="width: 100%">
            <el-table-column label="ID" align="center">
              <template scope="scope">
                {{scope.$index}}
              </template>
            </el-table-column>
            <el-table-column label="权限内容" align="left">
              <template scope="scope">
                <el-checkbox-group v-model="scope.row.auth">
                  <el-checkbox v-for="(item, index) in scope.row.auth" :key="index" :label="item" style="margin-left: 10px;"  disabled></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
            <el-table-column label="申请理由" prop="reason" align="left"></el-table-column>
            <el-table-column label="当前状态" prop="status" align="center"></el-table-column>
            <el-table-column label="当前处理人" prop="handler" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-button type="warning" size="mini" @click="withdraw(scope.row.uuid, 'viewAuth')">撤回申请</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="operate-auth-wrap">
          <h4 class="auth-title">操作权限</h4>
          <!--待审权限 -> 操作权限表-->
          <el-table :data="pendingAuth.operateAuth" border style="width: 100%">
            <el-table-column label="权限类型" align="center">
              <template scope="scope"><span>操作权限</span></template>
            </el-table-column>
            <el-table-column label="游戏" prop="game" align="center"></el-table-column>
            <el-table-column label="平台" prop="platform" align="center"></el-table-column>
            <el-table-column label="大厅" prop="hall" align="center"></el-table-column>
            <el-table-column label="终端" prop="terminal" align="center"></el-table-column>
            <el-table-column label="应用包" prop="appPackage" align="center"></el-table-column>
            <el-table-column label="APPID应用" prop="APPID" align="center"></el-table-column>
            <el-table-column label="权限内容" align="left">
              <template scope="scope" >
                <el-checkbox-group v-model="scope.row.auth">
                  <el-checkbox :label="item" :key="index" v-for="(item, index) in scope.row.auth" disabled style="margin-left: 10px;"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
            <el-table-column label="申请理由" prop="reason" align="left"></el-table-column>
            <el-table-column label="处理状态" prop="status" align="center"></el-table-column>
            <el-table-column label="当前处理人" prop="handler" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-button type="danger" size="mini" @click="withdraw(scope.row.uuid, 'operateAuth')">撤回申请</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!--被驳回权限-->
      <el-tab-pane name="rejectAuth">
        <span slot="label">
          <el-badge :value="newMsg.reject" class="item" size="small">
            <div style="margin: -5px 0;">被驳回权限</div>
          </el-badge>
        </span>
        <div class="clearfix">
          <el-input class="search-input" placeholder="请输入关键字" icon="search" @click="search('rejectAuth')"></el-input>
        </div>
        <!--被驳回的查看权限-->
        <div class="view-auth-wrap">
          <h4 class="auth-title">查询权限</h4>
          <!--待审权限 -> 查看权限表-->
          <el-table :data="rejectAuth.viewAuth" border style="width: 100%">
            <el-table-column label="ID" align="center">
              <template scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column label="权限内容" align="left">
              <template scope="scope">
                <el-checkbox-group v-model="scope.row.auth">
                  <el-checkbox  v-for="(item, index) in scope.row.auth" :key="index" :label="item" style="margin-left: 10px;" disabled>{{item}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" prop="applyTime" align="center"></el-table-column>
            <el-table-column label="当前状态" prop="status" align="center"></el-table-column>
            <el-table-column label="当前处理人" prop="handler" align="center"></el-table-column>
            <el-table-column label="驳回理由" prop="reason" align="left"></el-table-column>
          </el-table>
        </div>
        <!--被驳回的操作权限-->
        <div class="operate-auth-wrap">
          <h4 class="auth-title">操作权限</h4>
          <el-table :data="rejectAuth.operateAuth" border style="width: 100%">
            <el-table-column label="游戏" prop="game" align="center"></el-table-column>
            <el-table-column label="平台" prop="platform" align="center"></el-table-column>
            <el-table-column label="大厅" prop="hall" align="center"></el-table-column>
            <el-table-column label="终端" prop="terminal" align="center"></el-table-column>
            <el-table-column label="应用包" prop="appPackage" align="center"></el-table-column>
            <el-table-column label="APPID应用" prop="APPID" align="center"></el-table-column>
            <el-table-column label="权限内容" align="left">
              <template scope="scope">
                <el-checkbox-group v-model="scope.row.auth">
                  <el-checkbox :label="item" :key="index" v-for="(item, index) in scope.row.auth" disabled style="margin-left: 10px;"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" prop="applyTime" align="center"></el-table-column>
            <el-table-column label="处理状态" prop="status" align="center"></el-table-column>
            <el-table-column label="当前处理人" prop="handler" align="center"></el-table-column>
            <el-table-column label="驳回理由" prop="reason" align="center"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        searchInput: '',
        ownedAuth: {},
        pendingAuth: {},
        rejectAuth: {},
        currentPage: 1,
        pageSize: 10,
        authType: [{
          id: 1,
          menu: '订单查询'
        }, {
          id: 2,
          menu: '欺诈查询'
        }, {
          id: 3,
          menu: '产品配置'
        }, {
          id: 4,
          menu: '收入汇总'
        }]
      }
    },
    props: ['newMsg'],
    methods: {
      withdraw (uuid, authType) {
        let _this = this
        this.$confirm('您确定撤回当前申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action, instance) {
            if (action === 'confirm') {
              _this.$http.get(`/api/myAuth/withdraw?authType=${authType}&uuid=${uuid}`).then(response => {
                _this.$message({
                  type: 'success',
                  message: '撤销权限操作成功'
                })
                // 然后在这里重新请求一遍数据
              }, response => {
                // error callback
              })
            } else {
              _this.$message({
                type: 'warning',
                message: '放弃取消'
              })
            }
          }
        })
      },
      getMyAuthData (tab, event) {
        let _authType = tab.name
        if (tab.name === 'pendingAuth') {
          this.newMsg.pending = 0
        }
        if (tab.name === 'rejectAuth') {
          this.newMsg.reject = 0
        }

        this.$http.get(`/api/myAuth?authType=${_authType}&currentPage=${this.currentPage}`).then(response => {
          this[_authType] = response.body.data
          console.log('tags切换，获取后台数据')
          console.log(this[_authType])
        }, response => {
          // error callback
        })
      },
      change () {
      },
      search (searchType) {
        this.$http.get(`/api/myAuth/search?searchType=${searchType}&searchKey=${this.searchInput}`).then(response => {
          // this[searchType] = response.body.data
        }, response => {
          // error callback
        })
      },
      switchPage (currentPage) {
        // 更新当前页面值
        this.currentPage = currentPage
        // 到后台取新数据
//        this.$http.get(`/api/myAuthData?authType=myAuth&currentPage=${this.currentPage}`).then(response => {
//          this.serviceData = response.body.data
//        }, response => {
//          // error callback
//        })
      }
    },
    created () {
      // 页面载入获取我的权限-->查看权限列表
      this.$http.get(`/api/myAuth?authType=ownedAuth&currentPage=${this.currentPage}`).then(response => {
        // 在这里获取后台数据
        this.ownedAuth = response.body.data
      }, response => {
        // error callback
      })

//      // 获取待审权限和被驳回条目的数目
//      this.$http.get('/api/dataNum').then(response => {
//        this.pendingNum = response.body.data.pendingNum
//        this.rejectNum = response.body.data.rejectNum
//        console.log(this.pendingNum)
//        console.log(this.rejectNum)
//      }, response => {
//        // error callback
//      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/css/common.styl"
  .my-auth-wrap
    margin: 0 50px;
    .own-auth
      h4
        margin: 10px 0
    .search-input
      width: 300px
      float: right
      margin-bottom: 10px
    .view-auth-wrap, .operate-auth-wrap
      border: 1px solid #e5e5e5
      margin: 20px
      .auth-title
        margin: 15px
    .pagination-wrap
      text-align: center
      margin: 20px
</style>
