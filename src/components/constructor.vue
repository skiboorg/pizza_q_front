<template>
  <q-dialog
    v-model="is_visible"
    transition-show="slide-left"
    transition-hide="slide-right"
    @before-show="getPizzas">
    <q-card  class="pizza-constructor" >
      <q-toolbar>
        <div class="text-h6">Пицца-конструктор</div>
        <q-space/>
        <q-icon @click="closeModal" size="md" name="close"></q-icon>
      </q-toolbar>
      <q-card-section>
        <div class="row">
          <div  class="col-lg-4 col-md-4 col-sm-4 col-xs-12  q-pt-none text-grey-6">
            <p>Выберите половинки пицц и соберите свою!</p>
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-6 " :class="{'pizzaDisabled':!firstPizza}">
                <p class="text-subtitle1 text-grey-10 q-mb-none text-weight-bold">Первая половина</p>
                <div v-if="!firstPizza"><p>Выберите пиццу</p> </div>
                <div v-else>
                  <p class="q-mb-none text-grey-10">{{firstPizza.name}}</p>
                  <p class="ingridient-items q-mb-none">
                    {{firstPizza.base_ingridients}}
                  </p>
                </div>
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-6 " :class="{'pizzaDisabled':!secondPizza}">
                <p class="text-subtitle1 text-grey-10 q-mb-none text-weight-bold">Вторая половина</p>
                <div v-if="!secondPizza"><p>Выберите пиццу</p> </div>
                <div v-else>
                  <p class=" q-mb-none text-grey-10">{{secondPizza.name}}</p>
                  <p class="ingridient-items q-mb-none">
                    {{secondPizza.base_ingridients}}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="q-pl-lg-md q-pl-md-md q-pl-sm-md q-pl-xs-none col-lg-8 col-md-8 col-sm-8 col-xs-12  q-pt-none">
            <q-scroll-area class="pizza-constructor__scroll">
              <div class="pizzas-wrapper">

                <!--            {{items.filter( x => x.category.is_pizza) }}-->
                <q-card @click="selectPizzaPart(pizza)"
                        class="q-pt-sm cursor-pointer"
                        :class="{'pizzaChecked': firstPizzaIndex === pizza.id || secondPizzaIndex === pizza.id}"
                        v-for="(pizza,index) in all_pizza" :key="pizza.id"
                        flat
                        bordered>
                  <q-img contain class="no-border-radius " :ratio="16/9" :src="pizza.image"></q-img>
                  <q-card-section class="q-px-sm q-py-none">
                    <p class="text-caption q-mb-none text-bold">{{pizza.name}}</p>
                    <div class="flex justify-between items-center ">
                      <p class="text-body2 no-margin">{{pizza.prices.find(x => x.city === $q.cookies.get('city_id')).price}}р</p>
                      <q-icon
                        size="sm"
                        :class="[firstPizzaIndex === pizza.id || secondPizzaIndex === pizza.id ? 'text-positive' : 'text-grey-4']"
                        name="done"/>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-scroll-area>
          </div>
        </div>
      </q-card-section>
      <q-card-actions  class="bg-white ">
        <div class="row full-width items-center">
          <p class="text-h6 flex col-6 no-margin ">Сумма:
            <span v-if="pizzaPrice>0" class="q-ml-sm text-bold "> {{pizzaPrice}} р</span>
            <span style="width: 100px" class="q-ml-sm" v-else><q-spinner-tail color="primary" size="sm"/>
          </span>
          </p>
          <div class=" col-6 text-right">
            <q-btn color="primary" @click="addToCart" :disabled="!firstPizzaIndex || !secondPizzaIndex" class="full-width"  label="В корзину"  />
          </div>

        </div>

      </q-card-actions>
    </q-card>
  </q-dialog>



</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      all_pizza:[],
      firstPizza:null,
      firstPizzaIndex:null,
      secondPizza:null,
      secondPizzaIndex:null,
    }
  },
  computed:{
    ...mapGetters('products',['categories']),
    is_visible: {
      get(){
        return this.$store.state.componentState.constructor_visible
      },
      set(val){
        return  this.changeConstructorVisible(val)
      }
    },
    pizzaPrice(){
      if (this.firstPizzaIndex && this.secondPizzaIndex){
        let firstPizzaPrice = parseInt(this.firstPizza.prices.find(x => x.city === this.$q.cookies.get('city_id')).price)
        let secondPizzaPrice = parseInt(this.secondPizza.prices.find(x => x.city === this.$q.cookies.get('city_id')).price)
        return (firstPizzaPrice / 2) + (secondPizzaPrice / 2)
        // return parseInt((firstPizzaPrice / 2) + (secondPizzaPrice / 2))
      }else{
        return 0
      }

    }
  },
  methods:{
    ...mapActions('componentState',['changeConstructorVisible']),
    getPizzas(){
      this.all_pizza = this.categories.find(x=>x.is_pizza).items
    },
    closeModal(){
      this.firstPizza = null
      this.firstPizzaIndex = null
      this.secondPizza = null
      this.secondPizzaIndex = null
      this.changeConstructorVisible(false)
    },
    async addToCart (){
      await this.$api.post('/api/cart/add_to_cart_constructor',{
        session_id:this.$q.cookies.get('session_id'),
        city_id:this.$q.cookies.get('city_id'),
        firstPizza: this.firstPizza,
        secondPizza: this.secondPizza,
      })
      this.$q.notify({
        position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
        message: 'Добавлено в корзину',
        caption: 'Сборная пицца',
        color: 'positive'
      })
      await this.$store.dispatch('cart/fetchCart')
      this.$analytics.fbq.event('AddToCart',{
        value: this.pizzaPrice,
        currency: 'RUB',
        contents: [
          {
            id: 'Конструктор',
            quantity: 1
          }
        ],
        content_ids: 'Конструктор',
      });
      this.closeModal()

    },
    selectPizzaPart(pizza){
      if (this.firstPizzaIndex && this.secondPizzaIndex){
        if (this.secondPizzaIndex === pizza.id){
          this.secondPizzaIndex = null
          this.secondPizza = null
        }else{
          this.firstPizzaIndex = pizza.id
          this.secondPizzaIndex = null
          this.firstPizza = pizza
          this.secondPizza = null
        }
        return
      }

      if (!this.firstPizzaIndex && !this.secondPizzaIndex){
        this.firstPizzaIndex = pizza.id
        this.firstPizza = pizza
        return
      }

      if (this.firstPizzaIndex  && !this.secondPizzaIndex){
        if (this.firstPizzaIndex !== pizza.id){
          this.secondPizzaIndex = pizza.id
          this.secondPizza = pizza
        }else {
          this.firstPizzaIndex = null
          this.firstPizza= null
        }
      }
    },
  }
}
</script>
<style lang="sass">
.pizza-constructor
  width: 900px
  &__scroll
    height: 350px
@media (max-width: 768px)
  .pizza-constructor
    &__scroll
      height: 300px
.pizzas-wrapper
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 10px
.ingridient-items
  line-height: 14px
  min-height: 70px
  display: inline-block
  text-transform: lowercase
  font-size: 12px
  color: $grey-8
  &:first-letter
    text-transform: uppercase
@media (max-width: 768px)
  .ingridient-items
    min-height: unset
</style>
