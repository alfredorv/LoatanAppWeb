<template>
  <div id="edit-project-background">

  <!--------------- Message Card --------------------------->
  <div v-if="deletingProject" class="overlay">
    <DialogCard
      card-title="Borrar Proyecto"
      card-subtitle="¡Atención! Esto borrará el proyecto permanentemente."
      confirm-text="Eliminar Proyecto"
      card-message=""
      @closeCard="deleteProject"
    />
  </div>

  <div v-if="editedProject" class="overlay">
    <MessageCard
      card-title="¡Listo!"
      card-subtitle="Proyecto editado correctamente."
      card-message=""
      @closeCard="editedProject = false"
    />
  </div>

  <div v-if="errorEditingProject" class="overlay">
      <MessageCard
        card-title="¡Ups!"
        card-subtitle="Algo salió mal. Intentalo más tarde."
        card-message=""
        @closeCard="errorEditingProject = false"
      />
    </div>

    <!--------------- Upload File Card --------------------------->
    <div v-if="showUploadFile" class="overlay">
      <UploadIFCCard
        card-title="Cargar Archivo"
        card-subtitle=''
        card-message="Selecciona un archivo para subirlo al sistema."
        @closeCard="showUploadFile = false"
        acceptedFileTypes=".ifc,.pdf"
      />
    </div>

    <div v-if="deletingIFC" class="overlay">
      <DialogCard
        card-title="Borrar IFC"
        card-subtitle="¡Atención! Esto borrará el IFC permanentemente."
        confirm-text="Eliminar IFC"
        card-message=""
        @closeCard="deleteIFCfile"
      />
    </div>

    <v-form>
      <v-container>
        <v-row>
          <h3 class="page-title">Editar Proyecto Loatan</h3>
        </v-row>

        <!---------------------------- Sección Info general ------------------------------>
        <br><br>

          <v-row>
            <div class="section-subtitle">
              <h5>Información general</h5>
            </div>
          </v-row>

        <div class="generic-card">
          <div class="generic-card-content">
            <!-- Datos generales del proyecto -->
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model=projectName
                  label="Nombre del proyecto"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model=projectCustomer
                  :items="customers"
                  item-text="name"
                  item-value="client_id"
                  label="Cliente"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model=projectManager
                  :items="managers"
                  item-text="employee.personal_info.names"
                  item-value="employee.employee_id"
                  label="Gerente"
                  solo
                ></v-select>
              </v-col>
            </v-row>

            <!-- Ubicación del proyecto -->
            <v-row>
              <v-col cols="4">
                <v-select
                  v-model=projectState
                  :items="states"
                  label="Estado"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model=projectCity
                  label="Ciudad"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model=projectNeighborhood
                  label="Colonia"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model=projectZipCode
                  label="Código postal"
                  :rules="rules"
                  hide-details="auto"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model=street
                  label="Calle"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model=exteriorNumber
                  label="Número exterior"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model=interiorNumber
                  label="Número interior"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model=projectLatitude
                  label="Latitud"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model=projectLongitude
                  label="Longitud"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <a href="https://www.google.com/maps" target="_blank" class="link-small" style="color: dodgerblue !important;">Google Maps <v-icon class="link-small" style="color: dodgerblue !important;">mdi-open-in-new</v-icon></a>
              </v-col>
            </v-row>
          </div>
        </div>

        <!-- Fechas del proyecto -->
        <br><br>
        <v-row>
          <div class="section-subtitle">
            <h5>Duración del proyecto</h5>
          </div>
        </v-row>
        <div class="generic-card">
          <div class="generic-card-content">
            <v-row>
              <v-col cols="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="Fecha de inicio"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  :active-picker.sync="activePicker"
                  :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                  color="rgb(188, 169, 127)"
                  @change="save"
                ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="endDate"
                      label="Fecha de finalización"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    :active-picker.sync="activePicker2"
                    :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    color="rgb(188, 169, 127)"
                    @change="save2"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
        </div>

        <!------------------------------ Sección costos ------------------------------>
        <br><br>
        <v-row>
          <div class="section-subtitle">
            <h5>Costos</h5>
          </div>
        </v-row>

        <!-- Costos -->
        <div class="generic-card">
          <div class="generic-card-content">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model=hiredCost
                  label="$ Contratado"
                  :rules="rules"
                  hide-details="auto"
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-model=indirectCost
                  label="$ Indirecto"
                  :rules="rules"
                  hide-details="auto"
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-model=directCost
                  label="$ Directo"
                  :rules="rules"
                  hide-details="auto"
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-model=utility
                  label="$ Utilidad"
                  :rules="rules"
                  hide-details="auto"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model=financed
                  label="Financiamiento"
                  color="rgb(188, 169, 127)"
                ></v-checkbox>

                <v-text-field
                  v-model=financialCost
                  label="$ Costo financiero"
                  :rules="rules"
                  hide-details="auto"
                  type="number"
                  :disabled="!financed"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </div>

        <!-------------------------- Sección de Archivos adjuntos --------------------->
        <br><br>
        <v-row>
          <div class="section-subtitle">
            <h5>Archivos adjuntos</h5>
          </div>
        </v-row>

        <v-row>
          <v-data-table
            :headers="headers"
            :items="attachedFiles"
            item-key="name"
            class="elevation-1"
            :search="search"
            :items-per-page="30"
            :footer-props="{
              'items-per-page-all-text': 'Todos',
              'items-per-page-text': 'Renglones por página:',
              'items-per-page-options': [3]
            }"
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
                          @click="uploadFile"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>Cargar archivo</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-container>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                class="ma-1"
                color="error"
                plain
                @click=requestDeleteIFC(item)
              >
                Eliminar
              </v-btn>
            </template>
          </v-data-table>
        </v-row>

        <!---------------------------- Sección Eliminar Proyecto ------------------------------>
        <br><br>
        <v-row>
          <div class="section-subtitle">
            <h5>Más acciones</h5>
          </div>
        </v-row>

        <div class="generic-card">
          <div class="generic-card-content">
            <!-- Datos generales del cliente -->
            <v-row>
              <v-col>
                <v-btn
                  class="ma-1"
                  color="error"
                  @click="requestDeleteProject"
                  >
                  Eliminar Proyecto
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </div>

        <div style="height: 45px;"></div>
      </v-container>
    </v-form>
    <!------------------------------ Sección Guardar/Cancelar ------------------------------>
    <footer class="custom-footer">
      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="2">
          <v-btn
            class="ma-1"
            color="error"
            @click="goToDashboard"
            >
            Cancelar
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn
            class="ma-1"
            color="teal"
            @click="submitInfo"
            >
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </footer>
  </div>
