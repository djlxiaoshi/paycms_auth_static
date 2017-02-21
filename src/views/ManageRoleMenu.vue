<template>
    <div class="page-role-menu">
        <div style="background:#fff; overflow:hidden;">
            <a class="btn green pull-left" href="#/manage" title="返回"><span class="glyphicon glyphicon-menu-left"></span></a>
            <span class="ml10 pull-left" style="line-height: 34px; font-size: 16px;">角色：产品/运营人员</span>
        </div>

        <div class="mt15 portlet">
            <div class="portlet-title clearfix">
                <div class="pull-left">
                    <label class="pull-left mt5" for="">一级菜单：</label>
                    <select class="form-control pull-left" style="width: inherit;">
                        <option>订单查询</option>
                        <option>产品配置</option>
                        <option>欺诈订单</option>
                    </select>

                    <label class="pull-left ml10 mt5" for="">二级菜单：</label>
                    <select class="form-control pull-left" style="width: inherit;">
                        <option>订单查询-查询</option>
                        <option>订单查询-操作</option>
                        <option>产品配置-产品列表</option>
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
                        <th>ID</th>
                        <th>所属项目</th>
                        <th>一级菜单</th>
                        <th>二级菜单</th>
                        <th width="220">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in menuLists">
                        <td>{{item.id}}</td>
                        <td>{{item.project}}</td>
                        <td>{{item.menu_name}}</td>
                        <td>{{item.access_name}}</td>
                        <td><input type="checkbox" v-model="item.is_check"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'pageRoleMenu',
  data () {
    return {

    }
  },
  computed: {
    menuLists: function () {
      let lists = [
        { id: '1', project: '支付服务中心', menu_name: '订单查询', access_name: '订单查询-查询', is_check: 1 },
        { id: '2', project: '支付服务中心', menu_name: '订单查询', access_name: '订单查询-查询', is_check: 0 },
        { id: '3', project: '支付服务中心', menu_name: '订单查询', access_name: '订单查询-查询', is_check: 0 }
      ]
      return lists
    }
  }
}
</script>

<style scoped>

</style>
