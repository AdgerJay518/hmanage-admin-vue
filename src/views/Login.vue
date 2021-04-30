<template xmlns:el-image="http://www.w3.org/1999/html">

  <div id="background" style="margin: 0;padding: 0">
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="5" :lg="6"><div class="grid-content bg-purple">
      <h2 style="color: white;font-family:'微软雅黑 Light',serif">HM后台管理系统</h2>
      <el-image :src="require('@/assets/HM.png')"></el-image>
    </div>
    </el-col>
    <el-col :xl="5" :lg="6">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="6">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
        <el-form-item  prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"
                    placeholder="请输入用户名">
            <span slot="prefix">
            <svg-icon icon-class="username"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item  prop="password" style="width: 380px">
          <el-input v-model="loginForm.password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    autoComplete="on"
                    placeholder="请输入密码"
          >
            <span slot="prefix">
            <svg-icon icon-class="password"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon :icon-class="eyeType"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item  prop="code" style="width: 380px">
          <el-input v-model="loginForm.code" style="width:150px;float: left"
                    placeholder="请输入验证码">
            <span slot="prefix">
            <svg-icon icon-class="code"></svg-icon>
          </span>
          </el-input>
          <el-image :src="Img" class="Img" @click="getImg"></el-image>
        </el-form-item>
        <el-form-item >
          <el-button  style="width: 280px"type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import login_center_bg from '@/assets/background.png'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        code: '',
        token:''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为5 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      pwdType: 'password',
      dialogVisible:false,
      login_center_bg,
      supportDialogVisible:false,
      eyeType: "eye",
      Img:''
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
        this.eyeType="eyeOpen"
      } else {
        this.pwdType = 'password'
        this.eyeType="eye"
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.loginForm).then(res=>{
            const jwt=res.headers['authorization']
            this.$store.commit('SET_TOKEN',jwt)
            this.$router.push("/index")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getImg(){
      this.$axios.get('/getCode').then(res=>{
        this.loginForm.token=res.data.data.token
        this.Img=res.data.data.Img
      })
    }
  },
  created() {
    this.getImg()
  }
}
</script>

<style scoped>

.row-bg{
  display: flex;
  align-items: center;
  text-align: center;
  position: absolute;
  left: 0;
  right:0;
  width: 1000px;
  margin: 220px auto;
}

.el-divider{
  height: 200px;
}

.Img{
  float: left;
  margin-left: 10px;
  border-radius: 5px;
}
#background{
  height:100vh;
  background:url("../assets/background.png");
  width:100%;
  position: fixed;
  background-size:100% 100%;
  top: 0;
  left: 0;
}
</style>
