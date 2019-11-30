import Vue from 'vue'
import s from 'vue-styled-components'

export default Vue.extend({
  name:'myContent',
  render(){
    const Div=s.div`
    overflow:auto;
    height:100%;
    margin:3px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    `
    const el=
    <Div>
    {this.$slots.default}
    </Div>

    return el
  }
})