</template>

<script>
import DialogCard from './DialogCard.vue';
import NewProjectStore from '@/store/NewProjectStore';
import constants from '@/constants';
import axios from 'axios';
import EditProjectStore from '@/store/EditProjectStore'
import MessageCard from './MessageCard.vue';
import UploadIFCCard from './UploadIFCCard.vue';

export default {
  components: {
    DialogCard,
    MessageCard,
    UploadIFCCard
},
  beforeMount () {
    this.loadingData = true;
    const baseUrl = constants.urls[process.env.NODE_ENV];
    let projectUrl = baseUrl + constants.endpoints.projects.getProject + EditProjectStore.id;
    let getCustomersUrl = baseUrl + constants.endpoints.customers.getCustomers;
    let getManagersUrl = baseUrl + constants.endpoints.users.getManagers;

    axios.get(getCustomersUrl)
      .then(response => response.data.forEach(c => this.customers.push(c.client)))
      .catch(error => console.log(error));

    axios.get(getManagersUrl)
      .then(response => {
        if(response.data.length > 0) {
          this.managers = response.data;
        }
      })
      .catch(error => console.log(error));

    axios.get(projectUrl)
      .then(response => {
        let project = response.data.project;

        this.projectName = project.name;
        this.projectCustomer = project.customer.id;
        this.projectManager = project.manager.id;
        this.projectState = project.location.state;
        this.projectCity = project.location.city;
        this.projectNeighborhood = project.location.neighborhood;
        this.street = project.location.street;
        this.exteriorNumber = project.location.exterior_number;
        this.interiorNumber = project.location.interior_number;
        this.projectZipCode = project.location.zip_code;
        this.projectLatitude = project.location.latitude;
        this.projectLongitude = project.location.longitude;
        this.startDate = project.dates.start;
        this.endDate = project.dates.end;
        this.hiredCost = project.cost.hired;
        this.indirectCost = project.cost.indirect;
        this.directCost = project.cost.direct;
        this.utility = project.cost.utility;
        this.financed = project.cost.financed;
        this.financialCost = project.cost.financial_cost;

        for(const att in project.attachments) {
          if(att.includes('_filename')) {
            let ifcType = constants.project.attachments[att];
            this.attachedFiles.push({
              name: project.attachments[att],
              type: ifcType,
              actions: {}
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      })

  },
  data: () => ({
    projectName: '',
    projectCustomer: '',
    projectManager: '',
    projectState: '',
    projectCity: '',
    projectNeighborhood: '',
    street: '',
    exteriorNumber: undefined,
    interiorNumber: undefined,
    projectZipCode: '',
    projectLatitude: '',
    projectLongitude: '',
    hiredCost: 0,
    indirectCost: 0,
    directCost: 0,
    utility: 0,
    financed: false,
    financialCost: 0,
    activePicker: null,
    activePicker2: null,
    startDate: null,
    endDate: null,
    menu: false,
    menu2: false,
    creditCheckBox: false,
    showUploadFile: false,
    ifcType: '',
    search: '',
    deletingProject: false,
    editedProject: false,
    errorEditingProject: false,
    deletingIFC: false,
    confirmIFCdelete: false,
    ifc: {},
    rules: [ value => !!value || 'Campo requerido.' ],
    rulesNumeric: value => {
      if(!value) return 'Campo requerido.';
      if(value.length != 5) return 'El código postal no contiene 5 dígitos';
      return true;
    },
    attachedFiles: [],
    customers: [],
    managers: [],
    states: constants.states
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    menu2 (val) {
      val && setTimeout(() => (this.activePicker2 = 'YEAR'))
    },
    projectName (property) {
      NewProjectStore.data.name = property;
    },
    projectCustomer (property) {
      NewProjectStore.data.customer = property;
    },
    projectManager (property) {
      NewProjectStore.data.manager = property;
    },
    projectState (property) {
      NewProjectStore.data.location.state = property;
    },
    projectCity (property) {
      NewProjectStore.data.location.city = property;
    },
    projectNeighborhood (property) {
      NewProjectStore.data.location.neighborhood = property;
    },
    street (property) {
      NewProjectStore.data.location.street = property;
    },
    exteriorNumber (property) {
      NewProjectStore.data.location.exterior_number = property;
    },
    interiorNumber (property) {
      NewProjectStore.data.location.interior_number = property;
    },
    projectZipCode (property) {
      NewProjectStore.data.location.zip_code= property;
    },
    projectLatitude (property) {
      NewProjectStore.data.location.latitude= property;
    },
    projectLongitude (property) {
      NewProjectStore.data.location.longitude= property;
    },
    startDate (property) {
      NewProjectStore.data.dates.start = property;
    },
    endDate (property) {
      NewProjectStore.data.dates.end = property;
    },
    hiredCost (property) {
      NewProjectStore.data.cost.hired = property;
    },
    indirectCost (property) {
      NewProjectStore.data.cost.indirect = property;
    },
    directCost (property) {
      NewProjectStore.data.cost.direct = property;
    },
    utility (property) {
      NewProjectStore.data.cost.utility = property;
    },
    financed (property) {
      NewProjectStore.data.cost.financed = property;
      if(!property) {
        this.financialCost = 0;
      }
    },
    financialCost (property) {
      NewProjectStore.data.cost.financial_cost = property;
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    save2 (date) {
      this.$refs.menu2.save(date)
    },
    uploadFile (ifcType) {
      this.ifcType = ifcType;
      this.showUploadFile = true;
    },
    goToDashboard () {
      this.$router.push('/dashboard');
    },
    requestDeleteProject () {
      this.deletingProject = true;
    },
    deleteProject (dialogValue) {
      if(dialogValue != 'Cancel') {
        const baseUrl = constants.urls[process.env.NODE_ENV];
        const deleteProjectUrl = baseUrl + constants.endpoints.projects.deleteProject;
        axios.delete(deleteProjectUrl + EditProjectStore.id)
          .then(response => {
            if(response.status == 200) {
              console.log('Proyecto eliminado exitosamente!');
            }
          })
          .catch(error => {
            console.log(error);
          });
      }

      this.deletingProject = false;
    },
    submitInfo () {
      const payload = JSON.stringify(NewProjectStore);
      const baseUrl = constants.urls[process.env.NODE_ENV];
      const editProjectUrl = baseUrl + constants.endpoints.projects.updateProject + EditProjectStore.id;
      const customConfig = { headers: { 'Content-Type': 'application/json' }};

      axios.put(editProjectUrl, payload, customConfig)
      .then(response => {
        if(response.status == 200) {
          this.editedProject = true;
          console.log('Edited');
        }
      })
      .catch(error => {
        this.errorEditingProject = true;
        console.log(error);
      });
    },
    deleteIFCfile (dialogValue) {
      if(dialogValue != 'Cancel') {
        let formData = new FormData();
        const baseUrl = constants.urls[process.env.NODE_ENV];
        const deleteFileUrl = baseUrl + constants.endpoints.projects.deleteFile + EditProjectStore.id + '/attachment';
        const customConfig = { headers: { 'Content-Disposition': 'form-data' }};
        const key = Object.keys(constants.project.attachments).find((key) => {
          return constants.project.attachments[key] === this.ifc.type;
        }).replace('_filename', '');
        formData.append('what', key);

        axios.delete(deleteFileUrl, formData, customConfig)
          .then(response => {
            if(response.status == 204) {
              console.log('Archivo eliminado exitosamente!');
              this.ifc = {};
            }
          })
          .catch(error => {
            console.log(error);
            this.ifc = {};
          });
      }

      this.deletingIFC = false;
    },
    requestDeleteIFC (ifc) {
      this.deletingIFC = true;
      this.ifc = ifc;
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Archivo', value: 'name' },
        { text: 'Tipo', value: 'type' },
        { text: 'Acciones', value: 'actions', align: 'center' },
      ]
    }
  }
}
</script>

<style>
.section-subtitle {
  display: flex;
  align-items: start;
  border-bottom: solid rgb(188, 169, 127) 1px;
  margin-bottom: 10px;
}

.page-title {
  margin: 25px;
}

#edit-project-background {
  height: 100%;
  background: linear-gradient(0deg, rgba(80,80,80,1) 0%, rgba(255,255,255,1) 100%);
}

.generic-card {
  border-radius: 4px;
  background-color: white;
  margin: 10px 0px;
}

.generic-card-content {
  padding: 20px;
}

.custom-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
  background-color: white;
}
</style>