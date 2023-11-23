<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      isValid: false,
      rules: {
        vacio: value => !!value || 'Campo requerído',
        cantidad: value => value.length >= 5 || 'Mínimo 5 caractéres'
      }
    };
  },
  methods: {
    Login () {
      const valid = this.$refs.formLogin.validate() 
      if(valid) {
        //ruta hacia pagina
        this.$router.push('')
      } 
      else {
        //alerta 
        alert('Datos incorrectos')
      }
    }
  }
}
</script>

<template>
    <v-app >
       <v-main class="hero">
          <v-container fluid fill-height>
             <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                   <v-card class="elevation-12">
                      <v-toolbar dark color="#4FB783">
                        <v-toolbar-title class="text-h3 text-center font-weight-bold">Iniciar Sesión</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                      <v-form v-model="isValid" ref="formLogin">
                             <v-text-field
                               v-model="username"
                               name="username"
                               label="Username"
                               type="text"
                               placeholder="Escribe tu correo electrónico"
                               required
                               :rules="[rules.vacio]"
                            ></v-text-field>
                            
                             <v-text-field
                               v-model="password"
                               name="password"
                               label="Password"
                               type="password"
                               placeholder="Escribe tu contraseña"
                               required
                               :rules="[rules.cantidad]"
                            ></v-text-field>
                      </v-form>
                      <v-card-actions>
                        <v-btn color="green" @click="Login">Login</v-btn>
                      </v-card-actions>
                      </v-card-text>
                   </v-card>
                </v-flex>
             </v-layout>
          </v-container>
       </v-main>
    </v-app>
 </template>

<style scoped>
.hero {
  background: url(../../assets/img/clinica.png) no-repeat center fixed !important;
  background-size: cover;
}
</style>