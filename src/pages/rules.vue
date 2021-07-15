<template>

  <q-page class="q-mb-xl" v-html="currentCity.rules_text">


  </q-page>
</template>
<script>
import Map from "components/map";
import {mapGetters} from "vuex";
export default {
  components:{
    Map
  },
  data() {
    return {
    current_City:{}
    };
  },
  mounted() {
    this.current_City = this.currentCity
  },
computed:{
    ...mapGetters('city',['currentCity']),
}

}
</script>

<style lang="sass">

</style>
