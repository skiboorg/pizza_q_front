<template>

  <div v-if="cart_items_count>0" class="q-pa-sm">



    <q-card flat v-for="item in items_in_cart.items"
            :key="item.id">
      <q-card-section horizontal :class="[headerCart ? 'q-mb-sm' : 'q-mb-md']">
        <q-img
          :ratio="16/9"
          contain
          :style="{'height':  headerCart ? '90px' : 'auto'}"
          class="col-4 no-border-radius"
          :src="item.item.image"
        />
        <q-card-section class=" col-5 q-py-none q-pl-sm q-pr-none  "
                        :class="[!headerCart ? 'flex column justify-between' : '']">
          <p v-if="headerCart" class="no-margin text-caption text-bold" :class="[item.item.is_gift ? 'text-primary': '']">{{item.item.name}}</p>
          <p v-else class="no-margin text-h6 text-bold" :class="[item.item.is_gift ? 'text-primary': '']">{{item.item.name}}</p>

          <p v-if="item.selected_size > 0 " class="no-margin "
             :class="[headerCart ? 'text-caption' : 'text-body1 text-primary text-bold']">
            {{item.quantity * item.item.min_unit}} {{item.item.unit_name}} {{item.selected_size===22 ? '28' : '33'}} см
          </p>
          <p v-else class="no-margin"
             :class="[headerCart ? 'text-caption' : 'text-body1 text-primary text-bold']">
            {{item.quantity * item.item.min_unit}} {{item.item.unit_name}}
          </p>

          <div v-if="!item.item.is_gift"
               class="units-add flex justify-lg-start justify-md-start justify-sm-between justify-xs-between items-end">
            <q-btn @click="changeQuantity('remove_item_quantity',item.code,item.id)"
                   outline round size="xs"
                   color="primary"
                   icon="remove" />
            <p class="item-quantity q-ma-none bg-grey-1 q-pa-sm q-mx-lg-sm q-mx-md-sm q-mx-sm-none q-mx-xs-none">{{item.item.min_unit}} {{item.item.unit_name}}</p>
            <q-btn @click="changeQuantity('add_item_quantity',item.code,item.id)"
                   outline round size="xs"
                   color="primary"
                   icon="add" />
          </div>

        </q-card-section>
        <q-card-section class="no-padding col-3 flex column justify-between items-end" >
<!--          <q-btn v-if="!item.item.is_gift || headerCart" @click="changeQuantity('delete_item',item.code)" flat outline round dense icon="delete_outline" class="q-mr-sm"/>-->
          <q-icon v-if="!item.item.is_gift" @click="changeQuantity('delete_item',item.code,item.id)" class="cursor-pointer inline-block " size="25px" name="delete_outline"/>
          <div v-else class=""></div>
          <div class="">
            <q-no-ssr>
              <p v-if="$user.loggedIn && !item.item.is_gift" class="no-margin text-caption ">+{{item.bonuses}} бал.</p>
            </q-no-ssr>
            <p class="no-margin text-body1 text-bold">{{item.price}} р</p>
          </div>

        </q-card-section>
      </q-card-section>
      <q-separator spaced />
      <q-inner-loading :showing="current_id===item.id">
        <q-spinner-tail size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
    <q-card flat v-for="souce in items_in_cart.souces"
            :key="souce.id">
      <q-card-section horizontal :class="[headerCart ? 'q-mb-sm' : 'q-mb-md']">
        <q-img
          :ratio="16/9"
          contain
          :style="{'height':  headerCart ? '90px' : 'auto'}"
          class="col-4 no-border-radius"
          :src="souce.item.image"
        />
        <q-card-section class=" col-5 q-py-none q-pl-sm q-pr-none  "
                        :class="[!headerCart ? 'flex column justify-between' : '']">
          <p v-if="headerCart" class="no-margin text-caption text-bold">{{souce.item.name}}</p>
          <p v-else class="no-margin text-h6 text-bold">{{souce.item.name}}</p>

          <p class="no-margin " :class="[headerCart ? 'text-caption' : 'text-body1 text-primary text-bold']" >{{souce.quantity}} шт</p>

          <div  class="units-add flex justify-lg-start justify-md-start justify-sm-between justify-xs-between items-end">
            <q-btn @click="changeQuantity('remove_souse_quantity',souce.code, souce.id)"
                   outline round size="xs"
                   color="primary"
                   icon="remove" />
            <p class="q-ma-none bg-grey-1 q-pa-sm q-mx-lg-sm q-mx-md-sm q-mx-sm-none q-mx-xs-none">1 шт</p>
            <q-btn @click="changeQuantity('add_souse_quantity',souce.code , souce.id)"
                   outline round size="xs"
                   color="primary"
                   icon="add" />
          </div>

        </q-card-section>
        <q-card-section class="no-padding col-3 flex column justify-between items-end" >
