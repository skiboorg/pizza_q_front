import { Cookies } from 'quasar'

const state = () => ({
  cities:[
    { "id": 1, "adresses": [ { "id": 1, "address": "ул.Железнодорожная д.12", "coordinates": "66.088411, 76.662433", "city": 1 } ], "name": "Новый Уренгой", "info": "Сеть мясных кафе", "is_main": true }
  ],
  main_city:null,
  city_info:null,
  is_city_selected:false,
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

}

const actions = {
  async fetchCity({commit,state,dispatch}){
    console.log('fetchCity')
    if (this._vm.$cook.get('city_selected')){
      console.log('1')

    }else {
       console.log("this._vm.$cook.get('city_selected'",this._vm.$cook.get('city_selected'))
      this._vm.$cook.set('city_selected',false)
    }


    const city_id = this._vm.$cook.get('city_id')
    const city_selected = this._vm.$cook.get('city_selected')
    city_selected ? commit('updateCitySelected',true) : null

    const response = await this._vm.$api.get(`/api/items/get_cities`)
    console.log('response city',response.data)
    if (!city_id){
       dispatch('changeMainCity',response.data.find(x => x.is_main === true).id)
    }
    commit('updateCity',response.data)

  },
  changeMainCity({commit}, data) {
    console.log('changeMainCity')
    let city_in_cookie = this._vm.$cook.get('city_id')
    if (city_in_cookie !== data){
      Cookies.set('city_id',data)
      commit('updateMainCity', data)
      commit('updateCitySelected',true)

      console.log('setMainCity',data)
    }
  }
}

const getters = {
  cities: (state) => state.cities,
  is_city_selected: (state) => state.is_city_selected,
  mainCity: (state) => state.main_city,
  currentCity: (state) =>{
    if (!process.env.SERVER){
       return  state.cities.find(x => x.id === Cookies.get('city_id')) ? state.cities.find(x => x.id === Cookies.get('city_id')) : []
    }

  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}


