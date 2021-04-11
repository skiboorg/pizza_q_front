<template>
  <q-dialog

    v-model="is_visible"
    transition-show="fade"

    transition-hide="fade">
    <transition name="fade">
      <div :key="1" v-if="authModalTab==='loginTab'" class="absolute auth-modal q-pa-md bg-white">
        <p class="text-h6 text-center text-bold q-mb-lg">Вход</p>
        <q-form @submit="userLoginAction" class="q-gutter-sd q-mb-lg">
          <q-input
            filled
            :dense="!$q.screen.gt.md"
            v-model="userLogin.phone"
            label="Ваш телефон *"
            mask="+7 (###) ###-##-##"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите номер телефона']"
          />
          <q-input
            :dense="!$q.screen.gt.md"
            filled
            :type="isPwd ? 'password' : 'text'"
            v-model="userLogin.password"
            label="Пароль *"
            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Введите пароль' ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn size="md" label="Войти" type="submit" color="primary" class="q-my-sm full-width"/>
        </q-form>
        <p class="text-caption text-grey-6 q-mb-sm text-center">
          Еще нет аккаунта? <span class="text-grey-10 text-bold cursor-pointer" @click="authModalTab='registerTab'">Зарегистрироваться</span></p>
        <p class="text-grey-10 text-caption text-center text-bold cursor-pointer" @click="authModalTab='restoreTab'">Забыли пароль?</p>



      </div>
      <div :key="2" v-if="authModalTab==='registerTab'" class="absolute  auth-modal q-pa-md bg-white">
         <p class="text-h6 text-center text-bold q-mb-lg">Регистрация</p>
        <q-form autocomplete="off" @submit="userRegisterAction" class="q-gutter-sd q-mb-lg" >
          <q-input
            filled
            :dense="!$q.screen.gt.md"
            v-model="userRegister.phone"
            label="Ваш телефон *"
            mask="+7 (###) ###-##-##"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите номер телефона']"
          />
          <q-input
            filled
            :dense="!$q.screen.gt.md"
            :type="isPwd ? 'password' : 'text'"
            v-model="userRegister.password1"
            label="Пароль *"
            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Введите пароль']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            filled
            :dense="!$q.screen.gt.md"
            :type="isPwd ? 'password' : 'text'"
            v-model="userRegister.password2"
            label="Повторите пароль *"

            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Введите пароль', val => val===userRegister.password1 || 'Пароли не совпадают' ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            filled
            :dense="!$q.screen.gt.md"
            v-model="input_sms"
            v-if="sended_sms"
            label="Код подтверждения *"
            mask="####"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите код подтверждения',
             val => val===sended_sms || 'Неверный код подтверждения']"
          />
          <q-btn size="md" :loading="loading" :label="sended_sms ? 'Регистрация':'Подтвердить номер'" type="submit" color="primary" class="q-my-sm full-width"/>
        </q-form>
        <p class="text-caption text-grey-6 q-mb-sm text-center">
          Уже есть аккаунт? <span class="text-grey-10 text-bold cursor-pointer" @click="authModalTab='loginTab'">Войти</span> <br>

        </p>

      </div>
      <div :key="3" v-if="authModalTab==='restoreTab'" class="absolute  auth-modal q-pa-md bg-white">
         <p class="text-h6 text-center text-bold q-mb-lg">Восстановление пароля</p>
        <q-form autocomplete="off" @submit="userRestorerAction" class="q-gutter-sd q-mb-lg" >
          <q-input
            filled
            :dense="!$q.screen.gt.md"
            v-model="userRegister.phone"
            label="Ваш телефон *"
            mask="+7 (###) ###-##-##"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите номер телефона']"
          />
          <q-input
            v-if="sended_sms"
            filled
            :dense="!$q.screen.gt.md"
            v-model="input_sms"
            label="Код из SMS *"
            mask="####"
            lazy-rules
            :rules="[ val => val === sended_sms || 'Код не верный']"
          />

          <q-btn size="md" :loading="loading" :label="sended_sms ? 'Сбросить пароль':'Отправить код'" type="submit" color="primary" class="q-my-sm full-width"/>
        </q-form>
        <p class="text-caption text-grey-6 q-mb-sm text-center">
          Уже есть аккаунт? <span class="text-grey-10 text-bold cursor-pointer" @click="authModalTab='loginTab'">Войти</span> <br>

        </p>

      </div>
    </transition>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      isPwd: true,
      sended_sms:null,
      input_sms:null,
      loading:false,
      userLogin:{
        phone:null,
        password:null,
      },
      userRegister:{
        phone:null,
        password1:null,
        password2:null,
      },

      authModalTab:'loginTab',
      restoreText:'Введите номер телефона, использованный при регистрации. На него придет смс-сообщение с кодом,' +
        ' необходимым для восстановления пароля',
      restoreStep:1,
      restorePhone:null,
      restoreCode:null,
      restoreSecondsLeft:59,
      restoreButtonLoading:false,
    };
  },
  methods: {
    ... mapActions('auth',['loginUser']),
    ...mapActions('cart',['fetchCart']),
    ...mapActions('componentState', ['changeAuthModalVisible']),
    async userRegisterAction(){
      this.loading=true
      if(!this.sended_sms){
        this.$q.notify({
          message: 'На ваш номер отправлено SMS с кодом подтверждения',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'positive',
          icon: 'announcement'
        })
        await this.send_sms()
      }else {
        this.loading=false
        await this.completeRegistration()
      }
    },
    async userRestorerAction(){
      console.log('userRestorerAction')
      this.loading=true
      if (!this.sended_sms){
        await this.send_sms()
      }else {
        const response = await  this.$api.post(`api/user/change_password`,{phone:this.userRegister.phone})
        this.$q.notify({
          message: 'Ваш пароль успешно изменен',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          icon: 'done',
          color:'positive'
        })
        this.loading=false
        this.sended_sms= null
        this.userLogin.phone = this.userRegister.phone
        this.userRegister.phone = null
        this.authModalTab = 'loginTab'

      }


    },
    async send_sms(){
      console.log('sms')
      const response = await  this.$api.post(`api/user/send_code_sms`,{phone:this.userRegister.phone})
      console.log(response.data)
      if (response.data.code){
        this.sended_sms= response.data.code
        this.loading=false
      }else {
        this.$q.notify({
          message: 'Телефон указан не верно',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          icon: 'error',
          color:'red'
        })
        this.loading=false

      }
    },
    async completeRegistration(){
      try{
        let response = await this.$api.post('/auth/users/', {
          phone:this.userRegister.phone,
          password:this.userRegister.password2,
        })
        this.$q.notify({
          message: 'Аккаунт создан',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'positive',
          icon: 'announcement'
        })
        this.loading=false
        this.authModalTab='loginTab'
      }catch (e) {
        this.$q.notify({
          message: 'Проверьте введеные данные',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
           color:'red',
          icon: 'announcement'
        })
      }
    },
    userLoginAction() {
      this.loginUser(this.userLogin)
      this.changeAuthModalVisible(false)
    },


  },
  computed:{
    is_visible: {
      get(){
        return this.$store.state.componentState.auth_modal
      },
      set(val){
        return  this.changeAuthModalVisible(val)
      }
    },
  }
}
</script>
<style>
.auth-modal{
  width: 400px;
}
@media (max-width: 768px){
  .auth-modal{
    width: 300px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
  opacity: 1;

}

.fade-enter,
.fade-leave-to {


  opacity: 0;
}
</style>
