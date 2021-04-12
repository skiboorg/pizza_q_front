const state = () => ({
  constructor_visible:false,
  pizza_choose_visible:false,
  payment_url:false,
  payment_visible:false,
  right_menu:false,
  auth_modal:false,
  selected_category:0
})

const mutations = {
  updateConstructorVisible(state,data){
    state.constructor_visible = data
  },
  updatePizzaChooseVisible(state,data){
    state.pizza_choose_visible = data
  },
  updatePaymentVisible(state,data){
    state.payment_visible = data
  },
  updatePaymentUrl(state,data){
    state.payment_url = data
  },
  updateRightMenu(state,data){
    state.right_menu = data
  },
  updateAuthModal(state,data){
    state.auth_modal = data
  },
  updateSelectedCategory(state,data){
    state.selected_category = data
  },

}

const actions = {
  changeConstructorVisible({commit},data){
    commit('updateConstructorVisible', data)
  },
  changePizzaChooseVisible({commit},data){
    commit('updatePizzaChooseVisible', data)
  },
  changePaymentVisible({commit},data){
    commit('updatePaymentVisible', data)
  },
  changePaymentUrl({commit},data){
    commit('updatePaymentUrl', data)
  },
  changeRightMenuVisible({commit},data){
    commit('updateRightMenu', data)
  },
  changeAuthModalVisible({commit},data){
    commit('updateAuthModal', data)
  },
  changeSelectedCategory({commit},data){
    commit('updateSelectedCategory', data)
  },
}

export const getters = {
  is_constructor_visible: (state) => state.constructor_visible,
  is_pizza_choose_visible: (state) => state.pizza_choose_visible,
  is_payment_visible: (state) => state.payment_visible,
  payment_url: (state) => state.payment_url,
  is_right_menu_visible: (state) => state.right_menu,
  is_auth_modal_visible: (state) => state.auth_modal,
  selected_category: (state) => state.selected_category
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
