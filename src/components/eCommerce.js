import Vue from 'vue'
import s from 'vue-styled-components'

export default Vue.extend({
  name:'myECommerce',
  render(){
    const Div=s.div`
      font-family:sans-serif;
    `
    const el=
    <Div>hello roger!</Div>
    return el
  }
})
