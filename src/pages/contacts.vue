<template>
  <q-page >
    <div class="container">
      <h1 class="text-h3 f-raleway-900">Контакты</h1>
      <div class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
        <p style="line-height: 30px">
          <span class="text-bold">Фактический адрес: </span> 629307, Новый Уренгой, ул.Железнодорожная, 12<br>
          <span class="text-bold">Электронная почта: </span> <a class="no-text-decoration text-grey-10 text-decoration-dash" href="mailto:info@meat-coal.ru">info@meat-coal.ru</a><br>
          <q-no-ssr>
            <span class="text-bold ">Телефоны: </span>
            <a class="no-text-decoration text-grey-10 text-decoration-dash" href="tel:+73494927190">+7(3494) 92 71 90 </a> |
            <a class="no-text-decoration text-grey-10 text-decoration-dash" href="tel:+73494927820">+7(3494) 92 78 20 </a> |
            <a class="no-text-decoration text-grey-10 text-decoration-dash" href="tel:+73494927870">+7(3494) 92 78 70 </a> |
            <a class="no-text-decoration text-grey-10 text-decoration-dash" href="tel:+73494927890">+7(3494) 92 78 90 </a>.
          </q-no-ssr>
        <p style="line-height: 30px">
          <span class="text-bold">Реквизиты:</span><br>
          <span class="text-bold">ИП Красюкова Александра Михайловна</span><br>
          <span class="text-bold">ИНН</span> 860702349353<br>
          <span class="text-bold">ОГРНИП</span> 31889010017895<br>
          <span class="text-bold">Юридический адрес: </span> 129123, г. Москва, 115533, г.Москва, 1-ый Нагатинский проезд, 11-434<br>
        </p>
        <div class="flex  items-start">
            <a target="_blank" href="https://apps.apple.com/us/app/meat-coal/id1572409729"><img class="store-img" src="~assets/ios.png" alt=""></a>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=ru.meat.coal.app"><img class="store-img" src="~assets/play.png" alt=""></a>
          </div>
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
