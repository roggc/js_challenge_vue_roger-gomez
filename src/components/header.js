import Vue from 'vue'
import s from 'vue-styled-components'
import {faShoppingCart,faStar} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

export default Vue.extend({
  name:'myHeader',
  props:{
    eCommercex:Object
  },
  render(){
    const Div=s.div`
    height:11%;
    margin:3px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    `
    const ItemsNumber=s.div`
    font-size: 0.5em;
    background-color: blue;
    color: white;
    border-radius: 7px;
    float: right;
    padding: 3px;
    position: relative;
    top: -11px;
    margin-left: 2px;
    `

    const LittlePrice=s.span`
    font-size:0.7em;
    `

    const FontAwesomeIconS=s(FontAwesomeIcon)`
    cursor:pointer;
    `

    const MiniBag=s.div`
    position:absolute;
    top:14px;
    right:99px;
    border-radius:3px;
    background-color:white;
    border:1px solid;
    padding:3px;
    width: 167px;
    height: 207px;
    font-size:0.8em;
    overflow:auto;
    .firstRow{
      display:flex;
      align-items:flex-start;
      .button{
        box-shadow:0 0 1px;
        border-radius:33px;
        margin: 1px;
        padding: 1px;
        cursor: pointer;
      }
    }
    `

    const Cart=s.div`
    position:relative;
    `

    const Title=s.span`
    flex-grow:2;
    `

    const eCommercex=this.eCommercex
    const cartx=eCommercex.state.cartx
    const wishx=eCommercex.state.wishx

    const el=
    <Div>
    <Title>Musement</Title>
    <Cart>
    <LittlePrice>€{
      (Math.round((cartx.state.totalPriceCart+0.00001)*100)/100).toFixed(2)
    }</LittlePrice>
    <FontAwesomeIconS icon={faShoppingCart} vOn:click={
      ()=>{
        cartx.commit({type:'toggleMiniBag'})
      }
    }/>
    {cartx.state.showMinigBag&&
      <MiniBag>
      {eCommercex.state.miniBagItems.map((item,i)=>
      <div>
      <div class='firstRow'>
      <div>{item.title}</div>
      <div class='button' vOn:click={
        ()=>{
          eCommercex.commit({type:'removeItemFromMiniBag',val:i,
        addedToCart:item.addedToCart,indexCart:item.indexCart})
          cartx.commit({type:'removeFromCart',val:item.price})
        }
      }>x</div>
      </div>
      <div><img src={item.imgUrl}/></div>
      <div><span>€{item.price}</span></div>
      <hr/>
      </div>)}
      </MiniBag>}
    <ItemsNumber>{cartx.state.totalItemsCart}</ItemsNumber>
    </Cart>
    <div>
    <FontAwesomeIcon icon={faStar}/>
    <ItemsNumber>{wishx.state.totalItemsWish}</ItemsNumber>
    </div>
    </Div>

    return el
  }
})
