<template>
  <q-page padding>

      <div class="container-sm">
      <p class="text-bold text-h5">Ваш ID: {{$user.user.id}}</p>
      <p class="text-bold text-h5">Баллов начислено: {{$user.user.bonuses}}</p>
      <q-tabs
        v-model="tab"
        outlined
        inline-label
        class="text-grey"
        active-color="white"
        indicator-color="primary"
        align="justify"

        stretch
      >
        <q-tab no-caps name="person" icon="person"  label="Личные даные" />
        <q-tab no-caps name="location_on" icon="location_on" label="Адреса доставки" />
<!--        <q-tab name="password" icon="password" label="Сменить пароль" />-->
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="person">
          <p class="text-h6">Личные данные</p>
          <q-form class="q-gutter-sm q-mb-lg">
            <q-input   outlined v-model="userData.fio" label="ФИО" />
            <q-input  readonly outlined v-model="userData.phone" label="Телефон" />
            <p  v-if="!$user.user.tg_username">Введите Ваш telegram username, чтобы получать оповещения о заказах и восстанавливать пароль через телеграм бота.<br>
              Инструкция по подключению появится после того, как Вы укажете telegram username и нажмете кнопку сохранить.</p>
            <q-input :error="!$user.user.tg_username" outlined v-model="userData.tg_username" label="Ваш telegram username" />
          </q-form>

          <div v-if="$user.user.tg_username && !$user.user.tg_id" class="q-mb-md">
            <p class="text-bold text-negative">Нужно подключить телеграм бота, следуйте инструкции:</p>
              1. Создайте диалог с <span class="text-bold text-negative"><a target="_blank" href="https://t.me/meat_coal_bot">@meat_coal_bot</a></span><br>
              2. В созданном диалоге нажмите Start<br>
              3. Если вы все сделали правильно, бот сообщит об этом.<br>
              4. Обновите эту страницу или перезайдите в аккаунт, если это сообщение пропало, то все сделано правильно.<br>
              5. Бот будет присылать оповещения о заказах.
          </div>
          <div class="flex justify-between">
            <q-btn padding="md" no-caps unelevated v-if="$user.user.is_staff" color="warning" @click="$router.push('/orders')" label="Админка"/>
            <q-btn padding="md" no-caps unelevated color="positive" class=" " @click="userDataSave" label="Сохранить"/>

            <q-btn padding="md" no-caps unelevated color="primary" class=" " @click="userLogout" label="Выйти"/>
          </div>

        </q-tab-panel>

        <q-tab-panel name="location_on">
         <p class="text-h6 q-mb-none">Адреса доставки</p>
     <q-list >
      <q-item clickable v-ripple v-for="address in $user.user.addresses" :key="address.id">
         <q-item-section>{{address.street}} {{address.house}}</q-item-section>
        <q-item-section avatar>
          <q-icon @click="deleteAddress(address.id)" color="grey-6" name="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-form>
      <p class="text-bold">Добавить новый адрес</p>
      <div class="flex justify-between no-wrap">
          <q-input class="full-width q-mr-sm" outlined v-model="newAddress.street" outlined label="Улица *" :rules="[val => !!val || 'Это обязательное поле']"/>
          <q-input  outlined v-model="newAddress.house"  outlined label="Дом *" :rules="[val => !!val || 'Это обязательное поле']"/>
        </div>
        <div class="flex justify-between no-wrap q-mb-md">
          <q-input class=" q-mr-sm" outlined v-model="newAddress.flat" type="number" outlined label="Кв " />
          <q-input class=" q-mr-sm" outlined v-model="newAddress.podezd" type="number" outlined label="Подъезд " />
          <q-input class=" q-mr-sm"  outlined v-model="newAddress.code" type="number" outlined label="Код двери " />
          <q-input  outlined v-model="newAddress.floor" outlined type="number" label="Этаж " />
        </div>
      <q-btn no-caps unelevated padding="md" @click="userAddressSave" color="primary" class="full-width" label="Добавить"/>
    </q-form>
        </q-tab-panel>

        <q-tab-panel name="password">

        </q-tab-panel>
      </q-tab-panels>
    </div>

  </q-page>

</template>

<script>
import {mapActions} from "vuex";

export default {
  preFetch ({ store, redirect }) {
  if (!store.state.auth.loggedIn) {
    redirect({ path: '/' })
  }
},
  data () {
    return {
      tab: 'person',
      userData:{
        fio:this.$user.user.fio,
        email:this.$user.user.email,
        birthday:this.$user.user.birthday,
        tg_username:this.$user.user.tg_username,
        phone:this.$user.user.phone,
      },
      newAddress:{
          street:null,
          house:null,
          flat:null,
          podezd:null,
          code:null,
          floor:null
      }
    }
  },
  methods:{
    ... mapActions('auth',['getUser']),
    ...mapActions('auth',['logoutUser']),
    async userDataSave(){
      this.userData.tg_username = this.userData.tg_username.replace('@','')

      const responce = await this.$api.post('/api/user/update',{userData:this.userData})
      //console.log(responce.data)
      await  this.getUser(false)
    },
     async userAddressSave(){
      await this.$api.post('/api/user/add_address',this.newAddress)
      await  this.getUser(false)
    },
    async deleteAddress(id){
      await this.$api.delete(`/api/user/delete_address/${id}`)
     await  this.getUser(false)
    },
    userLogout(){
      this.logoutUser()
      this.$router.push('/')
    }
  }
}
</script>
