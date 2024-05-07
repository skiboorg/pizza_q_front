<template>

  <q-page class="q-pa-sm q-mb-lg">


    <div v-if="cart_total_price>0" class="container">
      <h3 class="f-raleway-900">Оформление заказа</h3>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
          <p  class="q-mb-sm text-bold text-h6 q-mb-lg-lg q-mb-md">Тип доставки : {{orderData.delivery_type}}</p>
<!--             v-if="current_City.id===1"-->
          <q-btn-toggle
            unelevated
            no-caps

            v-model="orderData.delivery_type"

            :spread="$q.screen.lt.md"

            class="q-mb-lg "
            :options="[
                {label: 'Курьером', value: 'Курьером',color:'grey-5',toggleColor:'negative'},
                {label: 'Самовывоз', value: 'Самовывоз',color:'grey-5',toggleColor:'negative'},
            ]"
          />
          <p class="text-primary text-bold">Уважаемые клиенты! Пожалуйста, вводите свой номер телефона корректно, без 8-ки или +7, система автоматически подставит +7 в начале, как только начнете вводить цифры.</p>

          <div  class="checkout-form">

            <q-form ref="orderForm" @submit="placeOrder" class="q-gutter-sd q-mb-lg">
              <q-input outlined v-model="orderData.name" dense label="Ваше имя *" :rules="[val => !!val || 'Это обязательное поле']"/>
              <p class="text-bold text-primary text-h6">Пожалуйста, введите корректный номер, без 8-ки или +7</p>
              <q-input pattern="[0-9]*" outlined v-model="orderData.phone" dense label="Телефон *" mask="+7 (###) ###-##-##" lazy-rules
                       :rules="[val => !!val  || 'Это обязательное поле', val => val.length > 17 || 'Телефон введен не полностью']"/>
               <q-input pattern="[0-9]*" outlined v-model="orderData.phone_raw" dense label="Повторите телефон *"
                       :rules="[val => !!val  || 'Это обязательное поле']"/>
<!--              <q-checkbox class="q-mb-md" dense v-model="orderData.need_callback" label="Перезвоните мне для уточнения деталей заказа" />-->
              <div v-if="orderData.delivery_type==='Курьером'">
                <div v-if="$user.loggedIn &&  user_addresses.length>0" class="q-mb-sm">
                  <q-select dense outlined v-model="selectedAddress" :options="user_addresses" label="Выберите адрес доставки" />
                  <p class="q-mb-sm">или укажите другой</p>
                </div>
              </div>

              <div v-if="orderData.delivery_type==='Курьером'" class="flex  no-wrap">
                <q-input class="full-width " outlined v-model="orderData.street" dense label="Улица *" :rules="[val => !!val || 'Это обязательное поле']"/>
                <q-input  outlined class="q-ml-sm" v-model="orderData.house"  dense label="Дом *" :rules="[val => !!val || 'Это обязательное поле']"/>
              </div>
              <div v-if="orderData.delivery_type==='Курьером'" class="flex justify-between no-wrap q-mb-md">
                <q-input class=" q-mr-sm" outlined v-model="orderData.flat" type="number" dense label="Кв " />
                <q-input class=" q-mr-sm" outlined v-model="orderData.podezd" type="number" dense label="Подъезд " />
                <q-input class=" q-mr-sm"  outlined v-model="orderData.code" type="number" dense label="Код двери " />
                <q-input  outlined v-model="orderData.floor" dense type="number" label="Этаж " />
              </div>
            </q-form>

          </div>
          <div v-show="orderData.delivery_type!=='Курьером'" class="">
            <p class="text-bold text-h6">Адрес кафе</p>
            <div class="q-mb-sm " v-for="address in currentCity.adresses" :key="address.id">
              <q-radio dense   v-model="orderData.cafe_address"  :val="address" :label="address.address" />
            </div>
            <p class="text-bold text-primary">Вы делаете заказ по городу {{current_City.name}}. Пожалуйста, перед отправкой заказа убедитесь, что вам нужен именно этот город.</p>
            <!--      <div ref="map" style="height: 300px" class="q-mb-sm">-->

            <!--        <yandex-map-->
            <!--          :coords="coordinates"-->
            <!--          :class="'ymapContanerHidden'"-->
            <!--          zoom="14"-->
            <!--          style="width: 100%; height: 100%; padding: 0"-->
            <!--          :cluster-options="{ 1: {clusterDisableClickZoom: true} }"-->
            <!--          :controls="['trafficControl']"-->
            <!--          map-type="map">-->
            <!--          <ymap-marker-->
            <!--            markerId="1"-->
            <!--            marker-type="Placemark"-->
            <!--            :coords="coordinates">-->
            <!--          </ymap-marker>-->
            <!--        </yandex-map>-->
          </div>
          <!--    </div>-->
          <q-input
            class="q-mb-md"
            v-model="orderData.comment"
            label="Комментарий к заказу"
            outlined
            type="textarea"
          />
          <p class="text-bold text-h6">{{orderData.delivery_type === 'Курьером' ? 'Во сколько доставить?' : 'Во сколько заберете?'}}</p>

          <div class="flex justify-between no-wrap q-mb-none">
            <p>{{new Date(orderData.date).toLocaleDateString()}}</p>
            <q-input  dense v-show="orderData.delivery_type === 'Курьером1'" disable style="flex-basis: 49%" mask="date" outlined v-model="orderData.date"  label="Дата" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="orderData.date" :options="dateFn"  >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Выбрать дату" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-select dense style="flex-basis: 49%" outlined v-model="orderData.time" :options="delivery_time" label="Время" />
          </div>
