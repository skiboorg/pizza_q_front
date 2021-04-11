<template>
  <q-page >
    <div class="container">
      <div class="flex items-center justify-between">
        <div class="about-number"></div>
        <div class="">
          <h1 class="text-h2 f-raleway-900 text-right"><p class="text-primary">9 причин</p><p class="q-pr-xl">выбрать кафе</p><p>Мясо на углях</p></h1>
        </div>
      </div>
      <q-img
        cover
        src="~assets/about/1.jpg"
        :ratio="16/9"
        class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md rounded-borders"
      />
      <div class="row items-center q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 ">
          <p class="text-h4 f-raleway-900">1. Здоровая еда</p>
          <p class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">Блюда готовим только из свежих продуктов. Не используем замороженные полуфабрикаты,
            соевые добавки и усилители вкуса. Сами делаем заготовки, маринуем мясо, готовим тесто, пластуем рыбу.</p>
          <p class="text-h4 f-raleway-900">2. Безопасность</p>
          <p>Пищевые продукты сертифицированы, а блюда готовятся только в соответствии с действующими нормами СанПин.</p>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0">
          <q-img
            cover
            src="~assets/about/2.jpg"
            :ratio="16/9"
            class="rounded-borders"/>
        </div>
      </div>
      <div class="flex items-center justify-between q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
        <p class="text-h4 f-raleway-900">3. Открытая кухня</p>
        <p style="max-width: 570px">Не боимся показать нашу чистую кухню — вы можете наблюдать, как мы готовим на углях сочные шашлыки, пиццу в печах, пироги и катаем свежие роллы.</p>
      </div>
      <q-img
        cover
        src="~assets/about/3.jpg"
        :ratio="16/9"
        class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md rounded-borders"
      />
      <div class="row items-center q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 ">
          <p class="text-h4 f-raleway-900">4. Более 100 блюд в меню</p>
          <p class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">Большая семья или хотите вкусно и сытно накормить
            компанию на торжестве? Вам повезло – в меню представлены шашлыки, люля-кебаб, пицца, роллы,
            пироги, закуски, рыба, алкогольные и безалкогольные напитки.</p>
          <p class="text-h4 f-raleway-900">5. Выверенная рецептура</p>
          <p>Мы годами отбирали рецепты. Вкус наших блюд понравится большинству гостей, ведь мы добились
            сбалансированного и неповторимого вкуса, используем дорогие индийские, въетнамские специи и не экономим ни на чем.</p>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0">
          <q-img
            cover
            src="~assets/about/4.jpg"
            :ratio="16/9"
            class="rounded-borders"/>
        </div>
      </div>
      <div class="row items-center q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
        <div class=" relative-position col-lg-5 col-md-5 col-sm-5 col-xs-12 ">
          <img class="absolute-right z-max" src="~assets/about/delivery.svg" alt="">
          <q-img
            cover
            src="~assets/about/del.jpg"
            :ratio="16/9"
            class="rounded-borders"/>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0 ">
          <p class="text-h4 f-raleway-900">6. Быстрая и безопасная доставка</p>
          <p class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">Не нужно ждать 1.5-2 часа свежеприготовленную еду —
            доставим заказ за 55 минут в термосумке. С заботой о здоровье предусмотрена бесконтактная доставка.</p>
          <p class="text-h4 f-raleway-900">7. Демократичные цены</p>
          <p>Следим за тем, чтобы наши цены приятно удивляли, чтобы вы могли насладиться любимыми блюдами из нашего ассортимента.</p>
        </div>

      </div>
      <div class="row items-center q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 q-mb-lg-none q-mb-md-none q-mb-sm-none q-mb-xs-md">
          <p class="text-h4 f-raleway-900">8. Повара высшей категории</p>
          <p class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">Для вас готовят профессиональные повара, с широкой рецептурной базой и любовью к своему делу.</p>
          <div class="row q-col-gutter-sm">
            <q-card flat class="my-card col-4">
              <q-img src="~assets/about/p1.jpg" basic >
                <div class="absolute-bottom text-subtitle2 text-center">
                  <p class="text-bold no-margin">Иван</p>
                  Пиццайоло
                </div>
              </q-img>
            </q-card>
            <div class="col-4">
              <q-card flat class="my-card col-4">
              <q-img src="~assets/about/p2.jpg" basic >
                <div class="absolute-bottom text-subtitle2 text-center">
                  <p class="text-bold no-margin">Сергей</p>
                  Шашлычник
                </div>
              </q-img>
            </q-card>
            </div>
            <div class="col-4">
              <q-card flat class="my-card col-4">
              <q-img src="~assets/about/p3.jpg" basic >
                <div class="absolute-bottom text-subtitle2 text-center">
                  <p class="text-bold no-margin">Мария</p>
                  Сушист
                </div>
              </q-img>
            </q-card>
            </div>
          </div>

        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0">
          <q-img
            cover
            src="~assets/about/5.jpg"
            :ratio="16/9"
            class="rounded-borders"/>
        </div>
      </div>
        <div class="row items-center q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">
         <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 q-mb-lg-none q-mb-md-none q-mb-sm-none q-mb-xs-md ">
          <q-img
            basic
            src="~assets/about/6.jpg"
            :ratio="4/3"
            class="rounded-borders"/>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0 ">
          <p class="text-h4 f-raleway-900">9. Уютное кафе</p>
          <p class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md">150 квадратных метров обеденной зоны и 20 столов, парковка на 20+ автомобилей, вежливый и дружелюбный персонал.</p>
          <p class="q-mb-lg-xl q-mb-md-xl q-mb-sm-xl q-mb-xs-md text-bold">Будем рады видеть вас в нашем кафе!</p>

          <div class="row q-col-gutter-sm">
            <q-card flat class="my-card col-6">
              <q-img :ratio="16/9" src="~assets/about/6-1.jpg" basic >
              </q-img>
            </q-card>
           <q-card flat class="my-card col-6">
              <q-img :ratio="16/9" src="~assets/about/6-2.jpg" basic >
              </q-img>
            </q-card>

          </div>

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
<style lang="sass">

.about-number
  position: relative
  transform: rotate(-15deg)
  background: $primary
  width: 158px
  height: 158px
  border-radius: 100%
  &::before
    position: absolute
    content: '9'
    font-family: 'Raleway',sans-serif
    font-weight: 900
    font-size: 73px
    color: #ffffff
    top: 10%
    left: 37%
@media (max-width: 768px)
  .about-number
    width: 60px
    height: 60px
    &::before
      font-size: 27px
</style>
