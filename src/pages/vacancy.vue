<template>
  <q-page >
  <div class="container">
     <h1 class="text-h3 f-raleway-900">Вакансии</h1>
    <div class="row items-center q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 q-mb-lg-none q-mb-md-none q-mb-sm-md q-mb-xs-md">
        <p class="q-mb-none"><span class="text-weight-bold">В связи с постоянным развитием и расширением нам требуются сотрудники:</span> <br><br>

          <span class="text-weight-bold">Кухонный рабочий</span>, зарплата: от 45 000 руб.<br><br>
<span class="text-weight-bold">Продавец-кассир</span>, зарплата: 2 000 руб/смена<br><br>
<span class="text-weight-bold">Сушист-пиццмейкер</span>, зарплата: до 85 000 руб.<br><br>
<span class="text-weight-bold">Шашлычник</span>, зарплата: до 85 000 руб.<br><br>

  <span class="text-weight-bold">Условия:</span><br>
- Комплексное питание за наш счет;<br>
- Развозим сотрудников после смены;<br>
- Премирование и бонусы. </p>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 offset-lg-1 offset-md-1 offset-sm-0 offset-xs-0">
          <q-img
            cover
            src="~assets/vac.webp"
            :ratio="16/9"
            class="rounded-borders"/>
        </div>
      </div>
<p class="q-mb-lg text-center">В случае заинтересованности звоните нам, либо пишите нам на почту: <a class="no-text-decoration text-grey-10 text-decoration-dash" href="mailto:info@meat-coal.ru">info@meat-coal.ru</a> </p>

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