<!--          <p class="text-bold text-primary text-h6">{{orderData.delivery_type==='Курьером' ? 'Доставка в районе 60 минут' : 'Заказ можно будет забрать примерно через 40 минут'}}</p>-->
         <p class="text-bold text-primary text-body1">{{orderData.delivery_type==='Курьером' ? 'В будни время доставки: в течении 1 ч, в выходные и праздничные дни - время доставки увеличено до 1 ч 40 мин' : 'Заказ можно будет забрать течении 1 часа'}}</p>
          <p class="text-bold text-h6">Оплата</p>
          <div class="flex column items-start q-mb-lg">
<!--            <q-radio  class="q-mb-sm" dense  v-model="orderData.payment" val="cash" label="Наличными при получении" />-->
<!--            <div v-if="orderData.payment==='cash'" class="flex items-center">-->
<!--              <p style="flex-basis: 40%">С какой суммы подготовить сдачу?</p>-->
<!--              <q-input  type="number" class="q-mr-sm" style="flex-basis: 20%" dense  outlined v-model="orderData.cashback" ></q-input>-->
<!--              <q-checkbox left-label v-model="orderData.no_cashback">Без сдачи</q-checkbox>-->
<!--            </div>-->
            <q-radio v-if="orderData.delivery_type==='Курьером'" class="q-mb-sm" dense  v-model="orderData.payment" val="online" label="Онлайн" />
            <q-radio v-if="orderData.delivery_type==='Курьером'" dense  v-model="orderData.payment" val="courier_card" label="Картой курьеру" />
            <q-radio v-if="orderData.delivery_type==='Самовывоз'" dense  v-model="orderData.payment" val="cash" label="Картой при получении" />
         </div>
          <q-btn no-caps unelevated v-if="orderData.delivery_type==='Курьером'" color="primary" @click="createOrder" class="text-bold q-mb-lg" size="md"
                 :label="`Подтвердить заказ на ${cart_total_price  + delivery_price} р ${is_apply_promo ? '(С учетом акции и доставки)' : '(С учетом доставки)'}` "/>

          <q-btn no-caps unelevated v-else color="primary" @click="createOrder" class="text-bold q-mb-lg" size="md"
                 :label="`Подтвердить заказ на ${cart_total_price} р ${is_apply_promo ? '(С учетом акции)' : ''}` "/>
             <div v-if="delivery_price>0" class="lt-sm"><p class="text-caption text-primary">Минимальная стоимость доставки {{currentCity.delivery_price}} руб (в радиусе 3 км от кафе). Точную стоимость доставки можно узнать у оператора.</p></div>
          <p class="text-caption text-grey-6">Нажимая на кнопку, вы даете согласие на обработку персональных данных</p>
