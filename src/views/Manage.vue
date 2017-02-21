<template>
    <div class="page-manage">
        <div class="btn-group" role="group" aria-label="...">
            <a class="btn btn-default" v-bind:class="{active:group==='role'}" v-on:click="changeGroup('role')">角色管理</a>
            <a class="btn btn-default" v-bind:class="{active:group==='user'}" v-on:click="changeGroup('user')">用户管理</a>
        </div>

        <div class="portlet mt15" v-if="group==='role'">
            <div class="clearfix">
                <label class="pull-left mt5" for="">角色：</label>
                <input type="text" value="" placeholder="" class="form-control pull-left">
                <label class="pull-left mt5 ml10" for="">成员：</label>
                <input type="text" value="" placeholder="" class="form-control pull-left">
                <button class="btn blue pull-left ml10">查询</button>

                <button class="btn green pull-right ml10" v-on:click="openAddeModal()">+添加角色</button>
            </div>

            <table class="table table-bordered table-condensed table-striped mt10">
                <thead>
                    <tr>
                        <th>角色ID</th>
                        <th>角色</th>
                        <th>已选菜单</th>
                        <th>备注</th>
                        <th width="320">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in roleList">
                        <td>{{item.id}}</td>
                        <td>{{item.role}}</td>
                        <td>{{item.menu}}</td>
                        <td>{{item.note}}</td>
                        <td>
                            <span class="btn green btn-circle btn-sm">修改</span>
                            <span class="btn red btn-circle btn-sm ml10">删除</span>
                            <router-link to="/manage/role/menu/:11" exact><span class="btn blue btn-circle btn-sm ml10">菜单管理</span></router-link>
                            <router-link to="/manage/role/member/:11" exact><span class="btn blue btn-circle btn-sm ml10">成员管理</span></router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="portlet mt15" v-if="group==='user'">
            <div class="clearfix">
                <input type="text" value="" class="form-control pull-right" placeholder="Search">
            </div>

            <table class="table table-bordered table-condensed table-striped mt10">
                <thead>
                    <tr>
                        <th>用户ID</th>
                        <th>用户姓名</th>
                        <th>用户角色</th>
                        <th>所属部门</th>
                        <th>最后登录时间</th>
                        <th width="200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in userLists">
                        <td>{{item.userid}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.role}}</td>
                        <td>{{item.department}}</td>
                        <td>{{item.lastlogin}}</td>
                        <td>
                            <span class="btn green btn-circle btn-sm ml10">菜单管理</span>
                            <span class="btn blue btn-circle btn-sm ml10">操作权限</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 添加角色 -->
        <div class="modal fade in bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: block;" v-if="addRoleModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" v-on:click="closeAllModal()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">添加角色</h4>
                    </div>

                    <div class="modal-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td align="right">角色：</td>
                                    <td><input type="text" class="form-control"></td>
                                </tr>
                                <tr>
                                    <td align="right">菜单选择：</td>
                                    <td>
                                        <select class="form-control pull-left" style="width:180px;">
                                            <option value="">一级菜单</option>
                                        </select>
                                        <select class="form-control pull-left ml10" style="width:180px;">
                                            <option value="">二级菜单</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">已选菜单：</td>
                                    <td>
                                        <table class="table table-bordered table-condensed">
                                            <thead>
                                                <tr>
                                                    <th>一级菜单</th>
                                                    <th>二级菜单</th>
                                                    <th>操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>订单查询</td>
                                                    <td>订单查询-查询</td>
                                                    <td><span class="glyphicon glyphicon-trash"></span></td>
                                                </tr>
                                                <tr>
                                                    <td>订单查询</td>
                                                    <td>订单查询-查询</td>
                                                    <td><span class="glyphicon glyphicon-trash"></span></td>
                                                </tr>
                                                <tr>
                                                    <td>订单查询</td>
                                                    <td>订单查询-查询</td>
                                                    <td><span class="glyphicon glyphicon-trash"></span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">备注：</td>
                                    <td>
                                        <textarea rows="3" placeholder="申请理由" class="form-control" style="width: 100%;"></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default"  v-on:click="closeAllModal()">取消</button>
                        <button type="button" class="btn btn-primary">确认修改</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'manage',
  data () {
    return {
      group: 'role',
      addRoleModal: false
    }
  },
  computed: {
    roleList: function () {
      let lists = [
        { id: '1', role: '产品/运营人员', menu: '订单查询、欺诈订单、产品配置、收入汇总、统计信息、版本统计信息、应用警报设置、权限申请', note: 'xxxx' },
        { id: '2', role: '产品/运营人员', menu: '产品配置、收入汇总、统计信息、应用警报设置、权限申请', note: 'xxxx' },
        { id: '3', role: '产品/运营人员', menu: '统计信息、版本统计信息、应用警报设置', note: 'xxxx' },
        { id: '4', role: '产品/运营人员', menu: '收入汇总、统计信息、版本统计信息、应用警报设置、权限申请', note: 'xxxx' },
        { id: '5', role: '产品/运营人员', menu: '版本统计信息、应用警报设置', note: 'xxxx' }
      ]
      return lists
    },
    userLists: function () {
      let lists = [
        { userid: '1', username: '杜思睿（AnneDu）', role: '超级管理员', department: '数据支付部/支付组/产品组', lastlogin: '2017-02-16 15:25:55' },
        { userid: '2', username: '杜思睿（AnneDu）', role: '超级管理员', department: '数据支付部/支付组/产品组', lastlogin: '2017-02-16 15:25:55' },
        { userid: '3', username: '杜思睿（AnneDu）', role: '超级管理员', department: '数据支付部/支付组/产品组', lastlogin: '2017-02-16 15:25:55' },
        { userid: '4', username: '杜思睿（AnneDu）', role: '超级管理员', department: '数据支付部/支付组/产品组', lastlogin: '2017-02-16 15:25:55' }
      ]
      return lists
    }
  },
  methods: {
    changeGroup: function (group) {
      this.group = group
    },
    openAddeModal: function () {
      this.addRoleModal = true
    },
    closeAllModal: function () {
      this.addRoleModal = false
    }
  }
}
</script>

<style scoped>

</style>
