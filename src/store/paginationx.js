import store from './store'

export default store({
  init(this_){
    this_.state={
      numberOfPages:66,
      actualPage:1,
      offset:5
    }
  },
  setActualPage(this_,data){
    this_.state.actualPage=data.val
  }
})
