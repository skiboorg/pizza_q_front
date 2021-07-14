<template>
  <q-page class="q-mb-xl">
    <div class="container">
      <h1 class="text-h3 f-raleway-900">Акции</h1>
      <div class="products-grid">
            <q-card v-for="promo in promotions" :key="promo.id">
      <img :src="promo.image">
      <q-card-section>
        <div class="text-h6">{{promo.name}}</div>

      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ promo.text }}
      </q-card-section>
              <q-card-actions>
                <q-btn @click="$router.push(`/#catID_${promo.category}`)" color="primary" label="Перейти" icon="link"/>
              </q-card-actions>
    </q-card>
      </div>
    </div>

  </q-page>

</template>

<script>
export default {
   data() {
    return {
    promotions:[]
    };
  },
  async beforeMount() {
     const responce =  await this.$api.get(`/api/promotion/get_all?city_id=${this.$q.cookies.get('city_id')}`)
    this.promotions = responce.data
  },

}
</script>
