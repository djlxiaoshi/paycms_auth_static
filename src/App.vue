<template>
  <div id="app">
    <el-row class="title">
      <el-col :xs="24" :sm="4" :md="3" :lg="2">权限中心</el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="4" :md="3" :lg="2">
        <el-menu router class="list"><!-- :default-active="lists[0].address" 默认选中第一个，需要修改index.js中lists的path:'/' -->
          <el-menu-item index="apply">
            <router-link to="/apply" class="router-item">权限申请</router-link>
          </el-menu-item>
          <el-menu-item index="myauth">
            <router-link to="/myauth" class="router-item">
              <el-badge :value="newAuthNum" :max="10" class="item">我的权限</el-badge>
            </router-link>
          </el-menu-item>
          <el-menu-item index="approval">
            <router-link to="/approval" class="router-item">
              <el-badge :value="approvalNum" :max="10" class="item">我的审批</el-badge>
            </router-link>
          </el-menu-item>
          <el-menu-item index="manage">
            <router-link to="/manage" class="router-item">权限管理</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="24" :sm="20" :md="21" :lg="22">
        <router-view :new-msg="newMsg"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      lists: [
        {
          name: '权限申请',
          address: 'apply'
        },
        {
          name: '我的权限',
          address: 'myauth'
        },
        {
          name: '我的审批',
          address: 'approval'
        },
        {
          name: '权限管理',
          address: 'manage'
        }
      ],
      newMsg: {}
    }
  },
  methods: {
  },
  computed: {
    newAuthNum () {
      return this.newMsg.pending + this.newMsg.reject
    },
    approvalNum () {
      return this.newMsg.arvView + this.newMsg.arvOpt
    }
  },
  created () {
    this.$http.get('/api/app/newMsg').then(response => {
      // 返回一个对象{"pending":3, "reject": 7, "arvView": 4, "arvOpt": 5}
      // this.newMsg = response.body.data
      this.newMsg = {'pending': 3, 'reject': 7, 'arvView': 4, 'arvOpt': 5}
    }, response => {
      // error callback
    })
  }
}
</script>

<style>
.title{
  background: #8492A6;
  color: #fff;
  line-height: 56px;
  text-align: center;
}

.el-menu-item{
  text-align: center;
}

.list a{
  color: #48576a;
}
.list>.is-active{
  background: #d1dbe5;
}
.list>.is-active a{
  color: #fff;
}
.border-bottom{
  border-bottom: 1px solid #99A9BF;
}
</style>
