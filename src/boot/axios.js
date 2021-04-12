import axios from 'axios'
import {Cookies} from "quasar";

const api = axios.create({ baseURL: process.env.API })

export default ({ app, router, Vue, store, ssrContext }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies
  let token = cookies.get('auth_token')
  if (token) {
    console.log('Token exists')
    api.defaults.headers.common['Authorization'] = 'Token ' + token
    console.log(api.defaults.headers.common)
  }
  Vue.prototype.$api = api
}
export { api }


// import Vue from 'vue'
// import axios from 'axios'
// import { LocalStorage } from 'quasar'
//
// Vue.prototype.$axios = axios
// const api = axios.create({ baseURL: process.env.API })
// Vue.prototype.$api = api
//
// const token = LocalStorage.getItem('auth_token')
// if (token) {
//   api.defaults.headers.common['Authorization'] = 'Token ' + token
//   console.log(api.defaults.headers.common)
// }
//
// export { axios, api }

