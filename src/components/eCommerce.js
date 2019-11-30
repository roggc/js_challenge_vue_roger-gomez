import Vue from 'vue'
import s from 'vue-styled-components'
import Pagination from './pagination'
import Paginationx from '../store/paginationx'
import ECommercex from '../store/eCommercex.js'
import Header from './header'
import Content from './content'
import Footer from './footer'

export default Vue.extend({
  name:'myECommerce',
  data(){
    return {
      eCommercex:new ECommercex()
    }
  },
  beforeMount(){
    this.eCommercex.commit({type:'init'})
    fetch(
      'https://api.musement.com/api/v3/venues/164/activities'
      +'?limit='+this.eCommercex.state.limit+'&offset='+this.eCommercex.state.offset
      ,
    {
      headers: {
        'content-type': 'application/json',
        'accept-language': 'it',
        'x-musement-currency': 'EUR',
        'x-musement-version': '3.4.0'
      }
    })
    .then(res=>res.json())
    .then(
      data=>{
        data.forEach(e=>{
          this.eCommercex.state.products.push({
            imgUrl:e.cover_image_url+'?q=60&fit=crop&w='
            +this.eCommercex.state.width+'&h='
            +this.eCommercex.state.height,
            title:e.title,
            description:e.description,
            price:e.retail_price.formatted_value,
            price_value:e.retail_price.value,
            addedToCart:false
          })
        })
    })
  },
  render(){

    const Div=s.div`
      font-family:sans-serif;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      height:100%;
    `
    const ProductItem=s.div`
    border:1px solid;
    border-radius:3px;
    padding:3px;
    margin-right:3px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    `

    const PriceAndCart=s.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    button{
      background-color:grey;
      color:white;
      border-radius:14px;
      padding:5px;
      cursor:pointer;
      outline:none;
      font-size:.8em;
    }
    `

    const InCart=s.span`
    background-color: blue;
    color: white;
    border-radius: 14px;
    padding: 5px;
    font-size:.8em;
    `

    const eCommercex=this.eCommercex
    const cartx=eCommercex.state.cartx
    const paginationx=eCommercex.state.paginationx

    const products=[]
    eCommercex.state.products.forEach((p,i)=>{
      products.push(
        <ProductItem>
        <div>{p.title}</div>
        <div><img src={p.imgUrl}/></div>
        <div>{p.description}</div>
        <PriceAndCart>
        <span>{p.price}</span>
        {
          p.addedToCart||
          eCommercex.state.indexCart.some(index=>{
            if((paginationx.state.actualPage-1)*eCommercex.state.limit+i===
          index){
            return true
          }
          })
          ?
          <InCart>in cart</InCart>:
          <button vOn:click={
            ()=>{
              cartx.commit({type:'addToCart',val:p.price_value})
              eCommercex.commit({type:'addedToCart',val:i})
              eCommercex.commit({type:'addIndexCart',val:
            (paginationx.state.actualPage-1)*eCommercex.state.limit+
          i})
            }
          }>add to cart</button>
        }
        </PriceAndCart>
        </ProductItem>
      )
    })

    const Flex=s.div`
    display:flex;
    overflow:auto;
    `

    const el=
    <Div>
    <Header eCommercex={eCommercex}/>
    <Content>
    <Flex>
    {products}
    </Flex>
    <Pagination eCommercex={eCommercex}/>
    </Content>
    <Footer/>
    </Div>
    return el
  }
})
