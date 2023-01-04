<template>
  <div id="login-background" style="overflow: hidden;">
    <div v-if="loading" class="overlay">
      <div class="spinner-border text-warning spinner" role="status"></div>
    </div>
    <div v-if="failedRequest" class="overlay">
      <MessageCard
        card-title="Ups! algo salió mal"
        card-subtitle=""
        :card-message=cardMessage
        @closeCard="failedRequest = false"
      />
    </div>

    <div v-if="resettedPass" class="overlay">
      <MessageCard
        card-title="¡Listo!"
        card-subtitle="Te hemos enviado tu contraseña al correo que proporcionaste."
        card-message=""
        @closeCard="confirmResettedPass"
      />
    </div>

    <div class="container">
      <div class="row" style="margin-top: 40px;">
        <h1>¿Olvidaste tu contraseña?</h1>
      </div>
      <div class="row" style="margin-top: 20px;">
        <p>¡No te preocupes! Coloca tu correo Loatan en el siguiente campo.</p>
      </div>
      <div class="row">
        <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="username"
                label="Correo Loatan"
                required
              ></v-text-field>

              <v-btn
              style="margin-right: 10px;"
                @click="goToLogin"
                color="error"
              >
                Cancelar
              </v-btn>
              <v-btn
              style="margin-right: 10px;"
                color="teal"
                @click="resetPassword"
              >
                Recuperar contraseña
              </v-btn>
            </v-form>
      </div>
    </div>
    <footer id="forgot-footer">&copy; Loatan Constructora {{ year }}</footer>
  </div>
</template>

<script>
import axios from 'axios';
import MessageCard from './MessageCard.vue'
import constants from '@/constants'

export default {
  components: {
    MessageCard
  },
  data() {
    return {
      username: '',
      loginResponse: {},
      valid: false,
      loading: false,
      failedRequest: false,
      cardMessage: '',
      resettedPass: false,
      year: new Date().getFullYear()
    }
  },
  methods: {
    async resetPassword() {
      const baseUrl = constants.urls[process.env.NODE_ENV];
      const resetPassUrl = baseUrl + constants.endpoints.users.forgotPassword;
      const customConfig = { headers: { 'Content-Type': 'application/json' }};


      this.loading = true;
      axios.post(resetPassUrl, {
        user: {
            email: this.username.toString()
        }
      }, customConfig).then((response) => {
        if(response.status == 200 || response.status == 204) {
          this.resettedPass = true;
        }
        this.loading = false;
      }).catch((error) => {
        this.failedRequest = true;
        this.loading = false;
        this.cardMessage = error.response.data.errors[0].message;
      });
    },
    confirmResettedPass () {
      this.resettedPass = false;
      this.goToLogin();
    },
    goToLogin () {
      this.$router.push('/');
    }
  }
}
</script>

<style>
#forgot-footer {
  position: fixed;
  bottom: 0;
  margin: auto;
  width: 100%;
}

#login-background {
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(80,80,80,1) 0%, rgba(255,255,255,1) 100%);
  height: 97vh;
}

#forgot-image {
  background-image: url('../assets/logo1.png');
  background-size: 500px;
  background-repeat:no-repeat;
  height: 40vh;
  margin-top: 0vh;
  margin: auto;
  width: 50%;
  padding: 10px;
}

#login-card {
  margin-top: 23vh;
  overflow:auto;
  padding: 60px;
  border: solid rgba(158, 139, 107, 1) 2px;
  border-radius: 20px;
  background-color: rgba(255,255,255,0.1);
}

#login-form {
  padding: 20px;
  max-width: 40%;
  margin-left: auto;
  margin-right: auto;
  height: 220px;
  border-radius: 15px;
  border: solid rgb(158, 139, 107);
  background-color: rgba(255, 255, 255, 0.1);
}

#login-button {
  margin: auto, 0;
  height: 30px;
  width: 100px;
}

#forgot-pass-link {
  color:rgba(255, 255, 255, 0.7);
}

.input-label {
  margin-top: 30px;
  float: left;
}

.input-field {
  float: left;
  width: 100%;
  height: 4vh;
  margin-top: 0px;
}

.input-field:focus {
  outline: none;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2;
}

.spinner {
  position: fixed;
  top: 50%;
  right: 50%;
}
</style>