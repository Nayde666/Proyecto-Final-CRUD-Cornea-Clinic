<script>
   import draweVue from '~/components/Dashboard/drawe.vue';
   export default {
    components: {
        draweVue
    }, data () {
        return {

        }
    }
}
</script>

<template>
    <v-app>
        <draweVue/>
            <v-main>
                <Nuxt />
            </v-main> 
    </v-app>
</template>

<style scoped>

</style>