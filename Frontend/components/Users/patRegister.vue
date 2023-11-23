<template >
    <div class="contenedor" style="margin:20px" >
        <v-container>
            <v-form ref="frmRegistro" v-model="frmRegistro">
                <v-row style="width: 100%;">
                    <v-col cols="12" style="text-align: center;">
                        <p class="formTit">Add new patient</p>
                    </v-col>
                </v-row>
                <v-row align="center" >
                    <v-col>
                        <p>First name: </p>
                        <input type="text" class="cajas" v-model="name" placeholder="Name">
                    </v-col>
                    <v-col>
                        <p>Lastname </p>
                        <input type="text" class="cajas" v-model="lastname" >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <p>Email: </p>
                        <input type="email" class="cajas" v-model="email"> 
                    </v-col>
                    <v-col>
                        <p>Mobile </p>
                        <input type="text" class="cajas" v-model="phone" >
                    </v-col>
                </v-row>
                <v-row align="center" >
                    <v-col cols="4">
                        <p>Date of birth </p>
                        <input type="date" class="cajasB" v-model="birthday">
                    </v-col>
                    <v-col cols="4">
                        <p>Age </p>
                        <input type="number" class="cajasC" v-model="age">  
                    </v-col>
                    <v-col cols="4">
                        <p>Gender</p>
                        <v-radio-group  v-model="gender" row>
                            <v-radio
                                label="Male"
                                value="Male"
                            ></v-radio>
                            <v-radio
                                label="Female"
                                value="Female"
                            ></v-radio>
                            <v-radio
                                label="Other"
                                value="Other"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row align="center" >
                    <v-col>
                        <p> Address </p>
                        <input type="text" class="cajasA" v-model="address">
                    </v-col>
                </v-row>
                <v-row align="center" >
                    <v-col>
                        <p>Treatment </p>
                        <input type="text" class="cajasP" v-model="treatment">
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col>
                        <p>Blood Type: </p>
                        <input type="text" class="cajas" v-model="blood">
                    </v-col>
                </v-row>
                <v-row>
                    <v-btn id="btnPatients" @click="registraPacientes"> 
                        <p >Add patients</p>
                    </v-btn>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<style>
.p {
    font-family: Open;
    font-size: 14px; 
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0.28px;
    color: #000;
    margin-bottom: 25px;
}
.formTit {
    font-family: Open;
    font-size: 20px; 
    font-style: normal;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0.4px;
    color: #000;
    justify-content: center;
}

.radio {
    color: #000;
    width: 20px;
    height: 20px;
    fill:var(--text-white, #FFF); 
    stroke-width: 1px;
    stroke: var(--primary-green, #4fb783);
}

.cajas{
    width: 400px;
    height: 50px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
.cajasA{
    width: 870px;
    height: 96px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
.cajasP{
    width: 870px;
    height: 70px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
.cajasB{
    width: 185px;
    height: 40px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
.cajasC{
    width: 120px;
    height: 40px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
#btnPatients {
    align-content: center;
    border-radius: 15px;
    background: var(--primary-green, #4fb783);
    width: 870px;
    height: 60px; 
    flex-shrink: 0; 
}
.contenedor{
    width: 1011px;
    height: 897px;
    border: 1px solid #000;
    padding: 70px;
}
.titulo{
    width: 1200px;
    height: 1100px;
    border-radius: 15px;
    background: var(--gray-whte, #FFF);
    padding: 70px;
    border: 1px solid #000;
}
</style>


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
                    this.name = '',
                    this.lastname= '', 
                    this.email='', 
                    this.phone='', 
                    this.birthday='', 
                    this.age='', 
                    this.gender='', 
                    this.address='',
                    this.treatment='', 
                    this.blood='',
                    this.$store.commit('setNewPatient', true)
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

