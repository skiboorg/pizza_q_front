<template>
  <div class="row q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md ">

    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 order-lg-first order-md-first order-sm-first order-xs-first map-wrapper">
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

    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0 order-lg-last order-md-last order-sm-last order-xs-last q-py-xl">
      <h3 class="text-h4 f-raleway-900 q-mb-md">Мы находимся :</h3>
      <div class="flex column items-start">
        <p class="text-decoration-dash cursor-pointer inline-block" :class="{'link-active':selectedAddress===index}" @click="selectedAddress = index"
           v-for="(address,index) in currentCity.adresses" :key="address.id">
          {{address.address}}
        </p>
      </div>

      <p class="text-h5 text-bold q-mb-sm q-mt-lg">Свяжитесь с нами</p>
      <div class="flex items-center justify-start ">
        <div class="flex items-center">
          <img class="q-mr-md" src="~assets/red-phone-icon.png" alt="">
        </div>
        <div class="">
           <p  class="q-mb-sm q-mr-md">
             <a class="no-text-decoration text-grey-10 text-decoration-dash "
                :href="`tel:${currentCity.adresses[selectedAddress].phone}`">{{currentCity.adresses[selectedAddress].phone}}</a>
           </p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props:['title'],
  data() {
    return {
      selectedAddress:0,
    };
  },
  computed:{
    ...mapGetters('city',['currentCity']),
    coords(){
      return this.currentCity?.adresses[this.selectedAddress].coordinates.split(',')
    }
},

}
</script>
<style lang="sass">
.map-wrapper
  height: 387px !important
@media (max-width: 768px)
  .map-wrapper
    height: 250px !important
</style>


