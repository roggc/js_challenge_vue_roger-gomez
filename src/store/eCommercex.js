import store from './store'
import Paginationx from './paginationx'
import Cartx from './cartx'

export default store({
  init(this_){
    this_.state={
      paginationx:new Paginationx(),
      cartx:new Cartx(),
      products:[],
      width:300,
      height:200,
      limit:6,
      offset:0,
      indexCart:[]
    }
    this_.state.paginationx.commit({type:'init'})
    this_.state.cartx.commit({type:'init'})
  },
  addedToCart(this_,data){
    this_.state.products[data.val].addedToCart=true
  },
  setOffset(this_,data){
    this_.state.offset=data.val
  },
  addIndexCart(this_,data){
    this_.state.indexCart.push(data.val)
  }
})
