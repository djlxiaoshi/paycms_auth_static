<template>
    <div class="page-permission">
        <div class="btn-group" role="group" aria-label="...">
            <a class="btn btn-default" v-bind:class="{active:group==='has'}" v-on:click="changeGroup('has')">我的权限</a>
            <a class="btn btn-default" v-bind:class="{active:group==='checking'}" v-on:click="changeGroup('checking')">待审权限</a>
            <a class="btn btn-default" v-bind:class="{active:group==='rejected'}" v-on:click="changeGroup('rejected')">被驳回权限</a>
        </div>

        <!-- 我的权限 -->
        <div v-show="group==='has'">
            <div class="mt15 portlet">
                <div class="portlet-title">
                    <h4>查询权限</h4>
                </div>
                <table class="table table-bordered table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>查看权限</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in hasQueryLists">
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt15 portlet">
                <div class="portlet-title">
                    <h4>操作权限</h4>
                </div>
                <div class="clearfix">
                    <input type="text" value="" class="form-control pull-right" placeholder="Search">
                </div>
                <table class="table table-bordered table-condensed table-striped mt10">
                    <thead>
                        <tr>
                            <th>游戏</th>
                            <th>平台</th>
                            <th>大厅</th>
                            <th>终端</th>
                            <th>应用包</th>
                            <th>APPID应用</th>
                            <th>权限内容</th>
                            <th>业务审核人</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in hasOperationLists">
                            <td>{{item.AA}}</td>
                            <td>{{item.BB}}</td>
                            <td>{{item.CC}}</td>
                            <td>{{item.DD}}</td>
                            <td>{{item.EE}}</td>
                            <td>{{item.FF}}</td>
                            <td>
                                <label v-for="i in permissionsLists" class="mr10">
                                    <input type="checkbox" v-bind:disabled="!!item.GG" v-model="item.GG">{{i.name}}
                                </label>
                            </td>
                            <td>{{item.HH}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- 待审权限 -->
        <div v-show="group==='checking'">
            <div class="mt15 portlet">
                <div class="portlet-title">
                    <h4>查询权限</h4>
                </div>
                <table class="table table-bordered table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>权限内容</th>
                            <th>申请理由</th>
                            <th>当前状态</th>
                            <th>当前处理人</th>
                            <th width="120">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in checkingQueryList">
                            <td>{{item.AA}}</td>
                            <td>{{item.BB}}</td>
                            <td>{{item.CC}}</td>
                            <td>{{item.DD}}</td>
                            <td>{{item.EE}}</td>
                            <td><span class="btn red btn-circle btn-sm">撤回申请</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt15 portlet">
                <div class="portlet-title">
                    <h4>操作权限</h4>
                </div>
                <div class="clearfix">
                    <input type="text" value="" class="form-control pull-right" placeholder="Search">
                </div>
                <table class="table table-bordered table-condensed table-striped mt10">
                    <thead>
                        <tr>
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
                            <th width="120">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in checkingOperationLists">
                            <td>{{item.AA}}</td>
                            <td>{{item.BB}}</td>
                            <td>{{item.CC}}</td>
                            <td>{{item.DD}}</td>
                            <td>{{item.EE}}</td>
                            <td>{{item.FF}}</td>
                            <td>
                                <label v-for="i in permissionsLists" class="mr10">
                                    <input type="checkbox" v-bind:disabled="!!item.GG" v-model="item.GG">{{i.name}}
                                </label>
                            </td>
                            <td>{{item.HH}}</td>
                            <td>{{item.II}}</td>
                            <td>{{item.JJ}}</td>
                            <td><span class="btn red btn-circle btn-sm">撤回申请</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- 被驳回权限 -->
        <div v-show="group==='rejected'">
            <div class="mt15 portlet">
                <div class="portlet-title">
                    <h4>查询权限</h4>
                </div>
                <table class="table table-bordered table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>权限内容</th>
                            <th>申请理由</th>
                            <th>当前状态</th>
                            <th>当前处理人</th>
                            <th>驳回理由</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in rejectedQueryList">
                            <td>{{item.AA}}</td>
                            <td>{{item.BB}}</td>
                            <td>{{item.CC}}</td>
                            <td>{{item.DD}}</td>
                            <td>{{item.EE}}</td>
                            <td>{{item.FF}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt15 portlet">
                <div class="portlet-title">
                    <h4>操作权限</h4>
                </div>
                <div class="clearfix">
                    <input type="text" value="" class="form-control pull-right" placeholder="Search">
                </div>
                <table class="table table-bordered table-condensed table-striped mt10">
                    <thead>
                        <tr>
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
                            <th>驳回理由</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in rejectedOperationLists">
                            <td>{{item.AA}}</td>
                            <td>{{item.BB}}</td>
                            <td>{{item.CC}}</td>
                            <td>{{item.DD}}</td>
                            <td>{{item.EE}}</td>
                            <td>{{item.FF}}</td>
                            <td>
                                <label v-for="i in permissionsLists" class="mr10">
                                    <input type="checkbox" v-bind:disabled="!!item.GG" v-model="item.GG">{{i.name}}
                                </label>
                            </td>
                            <td>{{item.HH}}</td>
                            <td>{{item.II}}</td>
                            <td>{{item.JJ}}</td>
                            <td>{{item.KK}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'permission',
  data () {
    return {
      group: 'has'
    }
  },
  computed: {
    permissionsLists: function () {
      let lists = [
        { id: 1, name: '订单操作（发货/退款）' },
        { id: 2, name: '发货操作' },
        { id: 3, name: '退款操作' }
      ]
      return lists
    },
    // 我的权限
    hasQueryLists: function (argument) {
      let lists = [
        { id: '1', name: '查看权限', query: 0 },
        { id: '2', name: '欺诈订单', query: 1 },
        { id: '3', name: '统计信息', query: 1 },
        { id: '4', name: '查看权限', query: 0 },
        { id: '5', name: '查看权限', query: 1 },
        { id: '6', name: '查看权限', query: 0 },
        { id: '7', name: '查看权限', query: 1 }
      ]
      return lists
    },
    hasOperationLists: function () {
      let lists = [
        { AA: '地方棋牌', BB: '四川', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '四川', CC: '山东', DD: '全部', EE: '全部', FF: '全部', GG: '0,1', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,0', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '四川', CC: '山东', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '0,1', HH: 'XXX(英文名)' }
      ]
      return lists
    },

    // 待审核
    checkingQueryList: function () {
      let lists = [
        { AA: '1', BB: '订单查询', CC: 'xxxxxxx', DD: '待审核', EE: 'xxx（英文名）' },
        { AA: '2', BB: '订单查询', CC: 'xxxxxxx', DD: '待审核', EE: 'xxx（英文名）' },
        { AA: '3', BB: '订单查询', CC: 'xxxxxxx', DD: '待审核', EE: 'xxx（英文名）' }
      ]
      return lists
    },
    checkingOperationLists: function () {
      let lists = [
        { AA: '地方棋牌', BB: '四川', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX', II: '待审核', JJ: 'xxx（英文名）' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX', II: '待审核', JJ: 'xxx（英文名）' },
        { AA: '地方棋牌', BB: '四川', CC: '山东', DD: '全部', EE: '全部', FF: '全部', GG: '0,1', HH: 'XXX', II: '待审核', JJ: 'xxx（英文名）' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,0', HH: 'XXX', II: '待审核', JJ: 'xxx（英文名）' }
      ]
      return lists
    },

    // 被驳回权限
    rejectedQueryList: function () {
      let lists = [
        { AA: '1', BB: '订单查询', CC: 'xxxxxxx', DD: '被驳回', EE: 'xxx（英文名）', FF: 'xxxxxxx' },
        { AA: '2', BB: '订单查询', CC: 'xxxxxxx', DD: '被驳回', EE: 'xxx（英文名）', FF: 'xxxxxxx' },
        { AA: '3', BB: '订单查询', CC: 'xxxxxxx', DD: '被驳回', EE: 'xxx（英文名）', FF: 'xxxxxxx' }
      ]
      return lists
    },
    rejectedOperationLists: function () {
      let lists = [
        { AA: '地方棋牌', BB: '四川', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX', II: '被驳回', JJ: 'xxx（英文名）', KK: 'xxxxxxx' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX', II: '被驳回', JJ: 'xxx（英文名）', KK: 'xxxxxxx' },
        { AA: '地方棋牌', BB: '四川', CC: '山东', DD: '全部', EE: '全部', FF: '全部', GG: '0,1', HH: 'XXX', II: '被驳回', JJ: 'xxx（英文名）', KK: 'xxxxxxx' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,0', HH: 'XXX', II: '被驳回', JJ: 'xxx（英文名）', KK: 'xxxxxxx' }
      ]
      return lists
    }
  },
  methods: {
    changeGroup: function (group) {
      this.group = group
    }
  }
}
</script>

<style scoped>
</style>
