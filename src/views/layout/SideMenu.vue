<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
    <router-link to="/index">
    <el-menu-item index="Index">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </template>
    </el-menu-item>
    </router-link>
    <el-submenu index="0">
      <template slot="title">
        <i class="el-icon-s-operation"></i>
        <span>权限</span>
      </template>
      <router-link to="/ums/admin">
        <el-menu-item index="1-1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户列表</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/ums/role">
        <el-menu-item index="1-2">
          <template slot="title">
            <i class="el-icon-rank"></i>
            <span slot="title">角色列表</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/ums/menu">
        <el-menu-item index="1-3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单列表</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/ums/resource">
        <el-menu-item index="1-4">
          <template slot="title">
            <i class="el-icon-reading"></i>
            <span slot="title">资源列表</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",

}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  transition: 0.3s;
}
.el-menu-vertical-demo{
  height: 100%;
}
/*解决侧边栏导航栏突出问题,去除右侧边框*/
.el-menu{
  border-right: none;
}


</style>
