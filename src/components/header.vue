<template>
  <q-header class="header bg-white text-black q-py-sm"
            :class="[scrollPosition > 90 && !scrollUp ? 'header-sticky shadow-3':'', scrollPosition > 90 ? 'shadow-3':'']">
    <div class="container">

      <q-toolbar class="q-pb-md ">
        <q-avatar @click="$router.push('/')" rounded :size="$q.screen.lt.md ? '50px' : '70px'" class="bg-black q-mr-md">
          <img class="q-pa-sm cursor-pointer" src="~assets/logo_big.svg">
        </q-avatar>
        <div class="gt-sm">
          <p class="no-margin text-bold">Новый Уренгой</p>
          <p  class="no-margin text-caption text-bold">Сеть мясных кафе</p>
        </div>
        <q-space/>
        <q-tabs dense class="gt-sm" inline-label v-model="tab" shrink :indicator-color="tab==='tab5' ? 'white' : 'primary'">
          <q-route-tab name="tab1" to="promotions"  label="Акции" />
          <q-route-tab name="tab2" to="delivery" label="Доставка и оплата" />
          <q-route-tab name="tab3" to="about" label="О нас" />
          <q-route-tab name="tab4" to="contacts" label="Контакты" />
          <q-tab v-if="!$user.loggedIn" name="tab5" @click="changeAuthModalVisible(true)" icon="login"  label="Личный кабинет" />
          <q-route-tab  v-else name="tab5" to="lk" icon="person" label="Личный кабинет" />
        </q-tabs>
        <q-space/>
        <div class="gt-sm">
          <p class="text-bold text-h6 no-margin zphone"><a class="text-primary" style="text-decoration: unset" href="tel:+73494292407">+7 (3494) 29 24 07</a></p>
        </div>
        <q-btn @click="changeRightMenuVisible(true)" flat round dense icon="menu" class="q-mr-sm lt-md"/>
      </q-toolbar>

      <div v-if="categories.length>0" class="row items-start">
        <div class="col-10">
          <q-tabs
            v-model="tab"
            outside-arrows
            mobile-arrows
            dense
            active-color="white"
            indicator-color="transparent"
            :ripple="false"
            no-caps
            class=" menu-tabs bg-white text-caption q-tabs__content--align-justify">
            <q-tab :name="index"
                   class="text-uppercase  "
                   :ripple="false"
                   :label="item.name"
                   v-for="(item,index) in categories"
                   :key="item.id"
                   @click="changeSelectedCategory(index), is_index_page
                   ? $scrollTo('#catID_'+item.id, 200, {offset: -90})
                   : $router.push(`/#catID_${item.id}`)"
            />
            <!--                    @click="selectedCategory=item.id"-->
          </q-tabs>
        </div>
        <div  @mouseover="cart= true" @click="cart= true" class="col-lg-1 col-md-1 col-sm-1 col-xs-1 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0 cursor-pointer text-right">
          <q-chip class="cart-icon"  icon="shopping_cart" :label="`${items_in_cart.total_price} р`"  >
            <q-badge v-if="cart_items_count>0" floating rounded>{{cart_items_count}}</q-badge>
            <q-menu  fit :offset="[0, 12]" @mouseleave="cart=false" v-model="cart"  self="top end" anchor="bottom end">
              <Cart class="cart" :headerCart="true"/>

              <div v-if="cart_items_count>0" class="flex justify-between items-center q-px-sm">
                <p class="no-margin text-h6 text-bold">Сумма</p>
                <p class="no-margin text-h6 text-bold text-primary">{{items_in_cart.total_price}} р</p>
              </div>
              <div v-if="cart_items_count>0" class="text-center q-pa-sm">
                <q-btn @click="openCartPage" class="full-width  text-bold " color="primary" label="В корзину"/>
              </div>
            </q-menu>
          </q-chip>
        </div>
      </div>
      <div v-if="!categories.length>0" class="row q-gutter-md">
        <q-skeleton type="QBtn" style="width: 100%" />
      </div>
    </div>
    <AuthModal/>
  </q-header>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Cart from "components/cart";
import AuthModal from "components/authModal";
export default {
  components:{
    Cart,
    AuthModal
  },
  data() {
    return {
      tab:0,
      right_menu: false,
      cart: false,
      currentCityIsOK:true,
      lastScrollPosition:null,
      scrollPosition:null,
      scrollUp:false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  computed:{
    ...mapGetters('city',['cities',]), //'currentCity'
    ...mapGetters('products',['categories']),
    ...mapGetters('cart',['cart_items_count','items_in_cart']),
    is_index_page(){
      return this.$route.path === '/'
    }
  },
  methods:{
    ...mapActions('city',['changeMainCity']),
    ...mapActions('products',['fetchItems']),
    ...mapActions('cart',['fetchCart','eraseCart']),
    ...mapActions('auth',['logoutUser']),
    ...mapActions('componentState',['changeRightMenuVisible','changeAuthModalVisible','changeSelectedCategory']),
    openCartPage(){
      this.$analytics.fbq.event('InitiateCheckout',{
      value: this.items_in_cart.total_price,
      currency: 'RUB',
      })
      this.$router.push('/cart')
    },
    async changeCity(id){
      this.changeMainCity(id)
      await this.fetchItems()
      await this.$api.post(`api/cart/erase_cart/${this.$q.cookies.get('session_id')}`)
      await this.fetchCart()
    },
    async logout(){
      this.logoutUser()
      await this.eraseCart()
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
      if (this.lastScrollPosition > this.scrollPosition){
        this.scrollUp = true
      }else {
        this.scrollUp = false
      }
      this.lastScrollPosition = this.scrollPosition
    },
  }
}
</script>
<style lang="sass">
.header
  position: sticky
  transition: all .2s linear
.header-sticky
  top: -86px
.cart
  width: 320px
  max-height: 335px
  overflow-y: auto
  &::-webkit-scrollbar
    width: 3px
  &::-webkit-scrollbar-track
    //box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.05)
    background: #FFFFFF
    border-radius: 10px
  &::-webkit-scrollbar-thumb
    background: #EBEBEB
    border-radius: 3px
  &::-webkit-scrollbar-thumb:hover
    background: #EBEBEB

@media (max-width: 768px)
  .header-sticky
    top: -65px
  .cart-icon
    padding: 9px
</style>
