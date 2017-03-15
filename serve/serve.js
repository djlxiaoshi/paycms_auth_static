/**
 * Created by JohnLi on 2017/3/15.
 */
var express = require('express')
var bodyParser = require('body-parser');
var url = require('url');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 权限申请数据
var authApplyData = require('../src/mock/apply.json');

// 权限菜单选项数据
// var menuData = authApplyData.parentMenu;

// 我的权限数据
var myAuthData = require('../src/mock/myauth.json');

// 我的审批  数据
var approvalData = require('../src/mock/approval.json');

var apiRoutes = express.Router();

// 获取  我的权限  和 我的审批中的 新消息数目
apiRoutes.get('/app/newMsg', function (req, res) {
  res.json({
    errno: 0
  });
});

apiRoutes.get('/apply/userMsg', function (req, res) {
  res.json({
    errno: 0,
    data: authApplyData.userMsg
  });
});

apiRoutes.post('/apply/viewAuthApply', function (req, res) {
  res.json({
    errno: 0
  });
  console.dir(req.body);
});

apiRoutes.post('/apply/operateAuthApply', function (req, res) {
  res.json({
    errno: 0
  });
  console.dir(req.body);
});

apiRoutes.get('/apply/viewAuth', function (req, res) {
  res.json({
    errno: 0,
    data: authApplyData.viewAuth
  });
});

apiRoutes.get('/apply/parentMenu', function (req, res) {
  res.json({
    errno: 0,
    data: authApplyData.parentMenu
  });
});

apiRoutes.post('/apply/subOpt', function (req, res) {
  res.json({
    errno: 0
  });
  // console.dir(req.body); // 打印筛选条件
});

apiRoutes.get('/myAuth/', function (req, res) {
  var params = url.parse(req.url, true).query;
  var authType = params.authType;
  res.json({
    errno: 0,
    data: myAuthData[authType]
  });
});

apiRoutes.get('/myAuth/withdraw', function (req, res) {
  var params = url.parse(req.url, true).query;
  var _authType = params.authType;
  var uuid = params.uuid;
  console.log('authType:' + _authType + 'uuid:' + uuid);
  res.json({
    errno: 0
    // 看这里要不要把更新后的数据在获取一遍，传给前端。
    // data: myAuthData[_authType]
  });
});

apiRoutes.get('/myAuth/search', function (req, res) {
  var params = url.parse(req.url, true).query;
  var _tagType = params.searchType;
  var _searchKey = params.searchKey;
  // 接下来执行数据库查询操作
  console.log('tagType:' + _tagType + 'searchKey:' + _searchKey);
  res.json({
    errno: 0,
    // 数据
    data:{
      "viewAuth": [],
      "operateAuth": [
        {
          "uuid":1,
          "game": "地方棋牌",
          "platform": "四川",
          "hall": "全部",
          "terminal": "全部",
          "appPackage": "全部",
          "APPID": "全部",
          "auth": ["订单操作"],
          "status": 1,
          "handler": "查询数据",
          "reason": "我想申请这些操作权限1"
        }]
    }
  });
});

/* ***************approvalData********************** */
apiRoutes.get('/approval/loadData', function (req, res) {
  var params = url.parse(req.url, true).query;
  var _authType = params.authType;
  res.json({
    errno: 0,
    data: approvalData[_authType]
  });
});

// 通过一条
apiRoutes.post('/approval/passOne', function (req, res) {
  console.log('通过一条');
  console.log(req.body);
  res.json({
    errno: 0
  });
});

// 批量通过
apiRoutes.post('/approval/passBatch', function (req, res) {
  console.log('批量通过');
  console.log(req.body);
  res.json({
    errno: 0
  });
});

// 驳回一条
apiRoutes.post('/approval/rejectOne', function (req, res) {
  console.log('驳回一条');
  console.log(req.body);
  res.json({
    errno: 0
  });
});

// 批量驳回
apiRoutes.post('/approval/rejectBatch', function (req, res) {
  console.log('批量驳回');
  console.log(req.body);
  res.json({
    errno: 0
  });
});

module.exports = apiRoutes;
