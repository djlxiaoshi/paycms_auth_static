import Vue from 'vue'
import Router from 'vue-router'
// import Hello from 'components/Hello'
import Index from 'views/Index'
import Permission from 'views/Permission'
import Approval from 'views/Approval'
import Manage from 'views/Manage'
import ManageRoleMenu from 'views/ManageRoleMenu'
import ManageRoleMember from 'views/ManageRoleMember'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/permission',
      name: 'Permission',
      component: Permission
    },
    {
      path: '/approval',
      name: 'Approval',
      component: Approval
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage
    },
    {
      path: '/manage/role/menu/:id',
      name: 'ManageRoleMenu',
      component: ManageRoleMenu
    },
    {
      path: '/manage/role/member/:id',
      name: 'ManageRoleMember',
      component: ManageRoleMember
    }
  ]
})
