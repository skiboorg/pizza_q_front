//import Vue from 'vue'
import VueYandexMetrika from 'vue-yandex-metrika'


export default async ({ app, router, Vue, store, ssrContext }) => {
  Vue.use(VueYandexMetrika, {
    id: '75118636',
        clickmap:true,
        trackLinks:true,
        router:router,
        accurateTrackBounce:true,
        webvisor:true,
        env: 'production',
        ecommerce:"dataLayer"
})
}
