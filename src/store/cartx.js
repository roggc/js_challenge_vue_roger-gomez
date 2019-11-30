import store from './store'

export default store({
  init(this_){
    this_.state={
      totalItemsCart:0,
      totalPriceCart:0,
      showMinigBag:false
    }
  },
  addToCart(this_,data){
    this_.state.totalItemsCart++
    this_.state.totalPriceCart+=data.val
  },
  toggleMiniBag(this_,data){
    this_.state.showMinigBag=!this_.state.showMinigBag
  },
  removeFromCart(this_,data){
    this_.state.totalItemsCart--
    this_.state.totalPriceCart-=data.val
  }
})
