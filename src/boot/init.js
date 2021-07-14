import {Cookies, LocalStorage} from 'quasar'
import api from 'axios'
// const token = LocalStorage.getItem('auth_token')

export default async ({ app, router, Vue, store, ssrContext }) => {
  console.info('boot: init entered')
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  if (!process.env.SERVER) {
   if(window.location.host.split('.').length>1){
      const response = await api.get(`http://localhost:8000/api/items/get_city?domain=${window.location.host.split('.')[0]}`)
     console.log(response.data)
     cookies.set('city_selected',true)
     cookies.set('city_id',response.data.id)
   }
  }


    let token = cookies.get('auth_token')
  Vue.prototype.$cook = cookies
   store.dispatch('products/fetchItems')
   store.dispatch('cart/fetchCart')

  if (token) {
   await store.dispatch('auth/getUser')
  }
  Vue.prototype.$user = store.state.auth
  console.info('boot: init exited')
}


// import { LocalStorage } from 'quasar'
// import Vue from 'vue'
// import {api} from "boot/axios";
//
// const token = LocalStorage.getItem('auth_token')
//
// export default async ({ app, router, Vue, store }) => {
//   console.info('boot: init entered', store)
//   store.dispatch('cart/fetchCart')
//   store.dispatch('products/fetchItems')
//   if (token) {
//    await store.dispatch('auth/getUser')
//   }
//   Vue.prototype.$user = store.state.auth
//   console.info('boot: init exited')
// }
