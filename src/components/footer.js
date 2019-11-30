import Vue from 'vue'
import s from 'vue-styled-components'

export default Vue.extend({
  name:'myFooter',
  render(){
    const Div=s.div`
    height:8%;
    font-size:.9em;
    margin:3px;
    display:flex;
    align-items:center;
    `
    const el=
    <Div>
    @ 2019 musement
    </Div>

    return el
  }
})
