<template>
  <q-header class="header bg-white text-black q-pt-sm"
            :class="[scrollPosition > 90 && !scrollUp ? 'header-sticky shadow-2':'', scrollPosition > 90 ? 'shadow-2':'']">
    <div class="container">

      <q-toolbar class="q-pb-md ">
        <q-avatar @click="$router.push('/')" rounded :size="$q.screen.lt.md ? '50px' : '70px'" class="bg-black q-mr-md">
          <img class="q-pa-sm cursor-pointer" src="~assets/logo_big.svg">
        </q-avatar>
        <div class="lt-md">
          <q-space/>

          <p class="text-bold text-h6 no-margin"><a class="text-primary zphone" style="text-decoration: unset" :href="`tel:${currentCity.main_phone}`">{{currentCity.main_phone}}</a></p>

          <q-space/>
        </div>
        <div class="gt-sm">
         <p @click="is_city_not_selected=!is_city_not_selected"  class="no-margin text-bold text-decoration-dash cursor-pointer">{{currentCity.name}}</p>
          <p  class="no-margin text-caption text-bold">Сеть мясных кафе</p>
        </div>
        <q-space/>
        <q-tabs dense  inline-label v-model="tab" class="gt-sm " shrink active-color="white" indicator-color="primary" >
          <q-route-tab :ripple="false" no-caps  name="tab1" to="/promotions"  label="Акции" />
          <q-route-tab :ripple="false" no-caps name="tab2" to="/delivery" label="Доставка и оплата" />
          <q-route-tab :ripple="false" no-caps name="tab3" to="/vacancy" label="Вакансии" />
          <q-route-tab :ripple="false" no-caps name="tab4" to="/contacts" label="Контакты" />
          <q-tab :ripple="false" no-caps v-if="!$user.loggedIn" name="tab5" @click="changeAuthModalVisible(true)" icon="login"  label="Личный кабинет" />
          <q-route-tab :ripple="false" no-caps v-else name="tab5" to="/lk" icon="person" label="Личный кабинет">
            <q-badge v-if="!$user.user.tg_id" rounded floating><q-icon name="warning"/></q-badge>
          </q-route-tab>
        </q-tabs>
        <q-space/>
        <div class="gt-sm">
          <p class="text-bold text-h6 no-margin zphone"><a class="text-primary " style="text-decoration: unset" :href="`tel:${currentCity.main_phone}`">{{currentCity.main_phone}}</a></p>
        </div>
        <q-btn @click="changeRightMenuVisible(true)" flat round dense icon="menu" class="q-mr-sm lt-md">
          <q-badge  v-if="$user.loggedIn && !$user.user.tg_id" rounded floating><q-icon size="10px" name="warning"/></q-badge>
        </q-btn>
      </q-toolbar>

      <div v-if="categories.length>0" class="row items-start">
        <div class="col-12 col-md-11">
          <q-tabs
            v-model="tab"
            outside-arrows
            mobile-arrows
            dense
            v-touch-swipe
            active-color="white"
            indicator-color="primary"

            :ripple="false"
            no-caps
            class="q-py-sm    text-bold q-tabs__content--align-justify">
            <q-tab :name="index"
                   class="text-bold "
                   :ripple="false"
                   no-caps
                   :label="item.name"
                   v-for="(item,index) in categories"
                   :key="item.id"
                   @click="changeSelectedCategory(index), is_index_page
                   ? $scrollTo('#catID_'+item.id, 200, {offset: !scrollUp ? -150 : -80})
                   : $router.push(`/#catID_${item.id}`)"
            />
            <!--                    @click="selectedCategory=item.id"-->
          </q-tabs>
        </div>
        <div  @mouseover="cart= true" @click="cart= true" class="gt-sm col-md-1  cursor-pointer text-center">
          <q-chip class="cart-icon"  icon="shopping_cart" :label="`${items_in_cart.total_price} р`"  >
            <q-badge v-if="cart_items_count>0" floating rounded>{{cart_items_count}}</q-badge>
            <q-menu  fit :offset="[0, 12]" @mouseleave="cart=false" v-model="cart"  self="top end" anchor="bottom end">
              <Cart class="cart" :headerCart="true"/>
              <p class="q-mb-none text-caption text-primary text-right q-px-sm" v-if="is_apply_promo">Цена с учетом акции</p>
              <div v-if="cart_items_count>0" class="flex justify-between items-center q-px-sm">


                <p class="no-margin text-h6 text-bold">Сумма</p>
                <p class="no-margin text-h6 text-bold text-primary">{{items_in_cart.total_price}} р</p>
              </div>
              <div v-if="cart_items_count>0" class="text-center q-pa-sm">
                <q-btn no-caps unelevated  @click="openCartPage" class="full-width  text-bold " color="primary" label="В корзину"/>
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
    <q-dialog v-model="is_city_not_selected" persistent>
      <q-card style="width: 300px; max-width: 90vw;">
        <q-card-section  class="row bg-primary text-white items-center q-py-sm">
          <div class="text-h6">Выберете Ваш город</div>


        </q-card-section>

        <q-card-section >
          <div class="q-mb-sm" v-for="city in cities" :key="city.id">
            <p class="cursor-pointer q-mb-none inline-block text-decoration-dash"  @click="changeCity(city.id)">
            {{city.name}}
          </p>
          </div>

       </q-card-section>
      </q-card>
    </q-dialog>
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
      is_city_not_selected:true,
      currentCityIsOK:true,
      lastScrollPosition:null,
      scrollPosition:null,
      scrollUp:false,
      city:{}
    }
  },

  beforeMount() {
    window.addEventListener('scroll', this.updateScroll);
    if (this.$q.cookies.get('city_selected')){
      //console.log('selected')
      this.is_city_not_selected=false
      this.$q.cookies.set('city_selected',true)
    }else {
      //console.log('not selected')
      this.is_city_not_selected=true
    }
    this.city = this.currentCity

  },
  computed:{
    ...mapGetters('city',['cities','currentCity']),
    ...mapGetters('products',['categories']),
    ...mapGetters('cart',['cart_items_count','items_in_cart','is_apply_promo']),
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
      this.$router.push('/cart')
    },
    async changeCity(id){
      await this.changeMainCity(id)
      this.$q.cookies.set('city_selected',true)
      this.is_city_not_selected=false
      await this.fetchItems()
      this.city = this.currentCity
      await this.$api.post(`api/cart/erase_cart/${this.$q.cookies.get('session_id')}`)
      await this.fetchCart()
      !process.env.SERVER ? window.location.reload() : null
      //this.$router.push('/')
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
  top: -94px
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
    background: transparent
.q-tab__indicator
  height: 100%
  border-radius: 8px
  z-index: -1
.q-hoverable:hover > .q-focus-helper
  opacity: 0 !important
.q-tabs__arrow
  color: $primary
.q-header--hidden
  transform: translateY(-60%)
</style>
