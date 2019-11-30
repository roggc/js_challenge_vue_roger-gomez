import Vue from 'vue'
import s from 'vue-styled-components'

export default Vue.extend({
  name:'myPagination',
  props:{
    eCommercex:Object
  },
  render(){
    const Div=s.div`
    display:flex;
    justify-content:center;
    span{
      margin:3px;
    }
    `
    const Page=s.span`
    cursor:pointer;
    :hover{
      color:red;
    }
    `
    const ActualPage=s.span`
    color:grey;
    `

    const eCommercex=this.eCommercex
    const paginationx=eCommercex.state.paginationx

    const pages=[]

    if(paginationx.state.actualPage>paginationx.state.offset+1){
      pages.push(<span>...</span>)
    }

    for(var i=paginationx.state.actualPage-
      paginationx.state.offset-1;i<paginationx.state.actualPage+
      paginationx.state.offset;i++){
      if(i>=0&& i< paginationx.state.numberOfPages){
        if(i===paginationx.state.actualPage-1){
          pages.push(<ActualPage>{i+1}</ActualPage>)
        }else{
          pages.push(<Page vOn:click={
            (i=>()=>{
              paginationx.commit({type:'setActualPage',val:i+1})
              eCommercex.commit({type:'setOffset',val:i})
              fetch(
                'https://api.musement.com/api/v3/venues/164/activities'
                +'?limit='+this.eCommercex.state.limit+'&offset='
                +i
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
                  this.eCommercex.state.products=[]
                  data.forEach(e=>{
                    this.eCommercex.state.products.push({
                      imgUrl:e.cover_image_url+'?q=60&fit=crop&w='
                      +this.eCommercex.state.width+'&h='
                      +this.eCommercex.state.height,
                      cover_image_url:e.cover_image_url,
                      title:e.title,
                      description:e.description,
                      price:e.retail_price.formatted_value,
                      price_value:e.retail_price.value,
                      addedToCart:false
                    })
                  })
              })
            })(i)
          }>{i+1}</Page>)
        }
      }
    }

    if(paginationx.state.actualPage<paginationx.state.numberOfPages-
    paginationx.state.offset){
      pages.push(<span>...</span>)
    }

    const el=
    <Div>
    {pages}
    </Div>

    return el
  }
})
