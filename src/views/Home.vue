<template>
  <el-container id="all">
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <strong>后台管理系统</strong>
        <div class="header-avatar">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
          <span class="el-dropdown-link">{{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link to="/index">首页</router-link></el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <Tab></Tab>
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "./layout/SideMenu";
import Tab from "./layout/Tab";

export default {
  name: "Home",
  components:{
    SideMenu,
    Tab
  },

  data(){
    return{
      userInfo:{
        id:"",
        username:"",
        avatar:""
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods:{
    getUserInfo(){
      this.$axios.get("/ums/UserInfo").then(res=>{
        this.userInfo=res.data.data
      })
    },
    logout(){
      this.$axios.post("/logout").then(res=>{
        localStorage.clear()
        sessionStorage.clear()
        this.$store.commit("resetState")
        this.$router.push("/Login")
      })
    },
  }

}
</script>

<style scoped>
a{
  text-decoration: none;
}
.header-avatar{
  width: 120px;
  float: right;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
}
#all{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align:left;
  line-height: 200px;
}

.el-main {

  text-align: center;

  padding :0;
}
</style>
