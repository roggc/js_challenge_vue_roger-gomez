import Vue from 'vue'

export default
mutations=>
Vue.extend({
  data(){
    return {
      state:null
    }
  },
  methods:{
    setState(s){
      this.state=s
    },
    commit(data){
      mutations[data.type](this,data)
    }
  }
})
