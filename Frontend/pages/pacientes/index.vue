<script>
import patRegister from '~/components/Users/patRegister.vue';
import PatRegister from '../../components/Users/patRegister.vue';
export default {
    layout: 'pacientes',
    components: {
        patRegister
       
    }
}
</script>

<template>
    <div class="ma-5">
        <v-row>
            <v-col cols="5">
                <pat-register />
            </v-col>
        </v-row>
    </div>
   
</template>