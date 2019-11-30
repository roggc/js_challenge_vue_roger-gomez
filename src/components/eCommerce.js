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
            price:e.retail_price.formatted_value
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
      background-color:aliceblue;
      border-radius:14px;
      padding:5px;
      cursor:pointer;
      outline:none;
      font-size:.8em;
    }
    `

    const products=[]
    this.eCommercex.state.products.forEach(p=>{
      products.push(
        <ProductItem>
        <div>{p.title}</div>
        <div><img src={p.imgUrl}/></div>
        <div>{p.description}</div>
        <PriceAndCart>
        <span>{p.price}</span>
        <button>cart</button>
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
    <Header/>
    <Content>
    <Flex>
    {products}
    </Flex>
    <Pagination eCommercex={this.eCommercex}/>
    </Content>
    <Footer/>
    </Div>
    return el
  }
})
