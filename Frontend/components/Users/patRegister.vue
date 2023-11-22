    <template>
        <v-form ref="frmRegistro" v-model="frmRegistro">
            <v-row align="center" class="text-2">
                    Add new patient 
            </v-row>
            <v-row align="center">
                <label for="">First name:</label>
                <v-text-field
                class="ml-3"
                type="text"
                v-model="name"
                placeholder="Name"
                :rules="[reglas.requerido]"
                />
        </v-row>
        </v-form>
    </template>


<script>
export default {
    data() {
        return{
            frmRegistro: false, 
            name: '',
            lastname: '', 
            email: '', 
            phone:'', 
            birthday: '', 
            age: '', 
            gender: '', 
            address: '',
            treatment: '', 
            blood: '', 
            reglas: {
                requerido: value => !!value || 'Campo Requerido'
            }

        }
    }, 
    methods: {
        async registraPacientes () {
            this.frmRegistro = this.$refs.frmRegistro.validate()

            if (this.frmRegistro) {
                //Registramos usuario 
                name, lastname, email, phone, birthday, age, gender, address, treatment, blood
                const sendData = {
                    name: this.name,
                    lastname: this.lastname, 
                    email: this.email, 
                    phone: this.phone, 
                    birthday: this.birthday, 
                    age: this.age, 
                    gender: this.gender, 
                    address: this.address,
                    treatment: this.treatment, 
                    blood: this.blood
                }

                const rawResponse = await fetch('http://localhost:5000/new-patient',{
                    method: 'POST', 
                    headers: {
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify(sendData)
                })
                const content = await rawResponse.json()
                if (content.alert === 'success'){
                    this.name,
                    this.lastname, 
                    this.email, 
                    this.phone, 
                    this.birthday, 
                    this.age, 
                    this.gender, 
                    this.address,
                    this.treatment, 
                    this.blood
                    this.$store.commit('setNewUser', true)
                } else if (content.alert === 'The patient already exists') {
                    //Crear alerta cuando existe. 
                }
                console.log('@@ response => ', content)
            } else {
                //No tificaciones de Error 
            }
        }
    }
}
</script>