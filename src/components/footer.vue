<template>
   <footer class="q-py-xl bg-grey-1">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
          <q-avatar @click="$router.push('/')" rounded :size="$q.screen.lt.md ? '50px' : '70px'" class="bg-black q-mb-lg">
          <img class="q-pa-sm cursor-pointer" src="~assets/logo_big.svg">
        </q-avatar>
          <p>Новый Уренгой,<br>ул.Железнодорожная д.12</p>
          <q-no-ssr>
          <p class="text-bold zphone"><a class="no-text-decoration text-grey-10 " href="tel:+73494292407">+7 (3494) 29 24 07</a> </p>
          </q-no-ssr>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="promotions">Акции</router-link></p>
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="about">О нас</router-link></p>
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="delivery">Доставка и оплата</router-link></p>
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="contacts">Контакты</router-link></p>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
          <p>Связаться с нами</p>
          <q-avatar rounded size="50px" >
            <a href="https://vk.com/public199319645" target="_blank"><img class="q-pa-sm cursor-pointer" src="~assets/vk-icon.svg"></a>

        </q-avatar>
          <q-avatar rounded size="50px" >
            <a href="https://www.instagram.com/myaso_na_uglyah_89/" target="_blank"><img class="q-pa-sm cursor-pointer" src="~assets/inst-icon.svg"></a>

        </q-avatar>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
           <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="policy">Политика конфиденциальности</router-link></p>
          <p><router-link class="no-text-decoration text-grey-10" exact-active-class="link-active" exact to="rules">Правила оказания услуг</router-link></p>
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
      tab: 'menu'
    }
  },
  computed:{
    ...mapGetters('cart',['cart_items_count'])

  }
}
</script>


<style lang="sass">

.link-active
  color: $primary !important

</style>
