import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uname:""
  },
  mutations: { //专门负责修改state中的变量
    setUname(state,uname){
      state.uname=uname;
    }
  },
  actions: { //专门负责发送异步ajax请求，从服务器端获取数据
    login(csa,user){ //context代表整个vuex对象
      (async function(){
        var result= await axios.get("/login",{
          params:user
        });
        csa.commit("setUname",result.data.data[0].uname);
      })()
    }
  },
  modules: {
  }
})

