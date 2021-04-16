import {Cookies, LocalStorage} from 'quasar'

// const token = LocalStorage.getItem('auth_token')

export default async ({ app, router, Vue, store, ssrContext }) => {
  console.info('boot: init entered', store)
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies
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
