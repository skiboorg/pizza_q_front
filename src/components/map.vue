<template>
  <div class="row q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md ">
    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 order-lg-first order-md-first order-sm-first order-xs-last">
        <yandex-map
          :coords="coords"
          class="mb-35"
          :class="'ymapContanerHidden'"
          zoom="14"
          style="width: 100%; height: 100%; padding: 0"
          :cluster-options="{ 1: {clusterDisableClickZoom: true} }"
          :controls="['trafficControl']"
          map-type="map">
          <ymap-marker
            markerId="1"
            marker-type="Placemark"
            :coords="coords">
          </ymap-marker>
        </yandex-map>

    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0 order-lg-last order-md-last order-sm-last order-xs-first q-py-xl">
      <h3 class="text-h4 f-raleway-900 q-mb-md">Мы находимся по адресу:</h3>

      <p v-if="currentCity.id===1" @click="coords=[66.088411, 76.662433],selectedAddress=1"  :class="{'link-active':selectedAddress===1}" class="text-decoration-dash cursor-pointer">Новый Уренгой, ул.Железнодорожная д.12</p>
      <p v-if="currentCity.id===2" @click="coords=[57.194362, 65.585954],selectedAddress=1"  :class="{'link-active':selectedAddress===1}" class="text-decoration-dash cursor-pointer">Тюмень, Щербакова, 158/25</p>
<!--      <p class="text-h5 text-bold">Другие наши кафе по адресам:</p>-->
<!--      <p @click="coords=[62.236750, 74.532249],selectedAddress=2" class="text-decoration-dash q-mb-sm cursor-pointer" :class="{'link-active':selectedAddress===2}">Когалым, Кирова 9</p><br>-->
<!--      <p @click="coords=[63.198711, 75.451836],selectedAddress=3" class="text-decoration-dash q-mb-sm cursor-pointer" :class="{'link-active':selectedAddress===3}">Ноябрьск, Дзержинского 12б</p><br>-->
<!--      <p @click="coords=[63.203002, 75.475705],selectedAddress=4" class="text-decoration-dash q-mb-sm cursor-pointer" :class="{'link-active':selectedAddress===4}">Ноябрьск, Магистральная 117в</p>-->
      <p class="text-h5 text-bold q-mb-sm q-mt-lg">Свяжитесь с нами</p>
      <div class="flex items-center justify-start">
        <img class="q-mr-md" src="~assets/red-phone-icon.png" alt="">
<q-no-ssr>
           <p v-if="currentCity.id===1" class="q-mb-sm q-mr-md"><a class="no-text-decoration text-grey-10 text-decoration-dash zphone" href="tel:+73494292407">+7 (3494) 29 24 07</a></p>
          <p v-if="currentCity.id===1" class="q-mb-sm q-mr-md"><a class="no-text-decoration text-grey-10 text-decoration-dash zphone" href="tel:+73494292507">+7 (3494) 29 25 07</a></p>
          <p v-if="currentCity.id===2" class="q-mb-sm q-mr-md"><a class="no-text-decoration text-grey-10 text-decoration-dash zphone" href="tel:+73452925577">+7 (3452) 92-55-77</a></p>
</q-no-ssr>

      </div>

    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props:['title'],
  data() {
    return {

      selectedAddress:1,
    };
  },
  computed:{
    ...mapGetters('city',['currentCity']),
    coords(){
      return this.currentCity.id===1 ? [66.088411, 76.662433] : [57.194362, 65.585954]
    }
},

}
</script>
<style lang="sass">
.map-wrapper
  height: 387px
</style>