<!--          <p class="text-bold text-negative">График работы кафе в праздники:<br><br>-->

<!--31 декабря 2021 года кафе работают с 10.00 до 19.00<br>-->

<!--01.01.2022 г - работает только кафе по адресу: Железнодорожников, 12, его время работы: с 15.00 до 22.00<br><br>-->

<!--Со второго января все кафе работают в обычном режиме, с 10.00 до 22.00</p>-->
          <Payment/>
        </div><!--        col-6-->
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 gt-xs offset-lg-1 offset-md-1 offset-sm-1">
          <q-card flat bordered>
            <q-card-section class="flex items-center justify-between">
              <p class="no-margin text-grey-6">Изменить состав корзины</p>
              <q-btn to="/cart" flat dense icon="edit" color="grey-6" round/>
            </q-card-section>
            <q-card-section>
              <q-card flat v-for="constructor in items_in_cart.pizza_constructors"
                      :key="constructor.id">
                <q-card-section horizontal :class="[headerCart ? 'q-mb-sm' : 'q-mb-md']">
                  <q-img
                    :ratio="16/9"
                    :style="{'height':  headerCart ? '90px' : 'auto'}"
                    contain
                    class="col-2 no-border-radius"
                    :src="constructor.items[0].image"
                  /> <q-img
                  :ratio="16/9"
                  :style="{'height':  headerCart ? '90px' : 'auto'}"
                  contain
                  class="col-2 no-border-radius"
                  :src="constructor.items[1].image"
                />
                  <q-card-section class=" col-5 q-py-none q-pl-sm q-pr-none  "
                                  :class="[!headerCart ? 'flex justify-between' : '']">

                    <p v-if="headerCart" class="no-margin text-caption text-bold">Пицца из половинок</p>
                    <p v-else class="no-margin text-h6 text-bold">Пицца из половинок</p>
                    <p :class="[headerCart ? 'text-caption' : 'text-body1 text-primary text-bold']">{{constructor.items[0].name}} + {{constructor.items[1].name}} {{constructor.quantity}} шт </p>

                  </q-card-section>
                  <q-card-section class="no-padding col-3 flex column justify-between items-end" >
                    <!--          <q-btn  @click="changeQuantity('delete_cart_constructor',constructor.code)" flat round dense icon="delete_outline" class="q-mr-sm"/>-->
                    <div class="">
                      <p v-if="$user.loggedIn" class="no-margin text-caption ">+{{constructor.bonuses}} бал.</p>
                      <p class="no-margin text-body1 text-bold">{{constructor.price}} р</p>
                    </div>

                  </q-card-section>
                </q-card-section>
                <q-separator spaced/>
                <q-inner-loading :showing="current_id===constructor.id">
                  <q-spinner-tail size="50px" color="primary" />
                </q-inner-loading>
              </q-card>
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
                  </q-card-section>
                  <q-card-section class="no-padding col-3 flex column justify-between items-end" >
                    <!--          <q-btn v-if="!item.item.is_gift || headerCart" @click="changeQuantity('delete_item',item.code)" flat outline round dense icon="delete_outline" class="q-mr-sm"/>-->
                    <div class="">
                      <p v-if="$user.loggedIn && !item.item.is_gift" class="no-margin text-caption ">+{{item.bonuses}} бал.</p>
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

                  </q-card-section>
                  <q-card-section class="no-padding col-3 flex column justify-between items-end" >
                    <!--          <q-btn @click="changeQuantity('delete_cart_souse',souce.code, souce.id)" flat round dense icon="delete_outline" class="q-mr-sm"/>-->
                    <div class="">
                      <p v-if="$user.loggedIn" class="no-margin text-caption ">+{{souce.bonuses}} бал.</p>
                      <p class="no-margin text-caption text-bold">{{souce.price}} р</p>
                    </div>

                  </q-card-section>
                </q-card-section>
                <q-separator spaced/>
                <q-inner-loading :showing="current_id===souce.id">
                  <q-spinner-tail size="50px" color="primary" />
                </q-inner-loading>
              </q-card>
            </q-card-section>
            <q-card-section>
              <p class="text-bold text-body1">Кол-во персон: {{items_in_cart.persons}}</p>
              <div class="flex items-center justify-between">
                <p class="text-bold text-body1 no-margin">Сумма заказа:</p>
                <p class="text-bold text-body1 no-margin">{{items_in_cart.total_price}} р</p>
              </div>

              <div v-if="cart_bonuses>0" class="flex items-center justify-between">
                <p class="text-bold text-body1 no-margin">Баллы:</p>
                <p class="text-bold text-body1 no-margin">- {{cart_bonuses}} р</p>
              </div>
              <div v-if="cart_promo>0" class="flex items-center justify-between">
                <p class="text-bold text-body1 no-margin">Промокод:</p>
                <p class="text-bold text-body1 no-margin">- {{cart_promo}} %</p>
              </div>
              <div v-if="delivery_price>0" class="flex items-center justify-between">
                <p class="text-bold text-body1 no-margin">Доставка:</p>
                <p class="text-bold text-body1 no-margin">+ {{delivery_price}} р</p>
              </div>
              <div v-if="delivery_price>0" class=""><p class="text-caption text-primary">Минимальная стоимость доставки {{currentCity.delivery_price}} руб (в радиусе 3 км от кафе).<br>Точную стоимость доставки можно узнать у оператора.</p></div>
              <div  class="flex items-center justify-between">
                <p class="text-bold text-h6 text-primary no-margin">Итого:</p>
                <p class="text-bold text-h6 text-primary no-margin"><span class="q-mb-none text-caption text-primary  " v-if="is_apply_promo">(С учетом акции)</span>{{cart_total_price + delivery_price}} р</p>
              </div>
            </q-card-section>
          </q-card>
        </div><!--        col-6-->
      </div><!--        row -->
    </div>
     <q-page v-else class="flex items-center justify-center column">
    <div class="container-sm text-center">
       <img src="~assets/empty-cart.svg" >
    <p class="text-h6">Корзина пуста</p>
      <q-btn color="primary" @click="$router.push('/')" label="открыть меню"/>
    </div>

  </q-page>
  </q-page>

