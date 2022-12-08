<template>
  <div id="projects-content" data-app>
    <h1 class="page-title">Colaboradores</h1>

    <div id="slideout-container">
      <div id="project-slideout" class="sidenav">
        <div id="slideout-header">
          <h4 class="page-title">Nuevo Colaborador Loatan</h4>
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
      :items="employees"
      item-key="name"
      class="elevation-1"
      :search="search"
      :loading=loadingData
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
                <span>Agregar nuevo colaborador</span>
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
          @click="editEmployee(item)"
        >
          Ver detalles
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import constants from '@/constants';
import NewEmployeePage from './NewEmployeePage.vue'
import EditEmployeeStore from '@/store/EditEmployeeStore';
import NewEmployeeStore from '@/store/NewEmployeeStore';

export default Vue.extend({
  beforeMount () {
    this.loadingData = true;
    const baseUrl = constants.urls[process.env.NODE_ENV];
    axios.get(baseUrl + constants.endpoints.users.getEmployees)
      .then(response =>{
        let employees = response.data;

        employees.forEach((e) => {
          this.employees.push({
            id: e.employee.employee_id,
            name: e.employee.personal_info.names + ' ' + e.employee.personal_info.paternal_surname,
            workGroup: e.employee.work_area.area,
            actions: {}
          });
        });

        this.loadingData = false;
      })
      .catch(error => {
        console.log(error);
        this.loadingData = false;
      });

  },
  components: {
    NewEmployeePage
  },
  data () {
    return {
      country: '',
      region: '',
      search: '',
      calories: '',
      slideoutComponent: 'NewEmployeePage',
      loadingData: false,
      employees: []
    }
  },
  computed: {
    headers () {
      return [
        { text: 'ID', align: 'center', value: 'id' },
        { text: 'Nombre', align: 'center', value: 'name' },
        { text: 'Grupo de trabajo', value: 'workGroup', align: 'center' },
        { text: 'Acciones', value: 'actions', align: 'center' },
      ]
    },
  },
  methods: {
    editEmployee (item) {
      EditEmployeeStore.id = item.id;
      this.$router.push('/editEmployee');
    },
    openNav () {
      document.getElementById("project-slideout").style.width = '60%';
      document.getElementById("slideout-container").style.width = '100%';
    },
    closeNav () {
      document.getElementById("project-slideout").style.width = '0%';
      document.getElementById("slideout-container").style.width = '0%';
    },
    submitInfo () {
      let payload = NewEmployeeStore;
      const baseUrl = constants.urls[process.env.NODE_ENV];
      const listEmployeesUrl = baseUrl + constants.endpoints.users.getEmployees;
      const newEmployeeUrl = baseUrl + constants.endpoints.users.createEmployee;

      axios.post(newEmployeeUrl, payload)
        .then(response => {
          if(response.status == 200) {
            // TODO: mostrar message card con mensaje exitoso
            console.log(response);
            axios.get(listEmployeesUrl)
              .then(response => {
                let employees = response.data;

                employees.forEach((e) => {
                  this.employees.push({
                    id: e.employee.employee_id,
                    name: e.employee.personal_info.full_name,
                    workGroup: e.employee.work_area.area,
                    actions: {}
                  });
                });

                this.loadingData = false;
              });
            this.closeNav();
          }
        })
        .catch(error => {
          console.log(error);
            // TODO: mostrar message card con mensaje fallido
        });
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