<!--          <q-btn @click="changeQuantity('delete_cart_souse',souce.code, souce.id)" flat round dense icon="delete_outline" class="q-mr-sm"/>-->
           <q-icon @click="changeQuantity('delete_cart_souse',souce.code,souce.id)" class="cursor-pointer inline-block " size="25px" name="delete_outline"/>
          <div class="">
            <q-no-ssr>
            <p v-if="$user.loggedIn" class="no-margin text-caption ">+{{souce.bonuses}} бал.</p>
            </q-no-ssr>
            <p class="no-margin text-caption text-bold">{{souce.price}} р</p>
          </div>

        </q-card-section>
      </q-card-section>
      <q-separator spaced/>
      <q-inner-loading :showing="current_id===souce.id">
        <q-spinner-tail size="50px" color="primary" />
      </q-inner-loading>
    </q-card>

    <div v-if="!headerCart" class="">
      <div v-if="is_meat_in_cart>0" class="">
        <p class="meat-warning">При оплате семги и баранины на сайте, просим обратить ваше внимание, что фактический вес готового блюда, при получении, может отличаться от стандартной граммовки на сайте, поэтому фактическая стоимость может меняться. Просим уточнять фактический вес этих блюд у операторов. </p>
        <p class="text-h6 text-bold">Рекомендуем к шашлыку</p>
          <div class="row q-gutter-lg-md q-gutter-md-md q-gutter-sm-md q-gutter-xs-none q-mb-md">
            <q-card class=" q-px-sm col-lg-3 col-md-3 col-sm-4 col-xs-12 q-mb-xs-sm cursor-pointer"   @click="addToCart(item)" v-for="item in recommended_items_for_meat" :key="item.id">
            <q-card-section horizontal>
              <q-img
                contain
                :ratio="4/3"
                class="col-5 no-border-radius"
                :src="item.image"
              />
              <q-card-section class="col-7 q-px-none q-py-sm q-ml-sm">
                <p class="no-margin text-bold text-caption">{{item.name}}</p>
                <p  class="no-margin text-caption">{{item.prices.find(x => x.city === $q.cookies.get('city_id')).price}}р</p>
              </q-card-section>


            </q-card-section>
          </q-card>
          </div>

      </div>
      <p v-if="souses.length>0" class="text-h6 text-bold">Cоусы</p>
      <q-no-ssr>
        <swiper v-if="souses.length>0"  class="cart-slider" :options="soucesSliderOption">
<!--          v-if="items_in_cart.souces.filter(x => x.item.id === souse.id).length===0"-->
          <swiper-slide  v-for="souse in souses" :key="souse.id">
            <q-card  class="cursor-pointer slider-card " @click="addSouseToCart(souse)" >

              <q-card-section horizontal class="no-padding">
                <q-img
                  contain
                  :ratio="1"
                  class="col-lg-4 col-md-4 col-sm-4 col-xs-5 no-border-radius"
                  :src="souse.image" />
                <q-card-section class="col-lg-8 col-md-8 col-sm-8 col-xs-7 q-px-none">
                  <p class="no-margin text-caption text-bold">{{souse.name}}</p>
                  <p  class="no-margin text-caption">{{souse.prices.find(x => x.city === $q.cookies.get('city_id')).price}}р</p>
                </q-card-section>
              </q-card-section>
            </q-card>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </q-no-ssr>
      <p  class="text-h6 text-bold">Рекомендуем к заказу</p>
      <q-no-ssr>
      <swiper   class="recommended-slider q-mb-lg" :options="soucesSliderOption">
        <swiper-slide v-if="item.prices.filter(x => x.city === $q.cookies.get('city_id')).length" class="recommended-item"  v-for="item in recommended_items" :key="item.id">
          <q-card  class="q-py-sm cursor-pointer" @click="addToCart(item)" >
            <q-card-section horizontal >
              <q-img
                  contain
                  :ratio="4/3"
                class="col-5 no-border-radius items-start"
                :src="item.image"
              />
              <q-card-section class="col-7  q-px-none ">
                <p class="no-margin text-caption text-bold">{{item.name}}</p>
                <p  class="no-margin text-caption">{{item.prices.find(x => x.city === $q.cookies.get('city_id')).price}}р</p>
              </q-card-section>
            </q-card-section>
          </q-card>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      </q-no-ssr>
      <q-no-ssr>
        <div  class="q-mb-none">
        <p v-if="$user.loggedIn" class="q-mb-none">Баллов будет начислено: {{items_in_cart.total_bonuses}} </p>
        <q-checkbox v-if="$user.loggedIn" size="sm" class="q-mb-sm" left-label  v-model="with_bonuses" :label="`Списать баллы (${$user.user.bonuses} баллов доступно)`" />

          <q-card-section v-if="!cart_promo" class="no-padding">
          <div class="row q-mb-lg">
            <q-input style="border: 2px solid #EF2121; border-radius: 6px" class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-mb-lg-none q-mb-md-none q-mb-sm-none q-mb-xs-md" outlined v-model="promoCode" label="Введите промокод" dense  />
          <q-btn class="col-lg-2 col-md-2 col-sm-2 col-xs-12 q-ml-lg-md q-ml-md-md q-ml-sm-md q-ml-xs-none" color="primary" :disable="!promoCode" @click="usePromo"  label="Применить"></q-btn>
          </div>
        </q-card-section>
      </div>
      </q-no-ssr>
    </div>

    <div v-if="!headerCart" class="">
      <q-separator spaced/>
      <div class="flex items-center q-mb-md">
        <p class="text-h6 text-bold q-mb-none q-mr-md">Количество персон  </p>
        <q-btn @click="updatePerson('del_person')"
                   outline round size="xs"
                   color="primary"
                   icon="remove" />
        <p class="q-mb-none text-h6 text-bold q-mx-sm">{{items_in_cart.persons}}</p>
        <q-btn @click="updatePerson('add_person')"
                   outline round size="xs"
                   color="primary"
                   icon="add" />

      </div>
