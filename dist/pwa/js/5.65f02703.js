(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"00f9":function(t,i,e){},"0a9c":function(t,i,e){"use strict";e("bd87")},5485:function(t,i,e){"use strict";e("b815")},"6a44":function(t,i,e){"use strict";e("00f9")},"8b24":function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("q-page",{staticClass:"q-pb-lg"},[t.categories.length>0?e("section",{staticClass:"home-page-slider q-mt-lg"},[e("div",{staticClass:"home-page-slider__overlay overlay-left"},[e("svg",{attrs:{width:"34",height:"34",viewBox:"0 0 34 34",fill:"none",xmlns:"http://www.w3.org/2000/svg"},on:{click:t.homeTopSliderPrev}},[e("circle",{attrs:{cx:"17",cy:"17",r:"17"}}),e("path",{attrs:{d:"M14.759 9.8418L20.9409 16.9997L14.759 24.1576",stroke:"white","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round"}})])]),e("div",{staticClass:"home-page-slider__overlay overlay-right",on:{click:t.homeTopSliderNext}},[e("svg",{attrs:{width:"34",height:"34",viewBox:"0 0 34 34",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("circle",{attrs:{cx:"17",cy:"17",r:"17"}}),e("path",{attrs:{d:"M14.759 9.8418L20.9409 16.9997L14.759 24.1576",stroke:"white","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round"}})])]),e("swiper",{ref:"homeTopSlider",attrs:{options:t.sliderHomeTopOption}},[t._l(t.banners,(function(t){return e("swiper-slide",{key:t.id,staticClass:"home-page-slider__item"},[e("div",{},[e("img",{staticStyle:{"max-width":"100%",height:"auto"},attrs:{src:t.image,alt:""}})])])})),e("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1):t._e(),t.categories.length>0?e("div",{staticClass:"container"},t._l(t.categories,(function(i,s){return e("section",{key:i.id,attrs:{"data-index":s,id:"catID_"+i.id}},[e("h3",{staticClass:"f-raleway-900"},[t._v(t._s(i.name))]),e("div",{staticClass:"products-grid"},t._l(i.items,(function(i){return i.is_for_meat||!i.is_active||i.is_gift?t._e():e("ItemCard",{key:i.id,attrs:{item:i}})})),1)])})),0):e("div",{staticClass:"container"},[e("section",[e("div",{staticClass:"products-grid"},t._l(20,(function(t){return e("q-card",{key:t},[e("q-skeleton",{attrs:{height:"200px",square:""}}),e("q-card-section",[e("q-skeleton",{attrs:{type:"text"}}),e("q-skeleton",{attrs:{type:"text"}})],1),e("q-card-actions",{staticClass:"q-gutter-md",attrs:{align:"right"}},[e("q-skeleton",{attrs:{type:"QBtn"}})],1)],1)})),1)])]),e("Pizza"),e("q-dialog",{attrs:{"transition-show":"fade","transition-hide":"fade"},model:{value:t.show_delivery_modal,callback:function(i){t.show_delivery_modal=i},expression:"show_delivery_modal"}},[e("q-card",[e("q-card-section",[e("div",{staticClass:"text-h6 text-center text-weight-bold"},[t._v("Уважаемые клиенты!")])]),e("q-card-section",{staticClass:"q-pt-none"},[e("div",{domProps:{innerHTML:t._s(t.currentCity.modalText)}})]),e("q-card-actions",{attrs:{align:"center"}},[e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"full-width",attrs:{"no-caps":"",unelevated:"",padding:"md",label:"Понятно",color:"primary"}})],1)],1)],1),e("q-dialog",{attrs:{"transition-show":"fade","transition-hide":"fade"},model:{value:t.modal,callback:function(i){t.modal=i},expression:"modal"}},[e("q-card",[e("q-card-section",[e("div",{staticClass:"text-h6 text-center text-weight-bold"},[t._v("Уважаемые клиенты!")])]),e("q-card-section",{staticClass:"q-pt-none"},[e("p",[t._v("   Кафе по техническим причинам не работает. "),e("br"),t._v(" Приносим извинения за доставленные неудобства.")])]),e("q-card-actions",{attrs:{align:"center"}},[e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"q-px-lg",attrs:{label:"Понятно",color:"primary"}})],1)],1)],1)],1)},a=[],o=e("ded3"),n=e.n(o),c=(e("e6cf"),e("0831")),r=function(){var t=this,i=this,e=i.$createElement,s=i._self._c||e;return i.item.prices.filter((function(i){return i.city===t.$q.cookies.get("city_id")})).length?s("q-card",{staticClass:"q-mb-sm q-mx-sm no-padding item-card",attrs:{flat:i.$q.screen.lt.sm}},[s("q-card-section",{staticClass:"q-mb-sm no-padding ",staticStyle:{position:"relative"},attrs:{horizontal:i.$q.screen.lt.sm}},[s("q-img",{staticClass:"col-lg-5 col-md-5 col-sm-5 col-xs-4 item-card__image",attrs:{contain:i.item.is_pizza,ratio:1,src:i.item.image}}),s("q-card-section",{staticClass:"q-pa-lg-md q-pa-md-md q-py-sm-none q-px-sm-sm q-py-xs-none q-px-xs-sm col-lg-7 col-md-7 col-sm-7 col-xs-8"},[s("div",{staticClass:"row items-center"},[s("p",{staticClass:"col-lg-10 col-md-10 col-sm-10 col-xs-10 text-subtitle1 lh-100 text-bold "},[i._v(i._s(i.item.name))]),i.item.kbgu?s("q-icon",{staticClass:"cursor-pointer col-lg-1 col-md-1 col-sm-1 col-xs-1 offset-1 q-mb-md",attrs:{color:"grey-4",flat:"",size:"sm",round:"",name:"info"}},[s("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle",offset:[10,10]}},[s("p",{staticClass:"text-center no-margin"},[i._v("\n            К/Б/Ж/У"),s("br"),i._v("\n            "+i._s(i.item.kbgu)+"\n          ")])])],1):i._e()],1),s("p",{staticClass:"text-caption text-grey q-mb-sm ingridient-items"},[i._v("\n          "+i._s(i.item.base_ingridients)+"\n        ")]),s("div",{staticClass:"row justify-between items-center"},[!i.item.is_pizza&&i.item.weight>0?s("p",{staticClass:"col-lg-6 col-md-6 col-sm-6 col-xs-6   text-bold no-margin"},[i._v("Вес "+i._s(i.item.weight)+" г")]):s("p",{staticClass:"text-bold no-margin col-lg-6 col-md-6 col-sm-6 col-xs-6 "}),i.item.is_pizza?i._e():s("div",{staticClass:"col-lg-6 col-md-6 col-sm-6 col-xs-6 units-add flex justify-between items-center  q-mb-sm "},[s("q-btn",{attrs:{outline:"",round:"",size:"xs",color:"primary",icon:"remove"},on:{click:i.minusUnit}}),s("p",{staticClass:"item-card__unit q-ma-none bg-grey-1 q-pa-sm"},[i._v(i._s(i.total_units)+" "+i._s(i.unit_name))]),s("q-btn",{attrs:{outline:"",round:"",size:"xs",color:"primary",icon:"add"},on:{click:i.plusUnit}})],1)]),s("div",{staticClass:"row justify-between items-center"},[s("div",{},[s("p",{staticClass:"no-margin"},[i.item.prices.find((function(i){return i.city===t.$q.cookies.get("city_id")})).old_price>0?s("span",{staticStyle:{"text-decoration":"line-through",color:"#7A7878","font-weight":"normal"}},[i._v(i._s(i.item.prices.find((function(i){return i.city===t.$q.cookies.get("city_id")})).old_price)+"р "),s("br")]):i._e()]),i.item.is_pizza?s("p",{staticClass:"item-card__price col-lg-4 col-md-4 col-sm-4 col-xs-4 text-bold no-margin "},[i._v("от "+i._s(i.item.prices.find((function(i){return i.city===t.$q.cookies.get("city_id")})).price)+" р")]):s("p",{staticClass:"item-card__price col-lg-3 col-md-3 col-sm-3 col-xs-3 text-bold no-margin "},[i._v(i._s(i.item.prices.find((function(i){return i.city===t.$q.cookies.get("city_id")})).price)+" р")])]),i.item.is_pizza?s("q-btn",{class:i.$q.screen.lt.sm?"text-bold q-py-sm":"",attrs:{unelevated:"",color:"primary",size:i.$q.screen.lt.sm?"sm":"md","no-caps":"",label:"Выбрать"},on:{click:function(t){return i.openPizza(i.item.id)}}}):s("q-btn",{staticClass:"in-cart-btn col-lg-9 col-md-9 col-sm-9 col-xs-9",class:i.$q.screen.lt.sm?"text-bold q-py-sm":"",attrs:{unelevated:"","no-caps":"",loading:i.is_loading,size:i.$q.screen.lt.sm?"sm":"md",color:"primary",label:"В корзину "+(i.item.is_meat,i.item.prices.find((function(i){return i.city===t.$q.cookies.get("city_id")})).price*i.units+" р")},on:{click:function(t){return i.addToCart(i.item)}},scopedSlots:i._u([{key:"loading",fn:function(){return[s("q-spinner-hourglass",{staticClass:"on-left"})]},proxy:!0}],null,!1,3518800889)})],1)])],1)],1):i._e()},l=[],d=e("2f62"),p={props:["item"],data(){return{base_price:0,min_unit:this.item.min_unit,unit_name:this.item.unit_name,units:1,is_loading:!1}},methods:n()(n()(n()(n()({},Object(d["b"])("cart",["fetchCart"])),Object(d["b"])("componentState",["changePizzaChooseVisible"])),Object(d["b"])("products",["changeOpenedPizza"])),{},{plusUnit(){this.units+=1},minusUnit(){this.units>1?this.units-=1:this.units=1},openPizza(t){this.changeOpenedPizza(t),this.changePizzaChooseVisible(!0)},async addToCart(t){this.is_loading=!0,await this.$api.post("/api/cart/add_to_cart",{session_id:this.$q.cookies.get("session_id"),item:t,selected_size:0,weight:0,units:this.units,city_id:this.$q.cookies.get("city_id"),is_meat:t.is_meat}),await this.fetchCart(),this.$q.notify({position:this.$q.screen.lt.sm?"bottom":"bottom-right",message:"Добавлено в корзину",caption:t.name,color:"positive"}),this.is_loading=!1}}),computed:{total_units(){return this.min_unit*this.units}}},m=p,z=(e("6a44"),e("2877")),h=e("f09f"),u=e("a370"),_=e("068f"),g=e("0016"),b=e("05c0"),f=e("9c40"),v=e("9149"),q=e("eebe"),x=e.n(q),C=Object(z["a"])(m,r,l,!1,null,null,null),y=C.exports;x()(C,"components",{QCard:h["a"],QCardSection:u["a"],QImg:_["a"],QIcon:g["a"],QTooltip:b["a"],QBtn:f["a"],QSpinnerHourglass:v["a"]});var w=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("q-dialog",{attrs:{"transition-show":"slide-left","transition-hide":"slide-right"},on:{"before-show":t.getPizzas},model:{value:t.is_visible,callback:function(i){t.is_visible=i},expression:"is_visible"}},[e("q-card",{staticClass:"pizza-constructor"},[e("q-toolbar",[e("div",{staticClass:"text-h6"},[t._v("Пицца-конструктор")]),e("q-space"),e("q-icon",{attrs:{size:"md",name:"close"},on:{click:t.closeModal}})],1),e("q-card-section",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-4 col-md-4 col-sm-4 col-xs-12  q-pt-none text-grey-6"},[e("p",[t._v("Выберите половинки пицц и соберите свою!")]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-12 col-md-12 col-sm-12 col-xs-6 ",class:{pizzaDisabled:!t.firstPizza}},[e("p",{staticClass:"text-subtitle1 text-grey-10 q-mb-none text-weight-bold"},[t._v("Первая половина")]),t.firstPizza?e("div",[e("p",{staticClass:"q-mb-none text-grey-10"},[t._v(t._s(t.firstPizza.name))]),e("p",{staticClass:"ingridient-items q-mb-none"},[t._v("\n                  "+t._s(t.firstPizza.base_ingridients)+"\n                ")])]):e("div",[e("p",[t._v("Выберите пиццу")])])]),e("div",{staticClass:"col-lg-12 col-md-12 col-sm-12 col-xs-6 ",class:{pizzaDisabled:!t.secondPizza}},[e("p",{staticClass:"text-subtitle1 text-grey-10 q-mb-none text-weight-bold"},[t._v("Вторая половина")]),t.secondPizza?e("div",[e("p",{staticClass:" q-mb-none text-grey-10"},[t._v(t._s(t.secondPizza.name))]),e("p",{staticClass:"ingridient-items q-mb-none"},[t._v("\n                  "+t._s(t.secondPizza.base_ingridients)+"\n                ")])]):e("div",[e("p",[t._v("Выберите пиццу")])])])])]),e("div",{staticClass:"q-pl-lg-md q-pl-md-md q-pl-sm-md q-pl-xs-none col-lg-8 col-md-8 col-sm-8 col-xs-12  q-pt-none"},[e("q-scroll-area",{staticClass:"pizza-constructor__scroll"},[e("div",{staticClass:"pizzas-wrapper"},t._l(t.all_pizza,(function(i,s){return e("q-card",{key:i.id,staticClass:"q-pt-sm cursor-pointer",class:{pizzaChecked:t.firstPizzaIndex===i.id||t.secondPizzaIndex===i.id},attrs:{flat:"",bordered:""},on:{click:function(e){return t.selectPizzaPart(i)}}},[e("q-img",{staticClass:"no-border-radius ",attrs:{contain:"",ratio:16/9,src:i.image}}),e("q-card-section",{staticClass:"q-px-sm q-py-none"},[e("p",{staticClass:"text-caption q-mb-none text-bold"},[t._v(t._s(i.name))]),e("div",{staticClass:"flex justify-between items-center "},[e("p",{staticClass:"text-body2 no-margin"},[t._v(t._s(i.prices.find((function(i){return i.city===t.$q.cookies.get("city_id")})).price)+"р")]),e("q-icon",{class:[t.firstPizzaIndex===i.id||t.secondPizzaIndex===i.id?"text-positive":"text-grey-4"],attrs:{size:"sm",name:"done"}})],1)])],1)})),1)])],1)])]),e("q-card-actions",{staticClass:"bg-white "},[e("div",{staticClass:"row full-width items-center"},[e("p",{staticClass:"text-h6 flex col-6 no-margin "},[t._v("Сумма:\n          "),t.pizzaPrice>0?e("span",{staticClass:"q-ml-sm text-bold "},[t._v(" "+t._s(t.pizzaPrice)+" р")]):e("span",{staticClass:"q-ml-sm",staticStyle:{width:"100px"}},[e("q-spinner-tail",{attrs:{color:"primary",size:"sm"}})],1)]),e("div",{staticClass:" col-6 text-right"},[e("q-btn",{staticClass:"full-width",attrs:{color:"primary",disabled:!t.firstPizzaIndex||!t.secondPizzaIndex,label:"В корзину"},on:{click:t.addToCart}})],1)])])],1)],1)},P=[],k={data(){return{all_pizza:[],firstPizza:null,firstPizzaIndex:null,secondPizza:null,secondPizzaIndex:null}},computed:n()(n()({},Object(d["c"])("products",["categories"])),{},{is_visible:{get(){return this.$store.state.componentState.constructor_visible},set(t){return this.changeConstructorVisible(t)}},pizzaPrice(){if(this.firstPizzaIndex&&this.secondPizzaIndex){let t=parseInt(this.firstPizza.prices.find((t=>t.city===this.$q.cookies.get("city_id"))).price),i=parseInt(this.secondPizza.prices.find((t=>t.city===this.$q.cookies.get("city_id"))).price);return t/2+i/2}return 0}}),methods:n()(n()({},Object(d["b"])("componentState",["changeConstructorVisible"])),{},{getPizzas(){this.all_pizza=this.categories.find((t=>t.is_pizza)).items},closeModal(){this.firstPizza=null,this.firstPizzaIndex=null,this.secondPizza=null,this.secondPizzaIndex=null,this.changeConstructorVisible(!1)},async addToCart(){await this.$api.post("/api/cart/add_to_cart_constructor",{session_id:this.$q.cookies.get("session_id"),city_id:this.$q.cookies.get("city_id"),firstPizza:this.firstPizza,secondPizza:this.secondPizza}),this.$q.notify({position:this.$q.screen.lt.sm?"bottom":"bottom-right",message:"Добавлено в корзину",caption:"Сборная пицца",color:"positive"}),await this.$store.dispatch("cart/fetchCart"),this.closeModal()},selectPizzaPart(t){if(!this.firstPizzaIndex||!this.secondPizzaIndex)return this.firstPizzaIndex||this.secondPizzaIndex?void(this.firstPizzaIndex&&!this.secondPizzaIndex&&(this.firstPizzaIndex!==t.id?(this.secondPizzaIndex=t.id,this.secondPizza=t):(this.firstPizzaIndex=null,this.firstPizza=null))):(this.firstPizzaIndex=t.id,void(this.firstPizza=t));this.secondPizzaIndex===t.id?(this.secondPizzaIndex=null,this.secondPizza=null):(this.firstPizzaIndex=t.id,this.secondPizzaIndex=null,this.firstPizza=t,this.secondPizza=null)}})},S=k,$=(e("0a9c"),e("24e8")),I=e("65c6"),Q=e("2c91"),T=e("4983"),j=e("4b7e"),O=e("007d"),B=Object(z["a"])(S,w,P,!1,null,null,null),V=B.exports;x()(B,"components",{QDialog:$["a"],QCard:h["a"],QToolbar:I["a"],QSpace:Q["a"],QIcon:g["a"],QCardSection:u["a"],QScrollArea:T["a"],QImg:_["a"],QCardActions:j["a"],QSpinnerTail:O["a"],QBtn:f["a"]});var M=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("q-dialog",{attrs:{"transition-show":"slide-left","transition-hide":"slide-right"},on:{"before-show":t.getPizza},model:{value:t.is_visible,callback:function(i){t.is_visible=i},expression:"is_visible"}},[e("q-card",[e("q-toolbar",[e("p",{staticClass:"text-h6 no-margin"},[t._v(t._s(t.pizza.name))]),e("q-space"),e("q-btn",{attrs:{dense:"",size:"md",flat:"",round:"",icon:"close"},on:{click:t.closeModal}})],1),e("p",{staticClass:"text-caption q-px-md"},[t._v("Каллорий: "+t._s(t.pizza.belki)+" Белки: "+t._s(t.pizza.belki)+" Жиры: "+t._s(t.pizza.fat)+" Углеводы: "+t._s(t.pizza.uglevod))]),e("q-card-section",{staticClass:"q-py-none"},[e("q-separator",{staticClass:"q-my-sm"}),e("p",{staticClass:"no-margin"},[t._v("Состав:")]),t._l(t.pizza.base_ingridients,(function(i,s){return e("q-checkbox",{key:i.id,staticClass:"pizza-ingridient",class:{"no-checkbox":!i.is_can_removed},attrs:{size:"xs","left-label":"","no-caps":"",disable:!i.is_can_removed,"true-value":!1,"false-value":!0,label:i.name},model:{value:t.pizza.base_ingridients[s].is_removed,callback:function(i){t.$set(t.pizza.base_ingridients[s],"is_removed",i)},expression:"pizza.base_ingridients[index].is_removed"}})})),e("q-separator",{staticClass:"q-my-sm"}),e("p",{staticClass:"q-mb-sm"},[t._v("Размер")]),e("div",{staticClass:"flex items-center q-mb-md"},[e("q-btn-toggle",{staticClass:"q-mr-sm",attrs:{unelevated:"","no-caps":"","toggle-color":"primary",options:[{label:"28 см",value:22,color:"grey-5",toggleColor:"negative"},{label:"33 см",value:33,color:"grey-5",toggleColor:"negative"}]},model:{value:t.pizzaSize,callback:function(i){t.pizzaSize=i},expression:"pizzaSize"}}),e("p",{staticClass:"no-margin"},[t._v(t._s(t.weight)+" г")])],1),e("q-separator",{staticClass:"q-my-sm"}),e("p",[t._v("Добавить ингредиенты")]),e("swiper",{ref:"itemModalSlider",attrs:{options:t.itemModalSliderOption}},[t._l(t.pizza.additional_ingridients,(function(i,s){return e("swiper-slide",{key:i.id},[e("q-card",{staticClass:"add-items cursor-pointer",attrs:{flat:""},on:{click:function(e){t.toggleAdditionIngridient(s,i.price.find((function(i){return i.city===t.$q.cookies.get("city_id")})).price)}}},[e("q-img",{staticStyle:{width:"130px",height:"65px"},attrs:{src:i.image,contain:""}}),e("div",{staticClass:"text-center relative-position"},[e("p",{staticClass:"text-caption q-mb-none"},[t._v(t._s(i.name))]),e("p",{staticClass:"text-caption text-bold"},[t._v(t._s(i.price.find((function(i){return i.city===t.$q.cookies.get("city_id")})).price)+"р")]),i.is_added?e("q-badge",{staticClass:"cursor-pointer",staticStyle:{position:"absolute",bottom:"0",right:"0"},attrs:{color:"positive"}},[e("q-icon",{attrs:{name:"done",color:"white"}})],1):t._e()],1)],1)],1)})),e("div",{staticClass:"swiper-button-prev",attrs:{slot:"button-prev"},slot:"button-prev"}),e("div",{staticClass:"swiper-button-next",attrs:{slot:"button-next"},slot:"button-next"})],2)],2),e("q-card-section",{staticClass:"q-pt-none"},[e("q-separator",{staticClass:"q-my-sm"}),e("p",{staticClass:"h4 text-bold "},[t._v("Сумма: "+t._s(t.total_price)+" р")]),e("q-btn",{attrs:{color:"primary",loading:t.is_loading,unelevated:"","no-caps":"",label:"В корзину"},on:{click:t.addToCart},scopedSlots:t._u([{key:"loading",fn:function(){return[e("q-spinner-hourglass",{staticClass:"on-left"})]},proxy:!0}])})],1)],1)],1)},E=[],D={data(){return{pizza:{prices:[]},slide:1,pizzaSize:22,basePrice:0,price_22:0,price_33:0,additional_price:0,is_meat:!1,is_loading:!1,itemModalSliderOption:{slidesPerView:5,spaceBetween:10,centeredSlides:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{320:{slidesPerView:3,spaceBetween:10},768:{slidesPerView:5}}}}},methods:n()(n()({},Object(d["b"])("componentState",["changePizzaChooseVisible"])),{},{closeModal(){this.is_loading=!1,this.pizzaSize=22,this.additional_price=0,this.changePizzaChooseVisible(!1)},async addToCart(){this.is_loading=!0,await this.$api.post("/api/cart/add_to_cart",{session_id:this.$q.cookies.get("session_id"),item:this.pizza,selected_size:this.pizzaSize,weight:this.weight,units:1,city_id:this.$q.cookies.get("city_id"),is_meat:this.is_meat}),await this.$store.dispatch("cart/fetchCart"),this.$q.notify({position:this.$q.screen.lt.sm?"bottom":"bottom-right",message:"Добавлено в корзину",caption:this.pizza.name,color:"positive"}),this.closeModal()},async getPizza(){const t=await this.$api.get(`/api/items/get_item_by_id/${this.openedPizza}`);this.pizza=t.data,this.price_22=this.pizza.prices.find((t=>t.city===this.$q.cookies.get("city_id"))).price,this.price_33=this.pizza.prices.find((t=>t.city===this.$q.cookies.get("city_id"))).price_33,this.basePrice=this.price_22},toggleAdditionIngridient(t,i){this.pizza.additional_ingridients[t].is_added?(this.pizza.additional_ingridients[t].is_added=!1,this.additional_price-=i):(this.pizza.additional_ingridients[t].is_added=!0,this.additional_price+=i)}}),computed:n()(n()({},Object(d["c"])("products",["openedPizza"])),{},{is_visible:{get(){return this.$store.state.componentState.pizza_choose_visible},set(t){return this.changePizzaChooseVisible(t)}},weight(){return 22===this.pizzaSize?this.pizza.weight:this.pizza.weight_33},total_price(){return this.basePrice+this.additional_price}}),watch:{pizzaSize:function(t){this.basePrice=22===t?this.price_22:this.price_33}}},A=D,H=(e("f4c2"),e("eb85")),L=e("8f8e"),N=e("6a67"),U=e("58a81"),J=Object(z["a"])(A,M,E,!1,null,null,null),R=J.exports;x()(J,"components",{QDialog:$["a"],QCard:h["a"],QToolbar:I["a"],QSpace:Q["a"],QBtn:f["a"],QCardSection:u["a"],QSeparator:H["a"],QCheckbox:L["a"],QBtnToggle:N["a"],QImg:_["a"],QBadge:U["a"],QIcon:g["a"],QSpinnerHourglass:v["a"]});const{getScrollTarget:F,setScrollPosition:G}=c["a"];var K={name:"PageIndex",components:{ItemCard:y,PizzaConstructor:V,Pizza:R},data(){return{current_City:{},tab:0,fullHeight:!1,modal:!1,show_delivery_modal:!1,selectedCategory:1,anim:null,sliderHomeTopOption:{slidesPerView:2,spaceBetween:10,loop:!0,centeredSlides:!0,pagination:{el:".swiper-pagination",dynamicBullets:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},autoplay:{delay:3e3},breakpoints:{320:{centeredSlides:!0,slidesPerView:1,spaceBetween:10,loop:!0},768:{slidesPerView:2,spaceBetween:10,loop:!0,centeredSlides:!0}}}}},async created(){},beforeMount(){this.current_City=this.currentCity;(new Date).toLocaleTimeString();this.show_delivery_modal=!0,console.log(this.current_City.id),2===this.current_City.id&&(this.modal=!0)},updated(){this.$router.currentRoute.hash&&this.$scrollTo(this.$router.currentRoute.hash,200,{offset:-90})},methods:n()(n()({},Object(d["b"])("componentState",["changeConstructorVisible"])),{},{homeTopSliderPrev(){this.homeTopSlider.slidePrev()},homeTopSliderNext(){this.homeTopSlider.slideNext()}}),computed:n()(n()(n()(n()({},Object(d["c"])("products",["categories"])),Object(d["c"])("componentState",["selected_category"])),Object(d["c"])("city",["banners","currentCity"])),{},{homeTopSlider(){return this.$refs.homeTopSlider.$swiper}})},W=K,X=(e("5485"),e("9989")),Y=e("293e"),Z=e("7460"),tt=e("7f67"),it=Object(z["a"])(W,s,a,!1,null,null,null);i["default"]=it.exports;x()(it,"components",{QPage:X["a"],QCard:h["a"],QCardSection:u["a"],QImg:_["a"],QBtn:f["a"],QSkeleton:Y["a"],QCardActions:j["a"],QDialog:$["a"],QTab:Z["a"]}),x()(it,"directives",{ClosePopup:tt["a"]})},"8c3a":function(t,i,e){},b815:function(t,i,e){},bd87:function(t,i,e){},f4c2:function(t,i,e){"use strict";e("8c3a")}}]);