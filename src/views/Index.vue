<template>
    <div class="portlet page-index">
        <div class="portlet-title">
            <h4>申请人：</h4>
        </div>
        <div>
            <span>姓名：杜思睿（AnneDu）</span>
            <span class="ml30">所属部门：业务支持中心/数据支付部/产品组</span>
        </div>

        <div class="mt30 portlet-title">
            <h4>申请内容：</h4>
        </div>

        <div>
            <strong>应用权限</strong>
            支付后台APPID权限，会根据数据后台的BPID权限自动开通，如果没有某个应用的appid权限，请自行去data后台开通对应的bpid权限，如果在数据后台开通权限后，在支付后台还是提示无权限，请退出账号，清空浏览器缓存，重新登录一下即可查看；如果有疑问，请点击“<a href="">意见反馈</a>”，谢谢！
        </div>

        <div class="btn-group mt10" role="group" aria-label="...">
            <a class="btn btn-default" v-bind:class="{ active: group === 'query' }" v-on:click="changeGroup('query')">查询权限</a>
            <a class="btn btn-default" v-bind:class="{ active: group === 'operation' }" v-on:click="changeGroup('operation')">操作权限</a>
        </div>

        <!-- 查询权限 -->
        <div class="mt10 greyPortlet" v-show="group === 'query'">
            <table class="table table-bordered table-condensed table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>查看权限</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in queryLists">
                        <td>{{item.id}}</td>
                        <td>
                            <label>
                                <input type="checkbox" v-bind:disabled="!!item.query" v-model="item.query"> {{item.name}}
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="red">
                <strong>温馨提示!</strong> 如果您申请的内容与自己的工作职责不符，将不会予以审核通过；请慎重申请，谢谢!
            </div>
        </div>

        <!-- 操作权限 -->
        <div class="mt10 greyPortlet" v-show="group === 'operation'">
            <div class="clearfix">
                <strong class="pull-left mt5">应用版本：</strong>
                <input type="text" value="" class="form-control pull-left">
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
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in operationLists">
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
                        <td><span class="btn green btn-circle btn-sm" v-on:click="addPperation(index)">添加</span></td>
                    </tr>
                </tbody>
            </table>

            <div class="mt20"><strong>已添加申请列表：</strong></div>
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
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in operationCheckedLists">
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
                        <td><span class="btn red btn-circle btn-sm" v-on:click="delPperation(index)">删除</span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="portlet-title mt30">
            <h4>申请理由：</h4>
        </div>
        <div><textarea class="form-control" rows="3" placeholder="申请理由" style="width:100%"></textarea></div>

        <div class="mt30">
            <button type="button" class="btn default">取消</button>
            <button type="submit" class="btn blue ml10" v-on:click="doSubmit()">提交申请</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      group: 'query',
      operationCheckedLists: []
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
    queryLists: function (argument) {
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
    operationLists: function () {
      let lists = [
        { AA: '地方棋牌', BB: '四川', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '四川', CC: '山东', DD: '全部', EE: '全部', FF: '全部', GG: '0,1', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '1,0', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '四川', CC: '山东', DD: '全部', EE: '全部', FF: '全部', GG: '1,1', HH: 'XXX(英文名)' },
        { AA: '地方棋牌', BB: '山东', CC: '全部', DD: '全部', EE: '全部', FF: '全部', GG: '0,1', HH: 'XXX(英文名)' }
      ]
      return lists
    }
  },
  methods: {
    changeGroup: function (group) {
      this.group = group
    },
    doSubmit: function () {
      console.error('queryList', this.queryList)
    },
    addPperation: function (index) {
      this.operationCheckedLists.push(this.operationLists[index])
    },
    delPperation: function (index) {
      this.operationCheckedLists.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
