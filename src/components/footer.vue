<template>
   <footer class="q-py-xl bg-grey-1">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
          <q-avatar @click="$router.push('/')" rounded :size="$q.screen.lt.md ? '50px' : '70px'" class="bg-black q-mb-lg">
          <img class="q-pa-sm cursor-pointer" src="~assets/logo_big.svg">
        </q-avatar>
          <p>{{currentCity.name}}</p>
          <q-no-ssr>
          <p class="text-bold zphone"><a class="no-text-decoration text-grey-10 zphone" :href="`tel:${currentCity.main_phone}`">{{currentCity.main_phone}}</a> </p>
          </q-no-ssr>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="promotions">Акции</router-link></p>
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="about">О нас</router-link></p>
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="delivery">Доставка и оплата</router-link></p>
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="vacancy">Вакансии</router-link></p>
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="contacts">Контакты</router-link></p>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
          <p class="q-mb-sm">Связаться с нами</p>
          <div class="q-mb-md">
            <q-avatar rounded size="50px" >
            <a :href="currentCity.vk_link" target="_blank"><img class="q-pa-sm cursor-pointer" src="~assets/vk-icon.svg"></a>

        </q-avatar>
          <q-avatar rounded size="50px" >
            <a :href="currentCity.inst_link" target="_blank"><img class="q-pa-sm cursor-pointer" src="~assets/inst-icon.svg"></a>
        </q-avatar>
          </div>

<!--          <div class="flex column items-start">-->
<!--            <a target="_blank" href="https://apps.apple.com/us/app/meat-coal/id1572409729"><img class="store-img" src="~assets/ios.png" alt=""></a>-->
<!--            <a target="_blank" href="https://play.google.com/store/apps/details?id=ru.meat.coal.app"><img class="store-img" src="~assets/play.png" alt=""></a>-->
<!--          </div>-->
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
           <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="policy">Политика конфиденциальности</router-link></p>
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="rules">Правила оказания услуг</router-link></p>
<!--           <p class="q-mb-none q-mt-lg flex items-center">-->
<!--            Разработка сайта-->
<!--&lt;!&ndash;            <img class="q-ml-lg q-mr-xs" style="width: 30px;height: 30px;object-fit: contain" src="https://www.astrapromo.ru/images/logo.png" alt="">&ndash;&gt;-->
<!--            <a style="text-decoration: none;font-weight: bold" target="_blank" href="https://www.astrapromo.ru/">ASTRAPROMO</a>-->
<!--           </p>-->
        </div>
      </div>
    </div>

    </footer>


</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tab: 'menu',
      current_City:{}
    }
  },
  mounted() {
    this.current_City = this.currentCity
  },
computed:{
    ...mapGetters('city',['currentCity']),
}
  // computed:{
  //   ...mapGetters('cart',['cart_items_count'])
  //
  // }
}
</script>


<style lang="sass">

.link-active
  color: $primary !important
.store-img
  width: 200px
  height: auto
  object-fit: contain
</style>
