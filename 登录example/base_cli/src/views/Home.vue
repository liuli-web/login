<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"><br>
    用户名:<input v-model="uname"><br>
    密码:<input type="password" v-model="upwd"><br>
    <button @click="myLogin">登录</button>
    <h1><input type="checkbox" v-model="remenber"></input> | 记住密码？</h1>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: 'home',
  data(){
    return {
      remenber:0,
      uname:"liuli",
      upwd:"12345678912"
    }
  },
  methods:{
    myLogin(){
      this.login({
        uname:this.uname,
        upwd:this.upwd
      }).then(() => {
        if(this.remenber){
          localStorage.setItem("uname",this.uname);
        }else{
          sessionStorage.setItem("uname",this.uname);
        }
      })
    },
    ...mapActions([
      "login"
    ])
  }
}
</script>

