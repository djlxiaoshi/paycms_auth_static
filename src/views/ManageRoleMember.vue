<template>
    <div class="page-role-member">
        <div style="background:#fff; overflow:hidden;">
            <a class="btn green pull-left" href="#/manage" title="返回"><span class="glyphicon glyphicon-menu-left"></span></a>
            <span class="ml10 pull-left" style="line-height: 34px; font-size: 16px;">角色：产品/运营人员</span>
        </div>

        <div class="mt15 portlet">
            <div class="portlet-title clearfix">
                <div class="pull-left">
                    <label class="pull-left mt5" for="">名字：</label>
                    <input type="text" value="" placeholder="请输入名字" class="form-control pull-left">

                    <label class="pull-left ml10 mt5" for="">状态：</label>
                    <select class="form-control pull-left" style="width: inherit;">
                        <option>全部</option>
                        <option>已添加</option>
                        <option>未添加</option>
                    </select>
                    <button class="btn blue pull-left ml10">查询</button>
                </div>
            </div>

            <div class="clearfix">
                <div class="pull-right">
                    <label for=""><input type="checkbox">全选</label>
                    <span class="btn green btn-circle btn-sm ml10">批量添加</span>
                    <span class="btn red btn-circle btn-sm ml10">批量取消</span>
                </div>
            </div>
            <table class="table table-bordered table-condensed table-striped mt10">
                <thead>
                    <tr>
                        <th>用户ID</th>
                        <th>英文名</th>
                        <th>中文名</th>
                        <th>所属部门</th>
                        <th width="220">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in menuLists">
                        <td>{{item.uid}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.realname}}</td>
                        <td>{{item.department}}</td>
                        <td><input type="checkbox" v-model="item.is_check"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'pageRoleMember',
  data () {
    return {

    }
  },
  computed: {
    menuLists: function () {
      let lists = [
        { uid: '1', username: 'AnneDu', realname: '杜思睿', department: '数据支付部', is_check: 1 },
        { uid: '2', username: 'AnneDu', realname: '杜思睿', department: '数据支付部', is_check: 1 },
        { uid: '3', username: 'AnneDu', realname: '杜思睿', department: '数据支付部', is_check: 0 }
      ]
      return lists
    }
  }
}
</script>

<style scoped>

</style>
