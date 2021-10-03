<template>

  <q-page class="q-pb-lg">
    <section v-if="categories.length>0" class="home-page-slider q-mt-lg">
      <div class="home-page-slider__overlay overlay-left">
        <svg @click="homeTopSliderPrev" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="17" cy="17" r="17" ></circle>
          <path d="M14.759 9.8418L20.9409 16.9997L14.759 24.1576" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <div @click="homeTopSliderNext" class="home-page-slider__overlay overlay-right">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="17" cy="17" r="17" ></circle>
          <path d="M14.759 9.8418L20.9409 16.9997L14.759 24.1576" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <swiper ref="homeTopSlider" :options="sliderHomeTopOption">
        <swiper-slide class="home-page-slider__item" v-for="banner in banners" :key="banner.id">
          <div class=""><img style="max-width: 100%; height: auto" :src="banner.image" alt="" ></div>
        </swiper-slide >
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>
    <div v-if="categories.length>0" class="container">

      <section  :data-index="index" :id="`catID_${category.id}`" v-for="(category,index) in categories" :key="category.id" class="">
        <h3 class="f-raleway-900">{{category.name}}</h3>
        <div class="products-grid">

          <!--            <q-card  v-if="category.is_pizza" class="q-mx-sm q-mb-sm item-card" flat >-->
          <!--              <q-card-section :horizontal="$q.screen.lt.sm" class="q-mb-sm no-padding">-->
          <!--                <q-img-->
          <!--                  :ratio="1"-->
          <!--                  contain-->
          <!--                  class="col-lg-5 col-md-5 col-sm-5 col-xs-4 item-card__image"-->
          <!--                  src="~assets/constr.webp"/>-->
          <!--              <q-card-section class="q-pa-lg-md q-pa-md-md q-py-sm-none q-px-sm-sm q-py-xs-none q-px-xs-sm col-lg-7 col-md-7 col-sm-7 col-xs-8">-->
          <!--                  <p class="text-subtitle1 lh-100 text-bold ">Пицца-конструктор</p>-->
          <!--                   <p class="text-caption text-grey q-mb-sm ingridient-items">Выберите половинки пицц и соберите свою!</p>-->
          <!--                  <q-btn unelevated-->
          <!--                         @click="changeConstructorVisible(true)"-->
          <!--                         color="primary"-->
          <!--                         class="in-cart-btn full-width"-->
          <!--                         label="Собрать" />-->

          <!--                </q-card-section>-->
          <!--              </q-card-section>-->
          <!--            </q-card>-->

          <ItemCard   v-if="!item.is_for_meat && item.is_active && !item.is_gift"
                      v-for="item in category.items"
                      :item="item"
                      :key="item.id"/>
        </div>
      </section>

    </div>
    <div v-else class="container">
      <section >
        <div class="products-grid">
          <q-card v-for="i in 20" :key="i">
            <q-skeleton height="200px" square />
            <q-card-section>
              <q-skeleton type="text" />
              <q-skeleton type="text" />
            </q-card-section>
            <q-card-actions align="right" class="q-gutter-md">
              <q-skeleton type="QBtn" />
            </q-card-actions>
          </q-card>
        </div>
      </section>
    </div>

    <Pizza/>
    <q-dialog
      v-model="show_delivery_modal"
      transition-show="fade"
      transition-hide="fade">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center text-weight-bold">Уважаемые клиенты!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

          <div v-html="currentCity.modalText"></div>


        </q-card-section>

        <q-card-actions align="center">
          <q-btn  label="Понятно" color="primary" class="q-px-lg" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <q-dialog
      v-model="modal"
      transition-show="fade"
      transition-hide="fade">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center text-weight-bold">Уважаемые клиенты!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
<p>   Кафе по техническим причинам не работает. <br> Приносим извинения за доставленные неудобства.</p>

        </q-card-section>

        <q-card-actions align="center">
          <q-btn  label="Понятно" color="primary" class="q-px-lg" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

