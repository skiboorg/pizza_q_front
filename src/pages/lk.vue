<template>
  <q-page padding>
    <q-no-ssr>
      <div class="container-sm">
      <p class="text-bold text-h5">Ваш ID: {{$user.user.id}}</p>
      <p class="text-bold text-h5">Баллов начислено: {{$user.user.bonuses}}</p>
      <q-tabs
        v-model="tab"
        dense
        inline-label
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="person" icon="person"  label="Личные даные" />
        <q-tab name="location_on" icon="location_on" label="Адреса доставки" />
        <q-tab name="password" icon="password" label="Сменить пароль" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="person">
          <p class="text-h6">Личные данные</p>
          <q-form class="q-gutter-sm q-mb-lg">
            <q-input dense filled v-model="userData.fio" label="ФИО" />
            <q-input dense disable filled v-model="userData.phone" label="Телефон" />


          </q-form>
          <q-btn color="primary" class="full-width " @click="userDataSave" label="Сохранить"/>
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
          <q-input class="full-width q-mr-sm" filled v-model="newAddress.street" dense label="Улица *" :rules="[val => !!val || 'Это обязательное поле']"/>
          <q-input  filled v-model="newAddress.house"  dense label="Дом *" :rules="[val => !!val || 'Это обязательное поле']"/>
        </div>
        <div class="flex justify-between no-wrap q-mb-md">
          <q-input class=" q-mr-sm" filled v-model="newAddress.flat" type="number" dense label="Кв " />
          <q-input class=" q-mr-sm" filled v-model="newAddress.podezd" type="number" dense label="Подъезд " />
          <q-input class=" q-mr-sm"  filled v-model="newAddress.code" type="number" dense label="Код двери " />
          <q-input  filled v-model="newAddress.floor" dense type="number" label="Этаж " />
        </div>
      <q-btn @click="userAddressSave" color="primary" class="full-width" label="Добавить"/>
    </q-form>
        </q-tab-panel>

        <q-tab-panel name="password">

        </q-tab-panel>
      </q-tab-panels>
    </div>
    </q-no-ssr>
  </q-page>

</template>

<script>
import {mapActions} from "vuex";

export default {
  data () {
    return {
      tab: 'person',
      userData:{
        fio:this.$user.user.fio,
        email:this.$user.user.email,
        birthday:this.$user.user.birthday,
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
    async userDataSave(){
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
  }
}
</script>
