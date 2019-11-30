import Vue from 'vue'
import s from 'vue-styled-components'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
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

    const cartx=this.eCommercex.state.cartx

    const el=
    <Div>
    <span>Musement</span>
    <div>
    <LittlePrice>€{
      (Math.round((cartx.state.totalPriceCart+0.00001)*100)/100).toFixed(2)
    }</LittlePrice>
    <FontAwesomeIcon icon={faShoppingCart}/>
    <ItemsNumber>{cartx.state.totalItemsCart}</ItemsNumber>
    </div>
    </Div>

    return el
  }
})
