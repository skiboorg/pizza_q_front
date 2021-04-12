<template>
  <q-page >
  <div class="container">
       <h1 class="text-h3 f-raleway-900">Контакты</h1>
    <div class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
      <p style="line-height: 30px">
        <span class="text-bold">Фактический адрес: </span> 629307, Новый Уренгой, ул.Железнодорожная, 12<br>
<span class="text-bold">Электронная почта: </span> <a class="no-text-decoration text-grey-10 text-decoration-dash" href="mailto:info@meat-coal.ru">info@meat-coal.ru</a><br>
<span class="text-bold ">Телефоны: </span> <a class="no-text-decoration text-grey-10 text-decoration-dash zphone" href="tel:+73494292407">+7 (3494) 29 24 07</a> | <a class="no-text-decoration text-grey-10 text-decoration-dash zphone" href="tel:+73494292507">+7 (3494) 29 25 07</a>.
<p style="line-height: 30px">
<span class="text-bold">Реквизиты:</span><br>
<span class="text-bold">ИП Красюкова Александра Михайловна</span><br>
<span class="text-bold">ИНН</span> 860702349353<br>
      <span class="text-bold">ОГРНИП</span> 31889010017895<br>
<span class="text-bold">Юридический адрес: </span> 129123, г. Москва, 115533, г.Москва, 1-ый Нагатинский проезд, 11-434<br>
      </p>
    </div>

   <Map/>
  </div>

  </q-page>

</template>

<script>
import Map from "components/map";
export default {
  components:{
    Map
  },
  data() {
    return {

    };
  },


}
</script>
