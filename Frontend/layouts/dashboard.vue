<template>
  <v-app>
    <vi-drawer-vue />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import viDrawerVue from '~/components/Dashboard/viDrawer.vue';
export default {
  components: {
    viDrawerVue
  },
  data() {
    return {

    }
  }
}
</script>

