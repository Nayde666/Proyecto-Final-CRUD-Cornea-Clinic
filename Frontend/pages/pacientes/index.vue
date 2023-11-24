<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <pat-register />
        </v-col>
        <v-col cols="12" md="6">
          <vi-patient />
        </v-col>
      </v-row>
    </v-container>
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


