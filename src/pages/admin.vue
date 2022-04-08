<template>
  <q-page padding>
    <div class="container">
      <p class="text-h5 text-bold">Заказы на {{new Date().toLocaleDateString()}}</p>

      <q-list  separator >
        <div :class="{'bg-grey-2':cur_order===index}" v-for="(order,index) in orders" :key="order.id">
          <q-item  >
            <q-item-section>
              <q-item-label class="text-bold" :class="{'text-red':order.is_new,'text-green':!order.is_new}"> {{order.is_new ? 'Новый' : 'Просмотрен' }}</q-item-label>
              <q-item-label caption>Статус</q-item-label>
            </q-item-section>
            <q-item-section style="    flex-basis: 175px;">
              <q-item-label> {{order.cafe_address}}</q-item-label>
              <q-item-label caption>Точка выдачи</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold"> {{order.order_code}}</q-item-label>
              <q-item-label caption>Номер заказа</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label > {{new Date(order.created_at).toLocaleTimeString() }}</q-item-label>
              <q-item-label caption>Создан</q-item-label>
            </q-item-section>
              <q-item-section>
              <q-item-label > {{order.delivery_type}}</q-item-label>
              <q-item-label caption>Тип доставки</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="">
                <span v-if="order.payment === 'cash'">Наличные</span>
                <span v-if="order.payment === 'online'">Онлайн</span>
                <span v-if="order.payment === 'courier_card'">Картой курьеру</span>
              </q-item-label>
              <q-item-label caption>Тип оплаты</q-item-label>
            </q-item-section>
            <q-item-section style="display: none">
              <q-item-label >
                <q-chip v-if="order.is_payed" dense color="green" text-color="white" icon="done">Оплачен</q-chip>
                <q-chip v-else dense color="red" text-color="white" icon="close">Не оплачен</q-chip>
              </q-item-label>
              <q-item-label caption>Статус оплаты</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class=""> {{ new Date(order.date).toLocaleDateString() }} / {{ order.time }}</q-item-label>
              <q-item-label caption>Дата/Время доставки</q-item-label>
            </q-item-section>
            <q-item-section style="display: none">
              <q-item-label >
                <div v-if="order.status">
                  <q-chip v-if="order.status.is_delivered" dense color="green" text-color="white" icon="done">{{order.status.status}}</q-chip>
                  <q-chip v-else-if="order.status.is_delivery_in_progress" dense color="warning" text-color="white" icon="directions_run">{{order.status.status}}</q-chip>
                  <q-chip v-else-if="order.status.is_assing" dense color="warning" text-color="white" icon="hail">{{order.status.status}}</q-chip>
                </div>
                <div v-else><q-chip dense color="red" text-color="white" icon="close">Не передан курьеру</q-chip></div>


              </q-item-label>
              <q-item-label caption>Статус доставки</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label >
                <q-item-label class="text-bold text-primary"> {{order.price}} руб</q-item-label>
              </q-item-label>
              <q-item-label caption>Сумма заказа</q-item-label>
            </q-item-section>


          </q-item>
          <q-item class="items-start">
            <q-item-section>
              <q-expansion-item
                group="somegroup"
                label="Информация о заказе"
                @click="openOrder(order.id,index)"
                header-class="bg-grey-2 text-dark">
                <q-card>
                 <q-card-section class="q-pa-md" horizontal>
                    <div class="col-8"><p class="text-bold q-mb-sm text-primary">Заказчик:</p>
                    <p class="text-caption q-mb-xs"><span class="text-bold">Телефон</span> {{order.phone}} <span v-if="order.need_callback" class="text-bold text-primary">НУЖНО ПЕРЕЗВОНИТЬ</span></p>

                    <p class="text-caption q-mb-xs"><span class="text-bold">ФИО</span> {{order.name}}</p>
                    <q-separator spaced="sm"/>

                    <p class="text-bold q-mb-sm text-primary">Заказ:</p>
                    <div class="text-caption" v-html="order.order_content"></div>
                    <q-separator spaced="sm"/>
                    <p class="text-bold q-mb-sm text-primary">Адрес:</p>
                    <p class="text-caption q-mb-xs"><span class="text-bold">Город</span> {{order.city.name}}</p>
                    <p v-if="order.street" class="text-caption q-mb-xs"><span class="text-bold">Улица</span> {{order.street}}</p>
                    <p v-if="order.house" class="text-caption q-mb-xs"><span class="text-bold">Дом</span> {{order.house}}</p>
                    <p v-if="order.flat" class="text-caption q-mb-xs"><span class="text-bold">Квартира</span> {{order.flat}}</p>
                    <p v-if="order.podezd" class="text-caption q-mb-xs"><span class="text-bold">Подъезд</span> {{order.podezd}}</p>
                    <p v-if="order.code" class="text-caption q-mb-xs"><span class="text-bold">Код домофона</span> {{order.code}}</p>
                    <p v-if="order.floor" class="text-caption q-mb-xs"><span class="text-bold">Этаж</span> {{order.floor}}</p>
                    <div v-if="order.comment">
                      <q-separator spaced="sm"/>
                    <p class="text-bold q-mb-sm text-primary">Комментарий:</p>
                    <p class="q-mb-none text-caption">{{order.comment}}</p>
                    </div></div>
                   <q-separator vertical></q-separator>
                    <div style="display: none" class="col-4  q-pl-md">
                      <div v-if="!order.status ">
                          <q-select dense class="q-mb-sm" filled v-model="courier" :options="couriers" label="Курьеры" />
                          <q-btn no-caps class="q-mb-lg " @click="assignOrder" :loading="is_loading" :disable="!courier" color="positive" label="Назначить заказ"/>
                      </div>
                      <div v-else>
                        <p class="q-mb-sm text-bold">Назначен курьеру</p>
                        <p class="">{{order.courier.label}}</p>

                      </div>
                     <div v-if="courier" class="">
                        <p class="q-mb-sm text-bold">Данные о курьере</p>
                        <p class="q-mb-sm">Телефон: {{courier.phone}}</p>
                        <p>Назначено заказов: {{courier.orders.length}}</p>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-item-section>

          </q-item>

          <q-separator/>
        </div>



      </q-list>
    </div>
  </q-page>

