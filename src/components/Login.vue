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
    <div class="container">
      <div class="row">
        <div class="col">
          <div id="login-card">
            <h4>¡Hola de nuevo!</h4>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="username"
                label="Usuario"
                required
                suffix="@loatanconstructora.com"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                required
                :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (hidePassword = !hidePassword)"
                :type="hidePassword ? 'password' : 'text'"
              ></v-text-field>

              <v-btn
                @click="login"
              >
                Login
              </v-btn>
            </v-form>
          </div>
          <br>
          <a id="forgot-pass-link" href="">¿Olvidaste tu contraseña?</a>
        </div>
        <div id="image-container" class="col">
          <div id="login-image"></div>
        </div>
      </div>
    </div>
    <footer>&copy; Loatan Constructora {{ year }}</footer>
  </div>
</template>

<script>
import axios from 'axios';
import MessageCard from './MessageCard.vue'
import constants from '@/constants'

export default {
  name: 'login-component',
  components: {
    MessageCard
  },
  data() {
    return {
      hidePassword: true,
      username: '',
      password: '',
      loginResponse: {},
      valid: false,
      loading: false,
      failedRequest: false,
      cardMessage: '',
      year: new Date().getFullYear()
    }
  },
  methods: {
    async login() {
      const loginUrl = constants.endpoints.dev.login;

      this.loading = true;
      axios.post(loginUrl, {
        session: {
            email: this.username.toString(),
            password: this.password.toString()
        }
      }).then((response) => {
        if(response.status == 200) {
          this.$store.dispatch('authenticateUser', true);
          this.$store.dispatch('saveUserDetails', response.data);
          this.$router.push('/dashboard');
        }
        this.$store.dispatch('authenticateUser', false);
        this.loading = false;
      }).catch((error) => {
        this.failedRequest = true;
        this.loading = false;
        this.cardMessage = error.response.data.errors[0].message;
      });
    }
  }
}
</script>

<style>
#login-background {
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(80,80,80,1) 0%, rgba(255,255,255,1) 100%);
  height: 97vh;
}

#login-image {
  background-image: url('../assets/logo1.png');
  background-size: 400px;
  background-repeat:no-repeat;
  height: 97vh;
  margin-top: 20vh;
  margin-left: 125px;
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