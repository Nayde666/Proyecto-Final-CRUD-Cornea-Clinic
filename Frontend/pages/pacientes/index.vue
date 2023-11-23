<template>
    <div class="ma-5">
        <v-row>
        <v-col cols="6">
            <pat-register />
        </v-col>
        <v-col cols="6">
            <vi-patient/>
        </v-col>
    </v-row>
    </div>
</template>

<script>
import patRegister from '~/components/Users/patRegister.vue';
import ViPatient from '~/components/Users/ViPatient.vue';
export default {
    layout: 'pacientes',
    components: {
        patRegister, 
        ViPatient
       
    }
}
</script>

