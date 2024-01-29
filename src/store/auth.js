import { LocalStorage } from 'quasar'
import { api } from 'boot/axios'
import { Notify } from 'quasar'
import { Screen } from 'quasar'

const state = () => ({
  user:{},
  loggedIn:false

})

const mutations = {
  updateUser(state,data){
    state.user = data
  },
  updateUserStatus(state,data){
    state.loggedIn = data
  }
}

const actions = {
  loginUser({dispatch},data){
    api.post('/auth/token/login/',data)
      .then(response=>{
        this._vm.$cook.set('auth_token',response.data.auth_token)
        // LocalStorage.set('auth_token',response.data.auth_token)
        api.defaults.headers.common['Authorization'] = 'Token ' + response.data.auth_token
        Notify.create({
          message: 'Получение данных пользователя ...',
          position: Screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'positive',
          icon: 'announcement'
        })
        dispatch('getUser',true)
      })
      .catch(function (error) {
        Notify.create({
         message: 'Проверьте введеные данные',
          position: Screen.lt.sm ? 'bottom' : 'bottom-right',
           color:'red',
          icon: 'announcement'
        })
      })

  },
  async getUser ({commit,dispatch},redirect){

    try {
      const response = await api.get('/api/user/me/')

      commit('updateUser', response.data)
      commit('updateUserStatus', true)

    }catch (e) {
      console.log(e)
      api.defaults.headers.common['Authorization'] = null
      this._vm.$cook.remove('auth_token')
      this.$router.push('/')
    }

  },
  logoutUser({commit}){
    api.post( '/auth/token/logout/')
      .then(response=>{
        //console.log('logoutUser', response)
        api.defaults.headers.common['Authorization'] = null
        this._vm.$cook.remove('auth_token')
        commit('updateUser', {})
        commit('updateUserStatus', false)
        this.dispatch('cart/fetchCart')
      })
      .catch(function (error) {
      })
  }
}

export const getters = {
  isLoggedIn: (state) => state.loggedIn,
  user: (state) => state.user,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
