<template>

  <q-card  class="q-mb-sm q-mx-sm no-padding item-card" :flat="$q.screen.lt.sm" >
    <q-card-section :horizontal="$q.screen.lt.sm" class="q-mb-sm no-padding" style="position: relative">
      <!--      <img  :src="item.image" class="col-5 no-border-radius" style="object-fit: contain;position: relative;z-index: 0">-->
      <q-img
        :contain="item.is_pizza"
        :cover="!item.is_pizza"
        :ratio="1"
        class="col-lg-5 col-md-5 col-sm-5 col-xs-4 item-card__image"
        :src="item.image"/>

      <q-card-section class="q-pa-lg-md q-pa-md-md q-py-sm-none q-px-sm-sm q-py-xs-none q-px-xs-sm col-lg-7 col-md-7 col-sm-7 col-xs-8">

        <div class="row items-center">
           <p class="col-lg-10 col-md-10 col-sm-10 col-xs-10 text-subtitle1 lh-100 text-bold ">{{item.name}}</p>
          <q-icon v-if="item.kbgu" class="cursor-pointer col-lg-1 col-md-1 col-sm-1 col-xs-1 offset-1 q-mb-md" color="grey-4" flat size="sm" round name="info" >
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
          <p class="text-center no-margin">
            К/Б/Ж/У<br>
            {{item.kbgu}}
          </p>

        </q-tooltip>
      </q-icon>
        </div>

        <p class="text-caption text-grey q-mb-sm ingridient-items">
          {{item.base_ingridients}}
        </p>
        <div class="row justify-between items-center">
          <p v-if="!item.is_pizza && item.weight>0 " class="col-lg-6 col-md-6 col-sm-6 col-xs-6   text-bold no-margin">Вес {{item.weight}} г</p>
          <p v-else class="text-bold no-margin col-lg-6 col-md-6 col-sm-6 col-xs-6 "></p>

          <div v-if="!item.is_pizza" class="col-lg-6 col-md-6 col-sm-6 col-xs-6 units-add flex justify-between items-center  q-mb-sm ">
            <q-btn @click="minusUnit" outline round size="xs" color="primary"  icon="remove" />
            <p class="q-ma-none bg-grey-1 q-pa-sm">{{total_units}} {{unit_name}}</p>
            <q-btn @click="plusUnit" outline round size="xs" color="primary" icon="add" />
          </div>

        </div>
        <div class="row justify-between items-center">
          <div class="">
            <p class="no-margin"><span style="text-decoration: line-through;color: #7A7878; font-weight: normal" v-if="item.prices.find(x => x.city === this.$q.cookies.get('city_id')).old_price>0">{{item.prices.find(x => x.city === this.$q.cookies.get('city_id')).old_price}}р <br></span></p>
           <p v-if="item.is_pizza" class="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-bold no-margin ">от {{item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price}} р</p>
           <p v-else class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-bold no-margin ">{{item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price}} р</p>

          </div>
       <q-btn  v-if="item.is_pizza" unelevated
               color="primary"
               class="in-cart-btn col-lg-8 col-md-8 col-sm-8 col-xs-8"
               @click="openPizza(item.id)"

               label="В корзину" />
<!--           :label="`от ${item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price} р` " -->
        <q-btn v-else unelevated

               class="in-cart-btn col-lg-9 col-md-9 col-sm-9 col-xs-9"
               :loading="is_loading"
               @click="addToCart(item)"

               color="primary"
               :label="`В корзину ${item.is_meat ?
                item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price * units
                :
                item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price * units} р` " >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />

          </template>
        </q-btn>
        </div>







      </q-card-section>
    </q-card-section>

  </q-card>



</template>

<script>
import { mapActions } from 'vuex'
export default {
  props:['item'],
  data () {
    return {
      base_price:0,
      min_unit:this.item.min_unit,
      unit_name:this.item.unit_name,
      units:1,
      is_loading:false
    };
  },
  methods:{
    ...mapActions('cart',['fetchCart']),
    ...mapActions('componentState',['changePizzaChooseVisible']),
    ...mapActions('products',['changeOpenedPizza']),
    plusUnit (){
      this.units += 1
    },
    minusUnit (){
      this.units > 1 ? this.units -= 1 : this.units = 1
    },
    openPizza(id){
      this.changeOpenedPizza(id)
      this.changePizzaChooseVisible(true)
    },
    async addToCart (item) {
      this.is_loading = true
      await this.$api.post(`/api/cart/add_to_cart`,
        {
          session_id:this.$q.cookies.get('session_id'),
          item:item,
          selected_size:0,
          weight:0,
          units:this.units,
          city_id:this.$q.cookies.get('city_id'),
          is_meat: item.is_meat
        })
      await this.fetchCart()
      this.$q.notify({
        position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
        message: 'Добавлено в корзину',
        caption: item.name,
        color: 'positive'
      })
      this.is_loading = false
      this.$analytics.fbq.event('AddToCart',{
        value: this.item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price,
        currency: 'RUB',
        contents: [
          {
            id: this.item.id,
            quantity: 1
          }
        ],
        content_ids: this.item.id,
      });
    },
  },
  computed:{
    total_units(){
      return this.min_unit * this.units
    }
  }
}
</script>
<style lang="sass">
.item-card
  box-shadow: 0 48px 84px rgba(0,0,0,.04)
  transition: all .2s linear
  border: 1px solid #fff
  &:hover
    box-shadow: none
    border: 1px solid #e5e5e5
  &__image
    border-top-left-radius: 4px
    border-top-right-radius: 4px
.in-cart-btn
  min-width: 120px
.ingredient
  &::after
    content: ','
    margin-right: 3px
  &:last-child
    &::after
      content: none
      margin-right: 0
.units-add
  flex-basis: 50%
@media (max-width: 768px)
  .item-card
    &:hover
      border: 1px solid #fff
  .in-cart-btn
    min-width: unset
  .units-add
    flex-basis: unset
</style>
