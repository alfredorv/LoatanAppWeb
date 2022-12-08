<template>
  <div id="projects-content" data-app>
    <h1 class="page-title">Proyectos</h1>

    <div id="slideout-container">
      <div id="project-slideout" class="sidenav">
        <div id="slideout-header">
          <h4 class="page-title">Nuevo Proyecto Loatan</h4>
        </div>
        <div id="slideout-content">
          <component :is="slideoutComponent"  @cancel="closeNav"/>
        </div>
        <div id="slideout-footer" style="position: sticky; bottom: 0">
          <div class="sidenav-footer">
            <div class="sidenav-footer-options">
              <v-btn
              class="ma-1"
              color="error"
              @click="closeNav"
              >
                Cancelar
              </v-btn>

              <v-btn
                class="ma-1"
                color="teal"
                @click="submitInfo"
                >
                Guardar
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="projects"
      item-key="name"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-container>
          <v-row>
            <v-col cols="10">
              <v-text-field
                v-model="search"
                label="Búsqueda"
                class="mx-4"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="1"
                    fab
                    large
                    v-bind="attrs"
                    v-on="on"
                    @click="openNav"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Crear nuevo proyecto</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          class="ma-1"
          color="teal"
          plain
          @click="editProject(item)"
        >
          Ver detalles
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Vue from 'vue'
import NewProjectPage from './NewProjectPage.vue'
import NewProjectStore from '@/store/NewProjectStore';
import EditProjectStore from '@/store/EditProjectStore';
import constants from '@/constants';
import axios from 'axios';

export default Vue.extend({
  components: {
    NewProjectPage
  },
  beforeMount () {
    const listProjectsUrl = constants.endpoints.dev.projects.getProjects;

    axios.get(listProjectsUrl)
      .then(response => {
        if(response.status == 200) {
          let projects = response.data;

          projects.forEach(p => {
            this.projects.push({
              id: p.project.id,
              name: p.project.name,
              location: p.project.location.state,
              city: p.project.location.city,
              state: p.project.location.state,
              client: p.project.customer.name,
              status: constants.project.status[p.project.status],
              actions: {}
            });
          });

          this.closeNav();
        }
      })
      .catch(error => {
        console.log(error);
          // TODO: mostrar message card con mensaje fallido
      });
  },
  data () {
    return {
      country: '',
      region: '',
      search: '',
      slideoutComponent: 'NewProjectPage',
      rules: [
        value => {
          if(!value) return 'Campo requerido.';
          return true;
        }
      ],
      projects: [],
    }
  },
  computed: {
    headers () {
      return [
        { text: 'ID', value: 'id', align: 'center' },
        { text: 'Proyecto', value: 'name' },
        { text: 'Ubicación', value: 'location' },
        { text: 'Ciudad', value: 'city', align: 'center' },
        { text: 'Cliente', value: 'client', align: 'center' },
        { text: 'Status', value: 'status', align: 'center' },
        {
          text: 'No. Contrato',
          align: 'center',
          value: 'contract'
        },
        { text: 'Acciones', value: 'actions', align: 'center' },
      ]
    },
  },
  methods: {
    openNav () {
      document.getElementById("project-slideout").style.width = '60%';
      document.getElementById("slideout-container").style.width = '100%';
    },
    closeNav () {
      document.getElementById("project-slideout").style.width = '0%';
      document.getElementById("slideout-container").style.width = '0%';
    },
    submitInfo () {
      const payload = JSON.stringify(NewProjectStore);
      const newProjectUrl = constants.endpoints.dev.projects.createProject;
      const listProjectsUrl = constants.endpoints.dev.projects.getProjects;
      const customConfig = { headers: { 'Content-Type': 'application/json' }};

      axios.post(newProjectUrl, payload, customConfig)
        .then(response => {
          if(response.status == 200) {
            // TODO: mostrar message card con mensaje exitoso
            console.log(response);
            this.projects = [];
            axios.get(listProjectsUrl)
              .then(response => {
                if(response.status == 200) {
                  let projects = response.data;

                  projects.forEach(p => {
                    this.projects.push({
                      id: p.project.id,
                      name: p.project.name,
                      location: p.project.location.state,
                      city: p.project.location.city,
                      state: p.project.location.state,
                      client: p.project.customer.name,
                      status: constants.project.status[p.project.status],
                      actions: {}
                    });
                  });

                  this.closeNav();
                }
              });

            this.closeNav();
          }
        })
        .catch(error => {
          console.log(error);
            // TODO: mostrar message card con mensaje fallido
        });
    },
    editProject (item) {
      EditProjectStore.id = item.id;
      this.$router.push('editProject')
    }
  },
})
</script>

<style>
.page-title {
  margin-bottom: 50px;
}

td {
  font-size: 0.7rem !important;
}

#slideout-container {
  position: fixed; /* Sit on top of the page content */
  display: block; /* Hidden by default */
  width: 0%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 1;
  transition: 0.5s;
}

.sidenav {
  height: 100%;
  width: 0%;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  background-color: rgb(211, 211, 211);
  overflow-y: scroll;
  overflow-x: hidden;
  transition: 0.5s;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: rgb(188, 169, 127) !important;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav-footer {
  background-color: white;
  width: 100%;
  height: 60px;
  padding: 7px;
}

.sidenav-footer-options {
  position: absolute;
  left: 10px;
}
</style>