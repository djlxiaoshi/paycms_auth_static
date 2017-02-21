<template>
    <div class="page-approval">
        <div class="mt15 portlet">
            <div class="portlet-title">
                <h4>查询权限</h4>
            </div>
            <div class="clearfix">
                <label for=""><input type="checkbox">全选</label>
                <span class="btn green btn-circle btn-sm ml10">批量通过</span>
                <span class="btn red btn-circle btn-sm ml10">批量驳回</span>
            </div>
            <table class="table table-bordered table-condensed table-striped mt10">
                <thead>
                    <tr>
                        <th>选择</th>
                        <th>申请人</th>
                        <th>角色</th>
                        <th>所属部门</th>
                        <th>查看权限</th>
                        <th>申请时间</th>
                        <th>申请理由</th>
                        <th width="150">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in queryList">
                        <td><input type="checkbox"></td>
                        <td>{{item.AA}}</td>
                        <td>{{item.BB}}</td>
                        <td>{{item.CC}}</td>
                        <td>{{item.DD}}</td>
                        <td>{{item.EE}}</td>
                        <td>{{item.FF}}</td>
                        <td>
                            <span class="btn green btn-circle btn-sm">通过</span>
                            <span class="btn red btn-circle btn-sm ml10">驳回</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt15 portlet">
            <div class="portlet-title">
                <h4>操作权限</h4>
            </div>
            <div class="clearfix">
                <div class="pull-left mt10">
                    <label for=""><input type="checkbox">全选</label>
                    <span class="btn green btn-circle btn-sm ml10">批量通过</span>
                    <span class="btn red btn-circle btn-sm ml10">批量驳回</span>
                </div>

                <input type="text" value="" class="form-control pull-right" placeholder="Search">
            </div>
            <table class="table table-bordered table-condensed table-striped mt10">
                <thead>
                    <tr>
                        <th>选择</th>
                        <th>申请人</th>
                        <th>角色</th>
                        <th>所属部门</th>
                        <th>游戏</th>
                        <th>平台</th>
                        <th>大厅</th>
                        <th>终端</th>
                        <th>应用包</th>
                        <th>APPID应用</th>
                        <th>权限内容</th>
                        <th>申请理由</th>
                        <th>当前状态</th>
                        <th>当前处理人</th>
                        <th width="150">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in operationLists">
                        <td><input type="checkbox"></td>
                        <td>{{item.name}}</td>
                        <td>{{item.role}}</td>
                        <td>{{item.department}}</td>
                        <td>{{item.AA}}</td>
                        <td>{{item.BB}}</td>
                        <td>{{item.CC}}</td>
                        <td>{{item.DD}}</td>
                        <td>{{item.EE}}</td>
                        <td>{{item.FF}}</td>
                        <td>{{item.GG}}</td>
                        <td>{{item.HH}}</td>
                        <td>{{item.II}}</td>
                        <td>{{item.JJ}}</td>
                        <td>
                            <span class="btn green btn-circle btn-sm">通过</span>
                            <span class="btn red btn-circle btn-sm ml10">驳回</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'approval',
  data () {
    return {

    }
  },
  computed: {
    queryList: function () {
      let lists = [
        { AA: '杜思睿（AnneDu）', BB: '产品/运营人员', CC: 'xxxxxxx', DD: '订单查询、欺诈订单', EE: 'xxxxxxx', FF: 'xxxxxxx' },
        { AA: '杜思睿（AnneDu）', BB: '产品/运营人员', CC: 'xxxxxxx', DD: '订单查询、统计信息', EE: 'xxxxxxx', FF: 'xxxxxxx' },
        { AA: '杜思睿（AnneDu）', BB: '产品/运营人员', CC: 'xxxxxxx', DD: '订单查询', EE: 'xxxxxxx', FF: 'xxxxxxx' }
      ]
      return lists
    },
    operationLists: function () {
      let lists = [
        { name: '杜思睿（AnneDu）', role: '产品/运营人员', department: 'xxxxxxx', AA: '地方棋牌', BB: '四川', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '订单查询、欺诈订单', HH: 'XXX', II: '待审核', JJ: 'xxx（英文名）' },
        { name: '杜思睿（AnneDu）', role: '产品/运营人员', department: 'xxxxxxx', AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '欺诈订单', HH: 'XXX', II: '待审核', JJ: 'xxx（英文名）' },
        { name: '杜思睿（AnneDu）', role: '产品/运营人员', department: 'xxxxxxx', AA: '地方棋牌', BB: '四川', CC: '山东', DD: '全部', EE: '全部', FF: '全部', GG: '订单查询、欺诈订单', HH: 'XXX', II: '待审核', JJ: 'xxx（英文名）' },
        { name: '杜思睿（AnneDu）', role: '产品/运营人员', department: 'xxxxxxx', AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '订单查询', HH: 'XXX', II: '待审核', JJ: 'xxx（英文名）' }
      ]
      return lists
    }
  }
}
</script>

<style scoped>

</style>
