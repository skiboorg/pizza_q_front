import { Cookies } from 'quasar'

const state = () => ({
  cities:[
    { "id": 1, "adresses": [ { "id": 1, "address": "ул.Железнодорожная д.12", "coordinates": "66.088411, 76.662433", "city": 1 } ], "name": "Новый Уренгой", "info": "Сеть мясных кафе", "is_main": true }
  ],
  main_city:null,
  city_info:null,
  is_city_selected:false,
  promos:[],
  banners:[],
  currentCity:{}

})

const mutations = {
  updateCity(state,data){
    state.cities = data
  },
  updateMainCity(state,data){
    state.main_city = data
  },
  updateCitySelected(state,data){
    state.is_city_selected = data
  },
  updatePromos(state,data){
    state.promos = data
  },
  updateBanners(state,data){
    state.banners = data
  },
  updateCurrentCity(state,data){
    state.currentCity = data
  },

}

const actions = {
  async fetchCity({commit,state,dispatch}){
    //console.log('fetchCity')
    if (this._vm.$cook.get('city_selected')){
      //console.log('1')
    }else {

      this._vm.$cook.set('city_selected',false)
    }


    const city_id = this._vm.$cook.get('city_id')
    const city_selected = this._vm.$cook.get('city_selected')

    city_selected ? commit('updateCitySelected',true) : null

    const response = await this._vm.$api.get(`/api/items/get_cities`)
    //console.log('response city',response.data)
    if (!city_id){
       dispatch('changeMainCity',response.data.find(x => x.is_main === true).id)
      commit('updateCurrentCity', response.data.find(x => x.is_main === true))

      this._vm.$cook.set('metrika_id',response.data.find(x => x.is_main === true).metrika_id)
      this._vm.$cook.set('call_tracker_id',response.data.find(x => x.is_main === true).call_tracker_id)
    }else{

      commit('updateCurrentCity', response.data.find(x => x.id === city_id))

      this._vm.$cook.set('metrika_id',response.data.find(x => x.id === city_id).metrika_id)
      this._vm.$cook.set('call_tracker_id',response.data.find(x => x.id === city_id).call_tracker_id)

      const response_banner = await this._vm.$api.get(`/api/items/get_banners?city_id=${city_id}`)
      commit('updateBanners', response_banner.data)
      const responce_promo =  await this._vm.$api.get(`/api/promotion/get_all?city_id=${city_id}`)
      commit('updatePromos', responce_promo.data)
    }
    commit('updateCity',response.data)

  },
  async changeMainCity({commit,getters}, data) {
    //console.log('changeMainCity')
    let city_in_cookie = this._vm.$cook.get('city_id')
    if (city_in_cookie !== data){
      this._vm.$cook.remove('city_id')
      this._vm.$cook.remove('metrika_id')
      this._vm.$cook.remove('call_tracker_id')
      this._vm.$cook.set('city_id',data)
      commit('updateMainCity', data)
      commit('updateCitySelected',true)

      commit('updateCurrentCity', getters['cities'].find(x => x.id === data))
      this._vm.$cook.set('metrika_id',getters['cities'].find(x => x.id === data).metrika_id)
      this._vm.$cook.set('call_tracker_id',getters['cities'].find(x => x.id === data).call_tracker_id)
      const response = await this._vm.$api.get(`/api/items/get_banners?city_id=${data}`)
      commit('updateBanners', response.data)
      const responce_promo =  await this._vm.$api.get(`/api/promotion/get_all?city_id=${data}`)
      commit('updatePromos', responce_promo.data)


      //console.log('setMainCity',data)
    }
  }
}

const getters = {
  cities: (state) => state.cities,
  promos: (state) => state.promos,
  banners: (state) => state.banners,
  is_city_selected: (state) => state.is_city_selected,
  mainCity: (state) => state.main_city,
  currentCity: (state) =>state.currentCity,

}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}


