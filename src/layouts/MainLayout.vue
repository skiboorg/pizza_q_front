<template>
  <q-layout view="hHh lpR fFf">
    <Header/>
    <q-no-ssr>
    <q-drawer v-model="is_visible" side="right" overlay behavior="mobile" bordered>

      <q-toolbar class="q-pb-md">
        <q-avatar rounded size="50px" class="bg-black q-mt-sm">
          <img class="q-pa-sm" src="~assets/logo_big.svg">
        </q-avatar>

        <q-space/>
        <q-btn @click="is_visible=false"
               flat
               round
               dense icon="close" class="q-mr-sm"/>
      </q-toolbar>
      <div class="q-px-sm">
        <p class="text-bold">Ваш город</p>
        <q-btn-dropdown
          split
          color="primary"
          disable-main-btn
          class="full-width q-mb-md"
          push
          no-caps>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-icon left name="location_city" />
              <div class="text-center">
                {{currentCity.name}}
              </div>
            </div>
          </template>

          <q-list>
            <q-item v-for="city in cities" :key="city.id" clickable v-close-popup @click="changeCity(city.id)">

              <q-item-section>
                <q-item-label>{{city.name}}</q-item-label>
                <q-item-label caption v>{{city.info}}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="city.id === $q.cookies.get('city_id')">
                <q-icon name="check" color="positive" />
              </q-item-section>
            </q-item>


          </q-list>
        </q-btn-dropdown>
      </div>

      <q-list  padding class="rounded-borders text-primary">
        <q-item
          clickable
          v-ripple
          :active="link === 'offer'"
          @click="link = 'offer', $router.push('/promotions')"
          active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="local_offer" />
          </q-item-section>
          <q-item-section>Акции</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="link === 'vac'"
          @click="link = 'vac', $router.push('/vacancy')"
          active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="people_alt" />
          </q-item-section>
          <q-item-section>Вакансии</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="link === 'delivery'"
          @click="link = 'delivery', $router.push('/delivery')"
          active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="delivery_dining" />
          </q-item-section>
          <q-item-section>Доставка и оплата</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="link === 'about'"
          @click="link = 'about', $router.push('/about')"
          active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="help_outline" />
          </q-item-section>
          <q-item-section>О нас</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="link === 'contact'"
          @click="link = 'contact', $router.push('/contacts')"
          active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="contact_page" />
          </q-item-section>
          <q-item-section>Контакты</q-item-section>
        </q-item>
        <q-separator spaced />
<!--        <q-item-->
<!--          v-if="$user.loggedIn"-->
<!--          clickable-->
<!--          v-ripple-->
<!--          :active="link === 'lk'"-->
<!--           @click="link = 'lk', $router.push('/lk')"-->
<!--          active-class="my-menu-link">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="person" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>Личный кабинет</q-item-section>-->
<!--        </q-item>-->
<!--        <q-item-->
<!--          v-if="$user.loggedIn"-->
<!--          clickable-->
<!--          v-ripple-->
<!--          :active="link === 'logout'"-->
<!--          @click="logoutUser"-->
<!--          active-class="my-menu-link">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="logout" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>Выход</q-item-section>-->
<!--        </q-item>-->
<!--        <q-item-->
<!--          v-else-->
<!--          clickable-->
<!--          v-ripple-->
<!--          @click="changeRightMenuVisible(false), changeAuthModalVisible(true)"-->
<!--          active-class="my-menu-link">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="login" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>Личный кабинет</q-item-section>-->
<!--        </q-item>-->


      </q-list>
      <div class="flex-center column items-start">
            <a target="_blank" href="https://apps.apple.com/us/app/meat-coal/id1572409729"><img class="store-img" src="~assets/ios.png" alt=""></a>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=ru.meat.coal.app"><img class="store-img" src="~assets/play.png" alt=""></a>
          </div>
      <div  class="q-px-sm">



<!--        <p class="q-mb-sm text-bold">Адреса кафе</p>-->
<!--        <p class="q-mb-none" v-for="adress in currentCity.adresses" :key="adress.id">{{adress.address}}</p>-->

      </div>

    </q-drawer>
    </q-no-ssr>
    <q-page-container style="padding-top: 0">
      <!--      <transition name="fade">-->
      <router-view />
      <!--        </transition>-->
    </q-page-container>
        <Footer/>

  </q-layout>
</template>

<script>
import Header from 'src/components/header'
import Footer from "components/footer";
import {mapActions, mapGetters} from "vuex";
export default {
  components:{
    Header,
    Footer
  },
  data() {
    return {
      link: ''

    }
  },
  async mounted() {
    // await this.fetchCart()
    // await this.fetchItems()
  },
  computed:{
    ...mapGetters('city',['cities','currentCity']),
    //...mapGetters('products',['categories']),
    is_visible: {
      get(){
        return this.$store.state.componentState.right_menu
      },
      set(val){
        return  this.changeRightMenuVisible(val)
      }
    },
  },
  methods:{
    ...mapActions('city',['changeMainCity']),
    ...mapActions('products',['fetchItems']),
    ...mapActions('cart',['fetchCart','eraseCart']),
    ...mapActions('auth',['logoutUser']),
    ...mapActions('componentState',['changeRightMenuVisible','changeAuthModalVisible']),
    async changeCity(id){
      await this.changeMainCity(id)
      this.$q.cookies.set('city_selected',true)
      this.is_city_not_selected=false
      await this.fetchItems()
      //this.city = this.currentCity
      await this.$api.post(`api/cart/erase_cart/${this.$q.cookies.get('session_id')}`)
      await this.fetchCart()
      !process.env.SERVER ? window.location.reload() : null

    },
    async logout(){
      this.logoutUser()
      await this.fetchCart()
    }
  }
}
</script>
<style>
.my-menu-link{
  color: white;
  background: #EF2121;

}

.page-enter-active,
.page-leave-active {

  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 200ms;
  transform: translateX(0%);
}
.page-enter,
.page-leave-to {
  transform: translateX(-100%);

}
</style>
