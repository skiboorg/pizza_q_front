import { Cookies } from 'quasar'
import { uid } from 'quasar'

const state = () => ({
  items:{  "id": 13,
    "pizza_constructors": [],
    "souces": [],
    "items": [],
    "total_price": 0,
    "total_bonuses": 0,
    "created_at": "",
    "updated_at": "",
    "is_apply_promo":false,
    "persons": 1,

    "client": null,
    "guest": null},
  bonuses:0,
  promo:0


})

const mutations = {
  updateBonuses(state,data){
    state.bonuses = data
  },
  updatePromo(state,data){
    state.promo = data
  },
  updateCart(state,data){
    state.items = data
    //console.log(state)
  }
}

const actions = {
  async fetchCart({commit,state,dispatch}){

      //console.log('fetchCart')

      let session_id = this._vm.$cook.get('session_id')
     // let session_id = Cookies.get('session_id')
      if (!session_id) {
        Cookies.set('session_id', uid())
        session_id = this._vm.$cook.get('session_id')
       // session_id = Cookies.get('session_id')
      }
      const response_cart = await this._vm.$api.get(`/api/cart/get_cart?session_id=${session_id}`)
      commit('updateCart', response_cart.data)
    //console.log('response_cart.data',response_cart.data)
      //commit('setCategories', cats.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))


  },

  eraseCart({commit,state}, data) {
    commit('updateCart', { "id": 13,
      "pizza_constructors": [],
      "souces": [],
      "items": [],
      "total_price": 0,
      "total_bonuses": 0,
      "created_at": "",
      "updated_at": "",
      "persons": 1,
      "client": null,
      "guest": null})
    commit('updatePromo',0)
    commit('updateBonuses',0)
  },
  addBonuses({commit},data){
    commit('updateBonuses',data)
  },
  addPromo({commit},data){
    commit('updatePromo',data)
  },

}

export const getters = {
  is_apply_promo:(state) => state.items.is_apply_promo,
  items_in_cart: (state) => state.items,
  cart_items_count: (state) => {
    return (state.items.items.length + state.items.souces.length + state.items.pizza_constructors.length)
  },
  cart_bonuses: (state) => state.bonuses,
  cart_promo: (state) => state.promo,
  cart_total_price: (state) =>{
    let price = state.items.total_price - state.bonuses
    if (state.promo > 0){
      return parseInt(price - (price * state.promo / 100))
    }else {
      return price
    }

  },
  is_meat_in_cart : (state) =>{
    return state.items.items.filter( x=> x.item.category.is_meat).length
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
