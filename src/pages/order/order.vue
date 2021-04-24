<template>
  <q-page  class="flex items-center justify-center column">
    <h3 class="text-h4 text-bold text-center">Ваш заказ <span class="text-primary">№ {{$route.params.order_code}}</span> успешно оплачен</h3>
    <p class="text-bold text-center">Спасибо, за ваш заказ!<br>
Менеджер свяжется с вами в течении 5 минут, для подтверждения заказа.</p>
  <q-btn color="primary" to="/" label="На главную"/>
  </q-page>
</template>
