<template>
  <div id="app">
    <div class="header">
        <a class="logo" href=""><img src="./assets/images/logo.png"></a>
    </div>

    <div class="page-container">
        <div class="page-sidebar-wrapper">
            <ul>
                <li class="nav-item"><router-link to="/" exact><span class="glyphicon glyphicon-pencil"></span>权限申请</a></router-link></li>
                <li class="nav-item"><router-link to="/permission" exact><span class="glyphicon glyphicon-star"></span>我的权限</router-link></li>
                <li class="nav-item"><router-link to="/approval" exact><span class="glyphicon glyphicon-edit"></span>我的审批<span class="badge">5</span></router-link></li>
                <li class="nav-item"><router-link to="/manage"><span class="glyphicon glyphicon-wrench"></span>权限管理</router-link></li>
            </ul>
        </div>
        <div class="page-content-wrapper">
            <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.header {
    background-color: #3B3F51;
    height: 68px;
}
.logo {
    line-height: 68px;
    margin-left: 15px;
}
.page-container {
    padding: 20px;
    overflow: hidden;
    min-height: 860px;
    position: relative;
    padding-left: 220px;
}

.page-sidebar-wrapper {
    width: 180px;
    background-color: #fff;
    position: absolute;
    left: 20px;
    top: 20px;
    bottom: 20px;
}
.page-sidebar-wrapper li {
    list-style: none;
}
.page-sidebar-wrapper li a {
    display: block;
    padding: 12px 15px 12px 20px;
    font-size: 15px;
    text-decoration: none;
    color: #678098;
    margin-top: 10px;
}
.page-sidebar-wrapper li a .glyphicon {
    margin-right: 10px;
    font-size: 18px;
    vertical-align: middle;
    margin-top: -4px;
}
.page-sidebar-wrapper li a .badge {
    font-size: 11px!important;
    font-weight: 300;
    height: 18px;
    color: #fff;
    padding: 3px 6px;
    -webkit-border-radius: 12px!important;
    -moz-border-radius: 12px!important;
    border-radius: 12px!important;
    text-shadow: none!important;
    text-align: center;
    vertical-align: middle;
    float: right;
    margin-top: 3px;
    margin-right: 0;
    background-color: #ed6b75;
}
.page-sidebar-wrapper li a.router-link-active,.page-sidebar-wrapper li a:hover {
    background: #f2f6f9;
    color: #5b9bd1;
}
.page-sidebar-wrapper li a.router-link-active {
    border-left: 3px solid #5C9ACF!important;
    margin-left: -3px;
}

.page-content-wrapper {

}
</style>
