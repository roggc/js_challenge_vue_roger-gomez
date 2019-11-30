import store from './store'

export default store({
  init(this_){
    this_.state={
      totalItemsWish:0
    }
  },
  addToWish(this_){
    this_.state.totalItemsWish++
  },
  removeFromWish(this_){
    this_.state.totalItemsWish--
  }
})