import ItemCard from "components/ItemCard";
import PizzaConstructor from "components/constructor";
import Pizza from "components/pizza";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  components:{
    ItemCard,
    PizzaConstructor,
    Pizza
  },
  data(){
    return{
      current_City : {},
      tab:0,
      fullHeight: false,

      modal: false,
      show_delivery_modal: false,
      selectedCategory:1,

      anim:null,
      sliderHomeTopOption: {
        slidesPerView: 2,
        spaceBetween: 10,
        loop:true,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
        ,autoplay: {
          delay: 3000,
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 10,
            loop:true,
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
            loop:true,
            centeredSlides: true,
          },
          // when window width is >= 640px

        }
      },
    }
  },
  async created() {
    // const response = await this.$api.get(`/api/items/get_banners?city_id=${this.$q.cookies.get('city_id')}`)
    // this.banners = response.data

  },
  beforeMount() {
    this.current_City = this.currentCity
    let time = new Date().toLocaleTimeString()
    //this.show_delivery_modal = true
    console.log(this.current_City.id)
    this.current_City.id===2 ? this.modal = true : null
    this.show_delivery_modal = time > '22:30:00' || time < '10:00:00'

  },
  updated(){
    if (this.$router.currentRoute.hash){
      //console.log(this.$router.currentRoute.hash)
      this.$scrollTo(this.$router.currentRoute.hash, 200, {offset: -90})
    }
  },
  methods: {
    ...mapActions('componentState',['changeConstructorVisible']),
    homeTopSliderPrev(){
      this.homeTopSlider.slidePrev()
    },
    homeTopSliderNext(){
      this.homeTopSlider.slideNext()
    },

  },
  computed:{
    ...mapGetters('products',['categories']),
    ...mapGetters('componentState',['selected_category']),
    ...mapGetters('city',['banners','currentCity']),
    homeTopSlider() {
      return this.$refs.homeTopSlider.$swiper
    },

  }
}
</script>
<style lang="sass">

.swiper-pagination-bullets
  bottom: 20px !important

.swiper-pagination-bullet
  width: 10px !important
  height: 10px !important
  background: $primary !important
.swiper-pagination-bullet-active
  background: $primary !important
.swiper-slide
  user-select: none

.home-page
  &-slider
    position: relative
    margin-bottom: 70px
    &__overlay
      position: absolute
      top: 0
      bottom: 5px
      width: 25%
      z-index: 10
      svg
        opacity: 0
        pointer-events: none
        fill: $primary
      &:hover
        svg
          position: absolute
          top: 50%
          opacity: 1
          pointer-events: all
          cursor: pointer
          transition: all .2s linear

      &.overlay-left
        background-image: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)
        left: 0
        svg
          transform: rotate(180deg) translateY(50%)
          right: 40px
        &:hover
          svg
            right: 50px

      &.overlay-right
        right: 0
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)
        svg
          transform: translateY(-50%)
          left: 40px
        &:hover
          svg
            left: 50px
  &-category
    margin-bottom: 130px
    &__title
      font-family: 'Raleway',sans-serif
      font-weight: 900
      font-size: 40px
      margin-bottom: 55px
    &__items
      display: grid
      grid-template-columns: repeat(auto-fill,minmax(290px,1fr))
      grid-column-gap: 30px
      grid-row-gap: 30px

@media (max-width: 768px)
  .home-page
    &-category
      margin-bottom: 15px
      &__title
        margin-bottom: 10px
        font-size: 23px
      &__items
        display: block
    &-slider
      margin-bottom: 60px
      &__overlay
        &.overlay-left
          background-image: unset
        &.overlay-right
          background-image: unset
//&__item
//  img
//    width: 240px
//    height: 125px
//    object-fit: cover


.menu-tabs
  & .q-tab
    &__content
      min-width: 80px
    &--active
      background: $primary
      border-radius: 4px

.fadeR-enter-active,
.fadeR-leave-active
  transition-property: all
  transition-duration: 200ms
  transform: translateX(0%)

.fadeR-enter,
.fadeR-leave-to
  transform: translateX(100%)

.fadeL-enter-active,
.fadeL-leave-active
  transition-property: all
  transition-duration: 200ms
  transform: translateX(0%)

.fadeL-enter,
.fadeL-leave-to
  transform: translateX(-100%)

</style>
