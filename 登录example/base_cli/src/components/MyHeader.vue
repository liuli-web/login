<template>
  <div>
    <h1 v-if="uname==''">用户: 匿名用户</h1>
    <h1 v-else>Welcome {{uname}} | <button @click="logout">注销</button></h1>
  </div>
</template>
<script>
import {mapState, mapMutations} from "vuex"

export default {
  methods:{
    logout(){
      this.setUname("");
      sessionStorage.clear();
      localStorage.clear();
    },
    ...mapMutations(["setUname"])
  },
  computed:{
    ...mapState(["uname"])
  },
  mounted(){
    let uname = localStorage.getItem("uname") || sessionStorage.getItem("uname");
    this.setUname(uname || "");
  }
}
</script>