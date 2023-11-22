<template>
  <v-row>
  <v-data-table
      :headers="headers"
      :items="patient"
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
                  color="orange darken-1"
                  icon 
                  @click="editPatients(item)"
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

      <v-card-text>
          <v-form ref="frmRegistro" v-model="frmRegistro">
              <v-row align="center">
                  <label for="">Name:</label>
                  <v-text-field 
                      class="ml-3"
                      type="text"
                      v-model="editPatients.name"
                      placeholder="Name"
                      :rules="[reglas.requerido]"
                  />
              </v-row>
              <v-row align="center">
                  <label for="">Lastname</label>
                  <v-text-field 
                      class="ml-3"
                      type="text"
                      v-model="editPatients.lastname"
                      placeholder="Lastname"
                      :rules="[reglas.requerido]"
                  />
              </v-row>
              <v-row align="center" style="display: none;">
                  <label for="">Email:</label>
                  <v-text-field 
                      class="ml-3"
                      type="email"
                      v-model="editPatients.email"
                      placeholder="Email"
                      :rules="[reglas.requerido]"
                  />
                </v-row>
                  <v-row align="center">
                  <label for="">Birthday:</label>
                  <v-text-field 
                      class="ml-3"
                      type="date"
                      v-model="editPatients.birthday"
                      placeholder="Birthday"
                  />
              </v-row>
                  <v-row align="center">
                  <label for="">Age:</label>
                  <v-text-field 
                      class="ml-3"
                      type="number"
                      v-model="editPatients.age"
                      placeholder="Age"
                  />
              </v-row>
              <v-row align="center">
                  <label for="">Gender:</label>
                  <v-text-field 
                      class="ml-3"
                      type="text"
                      v-model="editPatients.gender"
                      placeholder="Gender"
                  />
              </v-row>
              <v-row align="center">
                  <label for="">Address:</label>
                  <v-text-field 
                      class="ml-3"
                      type="text"
                      v-model="editPatients.address"
                      placeholder="Address"
                  />
              </v-row>
              <v-row align="center">
                  <label for="">Treatment:</label>
                  <v-text-field 
                      class="ml-3"
                      type="text"
                      v-model="editPatients.treatment"
                      placeholder="Treatment"
                  />
              </v-row>
          </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          text
          @click="dialogEdit = false"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="editar()"
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
          @click="dialog = false"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="borrar()"
        >
          Borrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </v-row>
</template>



<script>
export default {
  data() {
      return{
          headers: [
              { text: 'Name', align: 'center', sortable: true, value: 'name'}, 
              { text: 'Lastname', align: 'center', sortable: true, value: 'lastname'},
              { text: 'Email', align: 'center', sortable: true, value: 'email'},
              { text: 'Phone', align: 'center', sortable: false, value: 'phone'},
              { text: 'Birthday', align: 'center', sortable: true, value: 'birthday'},
              { text: 'Age', align: 'center', sortable: true, value: 'age'},
              { text: 'Gender', align: 'center', sortable: true, value: 'gender'},
              { text: 'Address', align: 'center', sortable: true, value: 'address'},
              { text: 'Treatment', align: 'center', sortable: true, value: 'treatment'},
              { text: 'Blood', align: 'center', sortable: true, value: 'blood'},
              { text: 'Acciones', align: 'center', sortable: false, value: 'Acciones'}
          ], 
          usuarios: [], 
          dialog: false, 
          email: null,
          editPatients: {}, 
          dialogEdit: false,
          reglas: {
              requerido: value => !!value || 'Campo Requerido', 
              cantidad: value => value.length > 8 || 'Minimo 9 caracteres', 
              verifica: value => value === this.password || 'La contraseña no coincide '
          }, 
          frmRegistro: false
      }
  }, 
  watch: {
      newUser() {
          if(this.newUser){
              this.usuarios = []
              this.loadUsers()
              this.$store.commit('setNewUser', false)
          }
      }
  }, 
  computed: {
      newUser () {
          return this.$store.state.newUser
      }
  },
  mounted () {
      this.loadUsers()
  },
  methods: {
      async loadUsers () {
          const paciente = await fetch('http://localhost:5000/get-users')
          const data = await paciente.json()
          if (data.alert === 'success'){
              this.usuarios = data.usuarios
          }
          console.log('@@usuarios =>', usuarios, data)
      }, 
      deleteUser (email)  {
          this.email = email
          this.dialog = true 
      }, 
      async borrar() {
          const sendData = {
              email: this.email
          } 
          const rawResponse = await fetch('http://localhost:5000/delete-user',{
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
      editUser (user) {
          console.log('@@@ user =>', user)
          this.editUserData.nombre = user.nombre
          this.editUserData.apaterno = user.apaterno
          this.editUserData.amaterno = user.amaterno
          this.editUserData.telefono= user.telefono
          this.editUserData.email = user.email
          this.editUserData.password = user.password
          this.dialogEdit = true
      }, 
      async editar () {
          const valid = this.$refs.frmRegistro.validate()
          if (valid) {
              console.log('@@@ editUserData', this.editUserData)
              const rawResponse = await fetch('http://localhost:5000/edit-user',{
                  method: 'POST', 
                  headers: {
                      'Accept': 'application/json', 
                      'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify(this.editUserData)
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