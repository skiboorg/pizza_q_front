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
            outlined
            :dense="!$q.screen.gt.md"
            v-model="userLogin.phone"
            label="Ваш телефон *"
            mask="+7 (###) ###-##-##"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите номер телефона']"
          />
          <q-input
            :dense="!$q.screen.gt.md"
            outlined
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
          <q-btn no-caps unelevated label="Войти" type="submit" color="primary" padding="md" class="full-width"/>
        </q-form>

        <p class="text-caption text-grey-6 q-mb-sm text-center">
          Еще нет аккаунта? <span class="text-grey-10 text-bold cursor-pointer" @click="authModalTab='registerTab'">Зарегистрироваться</span></p>
        <p class="text-grey-10 text-caption text-center text-bold cursor-pointer" @click="authModalTab='restoreTab'">Забыли пароль?</p>



      </div>
      <div :key="2" v-if="authModalTab==='registerTab'" class="absolute  auth-modal q-pa-md bg-white">
         <p class="text-h6 text-center text-bold q-mb-lg">Регистрация</p>
        <q-form autocomplete="off" @submit="userRegisterAction" class="q-gutter-sd q-mb-lg" >
          <q-input
            outlined
            :dense="!$q.screen.gt.md"
            v-model="userRegister.phone"
            label="Ваш телефон *"
            mask="+7 (###) ###-##-##"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите номер телефона']"
          />

          <q-input
            outlined
            :dense="!$q.screen.gt.md"
            v-model="userRegister.tg_username"
            label="Ваш telegram username * (начинается с @)"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите telegram username']"
          />

          <q-input
            outlined
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
            outlined
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

          <q-btn padding="md" no-caps unelevated size="md" :loading="loading" label="Регистрация" type="submit" color="primary" class="q-my-sm full-width"/>
        </q-form>
        <p class="text-caption text-grey-6 q-mb-sm text-center">
          Уже есть аккаунт? <span class="text-grey-10 text-bold cursor-pointer" @click="authModalTab='loginTab'">Войти</span> <br>

        </p>

      </div>
      <div :key="3" v-if="authModalTab==='restoreTab'" class="absolute  auth-modal q-pa-md bg-white">
         <p class="text-h6 text-center text-bold q-mb-lg">Восстановление пароля</p>
        <q-form autocomplete="off" @submit="reset_password" class="q-gutter-sd q-mb-lg" >
          <q-input
            outlined
            :dense="!$q.screen.gt.md"
            v-model="userRegister.phone"
            label="Ваш телефон *"
            mask="+7 (###) ###-##-##"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите номер телефона']"
          />

          <q-btn no-caps unelevated padding="md" :loading="loading" label="Сбросить пароль" type="submit" color="primary" class="q-my-sm full-width"/>
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
        phone:'+79682717070',
        password:'1111',
      },
      userRegister:{
        phone:'+79682717070',
        password1:'1111',
        password2:'1111',
        tg_username:'@web_appp_dev',
      },

      authModalTab:'loginTab',
      restoreText:'Введите номер телефона, использованный при регистрации. На него поступит звонок.' +
        ' Последние 6 цифр номера, с которого пришел звонок, будут являться кодом подтверждения',
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
      await this.completeRegistration()
      // if(!this.sended_sms){
      //   await this.send_sms()
      //
      // }else {
      //   this.loading=false
      //   this.sended_sms = null
      //
      // }
    },

    async reset_password(){
      //console.log('sms')

      const response = await  this.$api.post(`api/user/send_code`,
        {
          phone:this.userRegister.phone.replaceAll(' ',''),
          r:this.$q.cookies.get('session_id')
        })
      //todo сброс пароля
      //console.log(response.data)
      if (response.data.success){
        this.$q.notify({
          message: response.data.message,
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          html:true,
          color:'positive',
          icon: 'announcement'
        })
        this.sended_sms= response.data.id
        this.loading=false
      }else {
        this.$q.notify({
          message: response.data.message,
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          icon: 'error',
          html:true,
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
          tg_username:this.userRegister.tg_username.replace('@',''),
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
          message: 'Аккаунт с таким номерм уже существует',
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
