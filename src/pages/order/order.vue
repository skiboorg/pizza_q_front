<template>
  <q-page  class="flex items-center justify-center column">
    <h3 class="text-h4 text-bold text-center">Ваш заказ <span class="text-primary">№ {{$route.params.order_code}}</span> успешно оплачен</h3>
    <p class="text-bold text-center">Спасибо, за ваш заказ!</p>
  <q-btn no-caps unelevated  color="primary" to="/" label="На главную"/>
  </q-page>
</template>
