<template>
  <div>
    <div v-if="failedRequest" class="overlay">
      <MessageCard
        card-title="Ups! algo salió mal"
        card-subtitle=""
        :card-message=cardMessage
        @closeCard="failedRequest = false"
      />
    </div>

    <v-navigation-drawer
      permanent
      class="nav-drawer"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-img src="./../assets/logo1.png"></v-img>
        </v-list-item>

        <v-list-item link @click="changeMainContent('ProjectsPage')">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Proyectos
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="changeMainContent('ClientsPage')">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Clientes
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="changeMainContent('EmployeesPage')">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Colaboradores
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
          block
          @click="logout"
          >
            Cerrar Sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from 'axios';
import MessageCard from './MessageCard.vue'
import constants from './../constants'

export default {
  name: 'NavMenu',
  components: {
    MessageCard
  },
  data () {
    return {
      failedRequest: false,
      cardMessage: ''
    }
  },
  methods: {
    changeMainContent(content) {
      this.$emit('selected-content', content);
    },
    logout () {
      const logoutUrl = constants.endpoints.dev.logout;

      if(sessionStorage.loatanAppUserDetails) {
        var sessionStorageUserDetails = JSON.parse(sessionStorage.getItem('loatanAppUserDetails'));
        var sessionId = sessionStorageUserDetails.user.session_id;
      }
      this.loading = true;
      axios.post(logoutUrl, {
        session: {
            id: sessionId
        }
      }).then((response) => {
        if(response.status == 200 || response.status == 204) {
          this.$store.dispatch('saveUserDetails', {});
          this.$router.push('/');
        }
        this.$store.dispatch('authenticateUser', false);
        this.loading = false;
      }).catch((error) => {
        this.failedRequest = true;
        this.loading = false;
        this.cardMessage = error.response.data.errors[0].message;
      });
    }
  },
}
</script>

<style>
.nav-drawer {
  background-color: transparent !important;
}

.nav-menu {
  height: 60vh;
}
.nav-menu-title {
  margin: 40px 0px;
}

.menu-option {
  color: rgb(19, 19, 19);
  margin: 20px 0px;
  text-decoration: none;
}

.nav-menu-divider {
  border-right: solid 2px rgba(178, 159, 127, 1);
}

#nav-image {
  background-image: url('../assets/logo1.png');
  background-size: 150px;
  background-repeat:no-repeat;
  height: 150px;
  margin-top: 10vh;
  margin-left: 10px;
}
</style>