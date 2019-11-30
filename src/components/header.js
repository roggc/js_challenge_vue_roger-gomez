import Vue from 'vue'
import s from 'vue-styled-components'

export default Vue.extend({
  name:'myHeader',
  render(){
    const Div=s.div`
    height:11%;
    margin:3px;
    display:flex;
    align-items:center;
    `
    const el=
    <Div>
    Musement
    </Div>

    return el
  }
})
