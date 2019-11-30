import store from './store'
import Paginationx from './paginationx'

export default store({
  init(this_){
    this_.state={
      paginationx:new Paginationx(),
      products:[],
      width:300,
      height:200,
      limit:6,
      offset:0
    }
    this_.state.paginationx.commit({type:'init'})
  }
})
