<template>
    
  <v-row>
  <v-data-table
      :headers="headers"
      :items="patients"
      elevation="2"
  >
  <template #[`item.Acciones`]="{ item }">
      <v-tooltip top>
          <template v-slot:activator="{on, attrs}">
              <v-btn
                  color="red"
                  icon 
                  @click="deletePatients(item.email)"
                  v-bind="attrs"
                  v-on="on"
              >
              <v-icon>mdi-account-minus</v-icon>
              </v-btn>
          </template>
          <span>
              Eliminar el paciente{{ item.name }}
          </span>
      </v-tooltip>

      <v-tooltip top>
          <template v-slot:activator="{on, attrs}">
              <v-btn
                  color="#3e68ff"
                  icon 
                  @click="$event => editPatients(item)"
                  v-bind="attrs"
                  v-on="on"
              >
              <v-icon>mdi-account-edit</v-icon>
              </v-btn>
          </template>
          <span>
              Editar el pacientes {{ item.name }}
          </span>
      </v-tooltip>
  </template> 

  </v-data-table>
  <v-dialog
    v-model="dialogEdit"
    max-width="600"
  >
    <v-card>
      <v-card-title class="text-h5">
        Editar Pacientes
      </v-card-title>

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
                        <input type="text" class="cajas" v-model="editPatientsData.name">
                    </v-col>
                    <v-col>
                        <p>Lastname </p>
                        <input type="text" class="cajas" v-model="editPatientsData.lastname" >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <p>Email: </p>
                        <input type="email" class="cajas" v-model="editPatientsData.email"> 
                    </v-col>
                    <v-col>
                        <p>Mobile </p>
                        <input type="text" class="cajas" v-model="editPatientsData.phone" >
                    </v-col>
                </v-row>
                <v-row align="center" >
                    <v-col cols="4">
                        <p>Date of birth </p>
                        <input type="date" class="cajasB" v-model="editPatientsData.birthday">
                    </v-col>
                    <v-col cols="4">
                        <p>Age </p>
                        <input type="number" class="cajasC" v-model="editPatientsData.age">  
                    </v-col>
                    <v-col cols="4">
                        <p>Gender</p>
                        <v-radio-group  v-model="editPatientsData.gender" row>
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
                        <input type="text" class="cajasA" v-model="editPatientsData.address">
                    </v-col>
                </v-row>
                <v-row align="center" >
                    <v-col>
                        <p>Treatment </p>
                        <input type="text" class="cajasP" v-model="editPatientsData.treatment">
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col>
                        <p>Blood Type: </p>
                        <input type="text" class="cajas" v-model="editPatientsData.blood">
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          text
          @click="$event => dialogEdit = false"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="#3e68ff"
          text
          @click="$event => editar()"
        >
          Editar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialog"
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Borrar Pacientes
      </v-card-title>

      <v-card-text>
        ¿Estás seguro que quieres editar el paciente?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          text
          @click="$event => dialog = false"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="$event => borrar()"
        >
          Borrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </v-row>
</template>

<style>
.contenedor{
    width: 1011px;
    height: 897px;
    border: 1px solid #000;
    padding: 70px;
}
.formularioT {
    font-family: Open;
    font-size: 16px; 
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.32px;
    color: #000;
    text-align: center;
}
</style>

<script>
export default {
  data() {
      return{
          headers: [
              { text: 'Name', align: 'center', sortable: true, value: 'name'}, 
              { text: 'Mobile', align: 'center', sortable: false, value: 'phone'},
              { text: 'Email', align: 'center', sortable: true, value: 'email'},
              { text: 'Age', align: 'center', sortable: true, value: 'age'},
              { text: 'Treatment', align: 'center', sortable: true, value: 'treatment'},
              { text: 'Acciones', align: 'center', sortable: false, value: 'Acciones'}
          ], 
          patients: [], 
          dialog: false, 
          email: null,
          editPatientsData: {}, 
          dialogEdit: false,
          reglas: {
              requerido: value => !!value || 'Campo Requerido', 
          }, 
          frmRegistro: false
      }
  }, 
  watch: {
      newPatient() {
          if(this.newPatient){
              this.patients = []
              this.loadUsers()
              this.$store.commit('setNewPatient', false)
          }
      }
  }, 
  computed: {
      newPatient () {
          return this.$store.state.newPatient
      }
  },
  mounted () {
      this.loadUsers()
  },
  methods: {
      async loadUsers () {
          const patients = await fetch('http://localhost:5000/get-patients')
          const data = await patients.json()
          if (data.alert === 'success'){
              this.patients = data.patients
          }
          console.log('@@patients =>', patients, data)
      }, 
      deletePatients (email)  {
          this.email = email
          this.dialog = true 
      }, 
      async borrar() {
          const sendData = {
              email: this.email
          } 
          const rawResponse = await fetch('http://localhost:5000/delete-patients', {
                  method: 'POST', 
                  headers: {
                      'Accept': 'application/json', 
                      'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify(sendData)
          })
          const res = await rawResponse.json()
          if( res.alert === 'success') {
              this.loadUsers()
          } 
          this.dialog = false
         // console.log('@@@ respuesta => ', rawResponse)
      }, 
      editPatients (user) {
          console.log('@@@ patient=>', user)

          this.editPatientsData.name = user.name
          this.editPatientsData.lastname = user.lastname
          this.editPatientsData.email = user.email
          this.editPatientsData.phone= user.phone
          this.editPatientsData.birthday= user.birthday
          this.editPatientsData.age = user.age
          this.editPatientsData.gender = user.gender
          this.editPatientsData.address = user.address
          this.editPatientsData.treatment = user.treatment
          this.editPatientsData.blood = user.blood
          this.dialogEdit = true
      }, 
      async editar () {
          const valid = this.$refs.frmRegistro.validate()
          if (valid) {
              console.log('@@@ editPatientsData', this.editPatientsData)
              const rawResponse = await fetch('http://localhost:5000/edit-patient',{
                  method: 'POST', 
                  headers: {
                      'Accept': 'application/json', 
                      'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify(this.editPatientsData)
          })
          const res = await rawResponse.json()
          this.loadUsers()
          console.log('res =>', res)
          }
          this.dialogEdit = false
        }
    }
}
</script>