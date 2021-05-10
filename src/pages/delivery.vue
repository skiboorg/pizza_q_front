<template>
  <q-page >
  <div class="container">
     <h1 class="text-h3 f-raleway-900">Доставка и оплата</h1>
    <div class="row items-center q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 ">
         <div class="row q-col-gutter-lg">
           <div class="col-6 text-center">
             <p class="text-grey-6 text-body2 no-margin">ДОСТАВКА РАБОТАЕТ</p>
             <p class="text-bold text-h5 no-margin" >c 10:30 до 22:00</p>

           </div>
           <div class="col-6 text-center">
             <p class="text-grey-6 text-body2 no-margin">СУММА ЗАКАЗА</p>
             <p class="text-bold text-h5  no-margin" >от 100 руб</p>
           </div>
           <div class="col-6 text-center">
               <p class="text-grey-6 text-body2 no-margin">ЦЕНА ДОСТАВКИ</p>
             <p class="text-bold text-h5  no-margin" >100 руб</p>
           </div>
           <div class="col-6 text-center">
               <p class="text-grey-6 text-body2 no-margin">ВРЕМЯ ДОСТАВКИ</p>
         <p class="text-bold text-h5  no-margin" >1 час</p>
           </div>
         </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0">
          <q-img
            cover
            src="~assets/about/del.jpg"
            :ratio="16/9"
            class="rounded-borders"/>
        </div>
      </div>
    <p class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">При покупке любых блюд, на любую сумму мы начисляем бонусы в размере 0,5% от суммы заказа, которыми вы сможете
      рассчитываться при любом заказе, в любое время. Чтобы бонусы, при покупке, могли начисляться -
      <span class="text-bold">необходимо зарегистрироваться на сайте,
        <span @click="changeAuthModalVisible(true)" class="cursor-pointer text-decoration-dash">в личном кабинете</span></span>
</p>
    <p class="text-center text-h3 f-raleway-900 q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">Способы оплаты</p>
    <div class="flex items-center no-wrap justify-evenly q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
      <div  class="text-center flex column items-center justify-between">
        <img style="width: 90px;height:85px;object-fit: contain" src="~assets/pay1.png" alt="">
        <p class="no-margin">Наличными курьеру</p>
      </div>
      <div  class="text-center flex column items-center justify-between">
        <img style="width: 90px;height:85px;object-fit: contain" src="~assets/pay2.png" alt="">
        <p class="no-margin">Оплата на сайте</p>
      </div>
      <div  class="text-center flex column items-center justify-between">
        <img style="width: 90px;height:85px;object-fit: contain" src="~assets/pay3.png" alt="">
        <p class="no-margin">Оплата картой курьеру</p>
      </div>
    </div>
    <div class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
      <p>Если товар доставляется курьером, то оплата осуществляется наличными курьеру в руки, либо банковской картой
        через мобильный терминал. При получении товара обязательно проверьте комплектацию товара и наличие товарного чека.</p>
      <p>Для выбора оплаты товара с помощью банковской карты на соответствующей странице необходимо нажать кнопку
        Оплата заказа банковской картой. Оплата происходит через ПАО СБЕРБАНК с использованием банковских карт следующих платёжных систем:</p>
      <div style="max-width: 700px; margin: 0 auto 20px" class="flex items-center justify-evenly">
        <img src="~assets/mir.png" alt="">
        <img src="~assets/visa.png" alt="">
        <img src="~assets/mastercard.png" alt="">
        <img src="~assets/jcb.png" alt="">
      </div>
      <p>Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены на платёжный шлюз ПАО СБЕРБАНК.
        Соединение с платёжным шлюзом и передача информации осуществляется в защищённом режиме с использованием протокола
        шифрования SSL. В случае если Ваш банк поддерживает технологию безопасного проведения интернет-платежей
        Verified By Visa, MasterCard SecureCode, MIR Accept, J-Secure, для проведения платежа также может потребоваться
        ввод специального пароля.</p>
      <p>Настоящий сайт поддерживает 256-битное шифрование. Конфиденциальность сообщаемой персональной
        информации обеспечивается ПАО СБЕРБАНК. Введённая информация не будет предоставлена третьим лицам за
        исключением случаев, предусмотренных законодательством РФ. Проведение платежей по банковским картам
        осуществляется в строгом соответствии с требованиями платёжных систем МИР, Visa Int., MasterCard Europe Sprl, JCB.</p>
      <p>В случае возникновения проблем с онлайн оплатой на сайте, звоните по номерам:
        <a class="no-text-decoration text-grey-10 text-decoration-dash" href="tel:+73494292407">+7 (3494) 29 24 07</a> |
        <a class="no-text-decoration text-grey-10 text-decoration-dash" href="tel:+73494292507">+7 (3494) 29 25 07</a></p>
      <p>Условия возврата товара указаны в
        <router-link class="no-text-decoration text-grey-10 text-decoration-dash" to="rules">правилах оказания услуг</router-link></p>
      <p>Порядок обработки персональных данных указан в разделе
        <router-link class="no-text-decoration text-grey-10 text-decoration-dash" to="policy">политика конфиденциальности</router-link></p>
    </div>
   <Map/>
  </div>

  </q-page>

</template>

<script>
import Map from "components/map";
import {mapActions} from 'vuex';
export default {
  components:{
    Map
  },
  data() {
    return {

    };
  },
  methods:{
    ...mapActions('componentState',['changeAuthModalVisible'])
  }


}
</script>
