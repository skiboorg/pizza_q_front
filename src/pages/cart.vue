<template>
  <q-no-ssr>
  <q-page v-if="cart_items_count>0" class="q-pa-sm q-mb-lg">
    <div class="container-sm">
      <h1 class="text-h3 f-raleway-900">Корзина</h1>
      <Cart :headerCart="false"/>
    </div>

  </q-page>
  <q-page v-else class="flex items-center justify-center column">
    <div class="container-sm text-center">
       <img src="~assets/empty-cart.svg" >
    <p class="text-h6">Вы сюда еще ничего не добавили</p>
      <q-btn unelevated no-caps color="primary" @click="$router.push('/')" label="открыть меню"/>
    </div>

  </q-page>
    </q-no-ssr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Cart from "components/cart";
export default {
  components:{
    Cart
  },

  data () {
    return {
      is_loading:false,
      promoCode:null,
      with_bonuses: this.cart_bonuses > 0,
    }
  },
  computed:{
    ...mapGetters('cart',['cart_items_count']),
  },


}
</script>
<style lang="sass">

</style>
