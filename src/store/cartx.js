import store from './store'

export default store({
  init(this_){
    this_.state={
      totalItemsCart:0,
      totalPriceCart:0
    }
  },
  addToCart(this_,data){
    this_.state.totalItemsCart++
    this_.state.totalPriceCart+=data.val
  }
})