</template>
<script>


import {api} from "boot/axios";
import {mapGetters} from "vuex";

export default {
  preFetch ({ store, redirect }) {

    if (!store.state.auth.user.is_staff) {
      redirect({ path: '/' })
    }
  },
  data () {
    return {
      orders:[],
      couriers:[],
      cur_order:999,
      courier:null,
      intervalID:null,
      is_loading:false,
    }
  },
  async beforeMount() {

    await this.getOrders()
    // await this.getCouriers()
  },
   mounted() {

    this.intervalID = setInterval(async function(){
        await this.getOrders()
      this.checkOrders()
    }.bind(this), 5000);

   },
  destroyed() {
    clearInterval(this.intervalID)
  },
  methods:{
    checkOrders(){
      let audio = new Audio('m.mp3')

      for(let x of this.orders){
        if (x.is_new){
          audio.play()
          break
        }
      }

    },
    async openOrder(id,index){
      this.cur_order=index
        await api.get(`/api/order/set_order_view?id=${id}`)
        await this.getOrders()
    },
    async getOrders(){
      const resp = await api.get(`/api/order/get_orders?city_id=${this.currentCity.id}`)
      this.orders = resp.data
    },
    async getCouriers(){
      const resp = await api.get(`/api/courier/all?city_id=${this.currentCity.id}`)
      this.couriers = resp.data
    },
    async assignOrder(){
      this.is_loading = true
      await api.post(`/api/courier/assign_order`,{order_id:this.orders[this.cur_order].id,courier_id:this.courier.id})
      this.is_loading = false
      this.courier = null
      await this.getOrders()
      await this.getCouriers()
    }
  },
  computed:{
    ...mapGetters('city',['cities','currentCity']),

  },
}
</script>