<!--      <p class="text-h6 text-bold">Сумма заказа: {{items_in_cart.total_price - cart_promo - cart_bonuses}} р</p>-->

      <p class="text-h6 text-bold">Сумма заказа: {{cart_total_price}} р  <span class="q-mb-none text-body1 text-primary  " v-if="is_apply_promo">(Цена с учетом акции)</span></p>
      <div class="row">
        <q-btn outline to="/" class=" q-mt-lg col-lg-5 col-md-5 col-sm-5 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0" color="primary" label="Вернуться в меню"/>
      <q-btn  class="text-h5 text-bold q-mt-lg col-lg-5 col-md-5 col-sm-5 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0" color="primary"  size="md"
           @click="openCheckoutPage"
           label="Оформить заказ "/>
      </div>

    </div>


  </div>

  <div v-else class="flex items-center justify-center column text-center">
<q-no-ssr>
    <img src="~assets/empty-cart.svg" >
    <p class="text-h6 text-center">Вы сюда еще ничего не добавили</p>
</q-no-ssr>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props:['headerCart'],
  data () {
    return {
      current_id:null,
      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#EF2121',
        width: '2px',
        opacity: 0.5
      },
      contentStyle: {
        opacity: 0.8
      },
      contentActiveStyle: {
        opacity: 1
      },
      is_loading:false,
      promoCode:null,
      with_bonuses: this.cart_bonuses > 0,
      soucesSliderOption: {
        slidesPerView: 4,
        spaceBetween: 20,
        //centeredSlides: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          350: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 10,
          }
        }
      }
    }
  },
  computed:{
    ...mapGetters('cart',['cart_items_count','items_in_cart','cart_bonuses','cart_promo','is_meat_in_cart','cart_total_price','is_apply_promo']),
    ...mapGetters('products',['souses','recommended_items','recommended_items_for_meat']),

  },
  watch:{
    with_bonuses(val){
      if(val){
        this.addBonuses(this.$user.user.bonuses)
      }else
        this.addBonuses(0)
    }
  },
  methods:{
    ...mapActions('cart',['fetchCart','addBonuses','addPromo']),
    ...mapActions('auth',['getUser']),
    openCheckoutPage(){
      this.$analytics.fbq.event('Lead')
      this.$router.push('/checkout')

    },
    async updatePerson(type){
      await this.$api.post(`/api/cart/${type}`,
        {
          session_id:this.$q.cookies.get('session_id'),
        })
      await this.fetchCart()
    },
    async changeQuantity (type,code,id){
      console.log(type,code,id)
      this.current_id = id
      let data = {
        session_id:this.$q.cookies.get('session_id'),
        code:code
      }
      await this.$api.post(`/api/cart/${type}`,data)
      await this.fetchCart()
      this.current_id = null

    },
    async addSouseToCart (item) {
      await this.$api.post(`/api/cart/add_to_cart_souse`,
        {
          session_id:this.$q.cookies.get('session_id'),
          item_id:item.id,
          city_id:this.$q.cookies.get('city_id')
        })
      await this.fetchCart()

    },
    async addToCart (item) {
      await this.$api.post(`/api/cart/add_to_cart`,
        {
          session_id:this.$q.cookies.get('session_id'),
          item:item,
          selected_size:0,
          weight:0,
          units:1,
          city_id:this.$q.cookies.get('city_id'),
          is_meat: false
        })
      await this.fetchCart()

    },
    async usePromo (){

      const responce = await this.$api.post(`/api/user/use_promo`,
        {
          code:this.promoCode,
        })
      console.log()
      if (!responce.data.status){
        this.$q.notify({
          message: 'Промокод не найден',
          icon: 'announcement',
          color:'red'
        })

      }else {
        this.$q.notify({
          message: 'Промокод применен',
          icon: 'announcement',
          color:'positive'
        })
        if(this.$user.loggedIn){
          await this.getUser(false)
        }

        this.addPromo(responce.data.discount)
      }

    },

  }
}
</script>
<style lang="sass">
.item-quantity
  min-width: 50px
  text-align: center
  font-size: 13px
.slider-card
  min-height: 80px
.cart-slider
  height: 90px
.recommended-slider
  height: 120px
.recommended-item
  width: 300px !important
@media (max-width: 768px)
  .slider-card
    min-height: 94px
  .cart-slider
    height: 98px
  .meat-warning
    font-size: 12px

</style>
