<template>
  <q-layout view="hHh lpR fFf">
    <q-banner v-if="updateAvaiable" class="bg-primary text-white">
      Обнаружено обновление!
      <template v-slot:action>
        <q-btn outline  color="white"  text-color="white" @click="reloadPage" no-caps label="Обновить" />
      </template>
    </q-banner>
    <Header/>

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

          disable-main-btn
          class="full-width q-mb-md"
          outline
          unelevated
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

      <q-list  padding class="rounded-borders ">
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
        <q-item
          v-if="$user.loggedIn"
          clickable
          v-ripple
          :active="link === 'lk'"
          @click="link = 'lk', $router.push('/lk')"
          active-class="my-menu-link">
          <q-item-section avatar >
            <q-icon name="person" />

          </q-item-section>
          <q-item-section class="relative-position">Личный кабинет
            <q-badge  v-if="!$user.user.tg_id" rounded floating><q-icon size="10px" name="warning"/></q-badge>
          </q-item-section>
        </q-item>
        <q-item
          v-if="$user.loggedIn"
          clickable
          v-ripple
          :active="link === 'logout'"
          @click="logoutUser"
          active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>Выход</q-item-section>
        </q-item>
        <q-item
          v-else
          clickable
          v-ripple
          @click="changeRightMenuVisible(false), changeAuthModalVisible(true)"
          active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>Личный кабинет</q-item-section>
        </q-item>


      </q-list>


    </q-drawer>

    <q-page-container style="padding-top: 0">
      <router-view />
    </q-page-container>
    <q-banner inline-actions v-if="$q.platform.is.iphone && show_ios_install && $q.screen.lt.sm"
              class="install-banner bg-negative text-white">

      <p class="no-margin">
        Чтобы установить приложение нажмите
        <img style="width: 20px;height: 20px;object-fit: contain" src="~assets/share-icon.svg" alt="">
        и На экран "Домой
      </p>
      <template v-slot:action>
        <q-btn outline unelevated color="white" text-color="white" no-caps @click="banner_hide" label="Ок" />
      </template>
    </q-banner>
    <q-banner
      v-if="$q.platform.is.android && show_android_install && $q.screen.lt.sm"
      class="android-install-banner bg-red text-white"
      inline-actions
    >
      <div class="instructions-content flex items-end justify-between">
        <div class="">
          <span  class="instruction-step"><span>1.</span> Нажмите ⋮ (меню) в браузере</span>
          <span class="instruction-step"><span>2.</span> Выберите 'Добавить на главный экран'</span>
          <span class="instruction-step"><span>3.</span> Подтвердите установку</span>
        </div>

        <q-btn outline unelevated color="white" text-color="white" no-caps @click="android_banner_hide" label="Ок" />

      </div>
    </q-banner>
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
      link: '',
      updateAvaiable: false,
      show_ios_install: false,
      show_android_install: false,
    }
  },
  async mounted() {
    // await this.fetchCart()
    // await this.fetchItems()
  },
  async beforeMount() {
    let ios_banner = this.$q.cookies.get('ios_banner')
    let android_banner = this.$q.cookies.get('android_banner')

    if (!ios_banner){
      this.show_ios_install = true
    }

    if (!android_banner){
      this.show_android_install = true
    }

    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (let registration of registrations) {
        registration.addEventListener('updatefound', () => {
          console.log('Service Worker update detected!');
          this.updateAvaiable = true
        });
      }
    }
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
    },
    reloadPage (){
      window.location.reload()
    },
    banner_hide(){
      this.show_ios_install = false
      this.$q.cookies.set('ios_banner','true')
    },
    android_banner_hide(){
      this.show_android_install = false
      this.$q.cookies.set('android_banner','true')
    }
  }
}
</script>
<style lang="sass">
.instruction-step
  display: block
.install-banner
  position: fixed
  bottom: 100px
  z-index: 1000
  &::after
    position: absolute
    content: ''
    bottom: -15px
    left: 50%
    transform: translateX(-50%) rotate(45deg)
    width: 30px
    height: 30px
    background: $negative
    z-index: -1

.android-install-banner
  position: fixed
  bottom: 40px
  padding-bottom: 20px
  width: 100%
  z-index: 1000

</style>