</template>

<script>
import {  mapActions, mapGetters} from "vuex";
import { date } from 'quasar'
import Payment from "components/payment";

export default {
  components:{
    Payment
  },
  data() {
    return {
      current_City : {},
      myMap: null,
      current_id:null,
      headerCart:true,
      myGeoObject: null,
      currentMark:null,
      orderPlaced:false,
      orderCode:null,
      delivery_type:1,
      adresses:[],
      selectedAddress:null,
      delivery_time: [
        '11:00', '11:30','12:00', '12:30', '13:00', '13:30','14:00', '14:30','15:00', '15:30', '16:00','16:30','17:00',
        '17:30','18:00', '18:30', '19:00', '19:30','20:00', '20:30','21:00', '21:30', '22:00', '22:30'],
      orderData:{
        pizzaSize:22,
        delivery_type: 'Самовывоз',
        cafe_address:null,
        payment: 'cash',
        need_callback:false,
        no_cashback:true,
        comment:null,
        cashback:0,
        name: this.$user.loggedIn ? this.$user.user.fio : '',
        phone: this.$user.loggedIn ? this.$user.user.phone : '',
        phone_raw: this.$user.loggedIn ? this.$user.user.phone : '',
        street:null,
        house:null,
        flat:null,
        podezd:null,
        code:null,
        floor:null,
        date: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        time:'11:00',
      },

      dateOptions: {
        disabledDate(time) {
          return (time.getTime() + 3600 * 1000 * 24) < Date.now();
        }

      },
    };
  },
  watch:{


    selectedAddress(val){
      //console.log(val)
      this.orderData.street = val.street
      this.orderData.house = val.house
      this.orderData.flat = val.flat
      this.orderData.podezd = val.podezd
      this.orderData.code = val.code
      this.orderData.floor = val.floor
    },
    'orderData.delivery_type'(val){

      if (val === 'Самовывоз'){
        this.orderData.payment = 'cash'

      } else{
        this.orderData.payment = 'courier_card'
      }

      //this.currentMark = new ymaps.Placemark(this.coordinates);
      //this.myMap.geoObjects.add(this.currentMark)
    }
  },
  async beforeMount() {
    console.log('before')
    await this.fetchCity()
    this.orderData.cafe_address = this.currentCity?.adresses[0]
  },
  mounted() {
    this.current_City = this.currentCity
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let is_not_half_hour = minute < 30
    // for (let i = hour; i < 23; i++) {
    //   this.delivery_time = []
    //   this.delivery_time.push(`${i}:00`)
    //   if (is_not_half_hour)
    //     this.delivery_time.push(`${i}:30`)
    // }
    this.orderData.time= `${is_not_half_hour ? hour : hour+1}:${is_not_half_hour ? '30' : '00'}`
  },

  computed:{
    ...mapGetters('cart',['cart_items_count','items_in_cart','cart_bonuses','cart_promo','cart_total_price','is_apply_promo']),
    ...mapGetters('city',['cities','currentCity']),
    cityID(){
      return this.currentCity.id

    },
    delivery_price(){
      return  this.orderData.delivery_type==='Курьером' ? this.currentCity?.delivery_price : 0
    },
    coordinates () {
      return this.currentCity.adresses.find(x => x.address === this.orderData.cafe_address).coordinates.split(',')
    },
    user_addresses(){
      if (this.$user.loggedIn){
        let addr = []
        for (let i of this.$user.user.addresses){
          addr.push({
            id:i.id,
            label:i.street,
            value:i.id,
            street:i.street,
            house:i.house,
            flat:i.flat,
            podezd:i.podezd,
            code:i.code,
            floor:i.floor,
          })
        }
        return addr
      }
    }
  },
  methods:{
    ...mapActions('cart',['fetchCart']),
    ...mapActions('city',['fetchCity']),
    ... mapActions('auth',['getUser']),
    ...mapActions('componentState',['changePaymentVisible','changePaymentUrl']),
    map_init() {
      //console.log(this.$refs)
      this.myMap = new ymaps.Map(this.$refs.map, {
        center: [55.76, 37.64], // Москва
        zoom: 10
      }, {
        searchControlProvider: 'yandex#search'
      })
    },
    dateFn (date) {
      return date >= new Date().toISOString().split('T')[0].replace('-','/').replace('-','/')
    },
    async placeOrder(){
      //console.log('new order')
      this.$q.loading.show()
      const response = await this.$api.post('/api/order/new_order',
        {
          session_id:this.$q.cookies.get('session_id'),
          city_id:this.$q.cookies.get('city_id'),
          data:this.orderData,
          bonuses:this.cart_bonuses,
          promo:this.cart_promo,
          source:'site'
        })

      //  this.$analytics.fbq.event('Purchase', {
      //   value: this.items_in_cart.total_price - this.cart_bonuses - this.cart_promo + this.delivery_price,
      //   currency: 'RUB'
      // })
      let items =[]
      for (let i of this.items_in_cart.items){
        let item = {
          "id": i.id,
                    "name": i.item.name,
                    "price": i.price,
                    "category": i.item.category.name,

                    "quantity": i.quantity
            }
              items.push(item)
            }
      await this.fetchCart()
      ym(86828132,'reachGoal','lead')
      if (response.data.formUrl){
        //console.log('redirect ',response.data.formUrl)
        // this.changePaymentUrl(response.data.formUrl)
        // this.changePaymentVisible(true)
        window.location.href = response.data.formUrl
      }else{
        this.orderCode = response.data.code
        this.$q.loading.hide()
        this.orderPlaced = true
        this.$user.loggedIn ?  await  this.getUser(false) : null
        this.$router.push(`/order_self/${this.orderCode}`)
      }


    },
    createOrder(){
      this.$refs.orderForm.submit()
    }
  }
}
</script>
<style lang="sass">
.q-field__bottom--animated
  bottom: 4px
</style>
