<template>
  <div class="slideout">

    <!--------------- Upload File Card --------------------------->
    <div v-if="showUploadFile" class="overlay">
      <UploadFileCard
        card-title="Cargar IFC"
        :card-subtitle=ifcType
        card-message="Selecciona un archivo IFC para subirlo al sistema."
        @closeCard="showUploadFile = false"
        acceptedFileTypes=".ifc"
      />
    </div>

    <!---------------- New Project Content ----------------------->
    <v-form>
      <v-container>
        <!---------------------------- Sección Info general ------------------------------>
        <v-row>
          <div class="section-subtitle">
            <h5>Información general</h5>
          </div>
        </v-row>

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
              :items="customersList"
              item-text="full_name"
              item-value="client_id"
              label="Cliente"
              solo
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model=projectManager
              :items="managersList"
              item-text="employee.personal_info.full_name"
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
              :rules="[rulesNumeric]"
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

        <!-- Fechas del proyecto -->
        <br><br>
        <v-row>
          <div class="section-subtitle">
            <h5>Duración del proyecto</h5>
          </div>
        </v-row>
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

        <!------------------------------ Sección costos ------------------------------>
        <v-row>
          <div class="section-subtitle">
            <h5>Costos</h5>
          </div>
        </v-row>

        <!-- Costos -->
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model=hiredCost
              label="$ Contratado"
              :rules="[rulesCost]"
              hide-details="auto"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model=indirectCost
              label="$ Indirecto"
              :rules="[rulesCost]"
              hide-details="auto"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model=directCost
              label="$ Directo"
              :rules="[rulesCost]"
              hide-details="auto"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model=utility
              label="$ Utilidad"
              :rules="[rulesCost]"
              hide-details="auto"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="financed"
              label="Financiamiento"
              color="rgb(188, 169, 127)"
            ></v-checkbox>

            <v-text-field
              v-model=financialCost
              label="$ Costo financiero"
              :rules="[rulesCost]"
              hide-details="auto"
              type="number"
              :disabled="!financed"
            ></v-text-field>

            <br>
            <!-- <v-btn>Cargar Contrato (PDF)</v-btn> -->
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import NewProjectStore from '@/store/NewProjectStore';
import UploadFileCard from './UploadFileCard.vue';
import constants from '@/constants';
import axios from 'axios';

export default {
  components: {
    UploadFileCard
  },
  beforeMount () {
    this.loadingData = true;
    let getCustomersUrl = constants.endpoints.dev.customers.getCustomers;
    let getEmployeesUrl = constants.endpoints.dev.users.getEmployees;

    axios.get(getCustomersUrl)
      .then(response => response.data.forEach(c => this.customersList.push(c.client)))
      .catch(error => console.log(error));

    axios.get(getEmployeesUrl)
    .then(response => {
      if(response.data.length > 0) {
        this.managersList = response.data.filter(e => e.employee.position_id == 'manager');
      }
    })
    .catch(error => {
      console.log(error);
    });
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
    showUploadFile: false,
    ifcType: '',
    loadingData: false,
    rules: [
      value => {
        if(!value) return 'Campo requerido.';
        return true;
      }
    ],
    rulesNumeric: value => {
      if(!value) return 'Campo requerido.';
      if(value.length != 5) return 'El código postal no contiene 5 dígitos';
      return true;
    },
    rulesCost: () => {
      return true;
    },
    customersList: [],
    managersList: [],
    states: constants.states
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    menu2 (val) {
      val && setTimeout(() => (this.activePicker2 = 'YEAR'))
    },
    projectName (val) {
      NewProjectStore.data.name = val;
    },
    projectCustomer (val) {
      NewProjectStore.data.customer = val;
    },
    projectManager (val) {
      NewProjectStore.data.manager = val;
    },
    projectState (val) {
      NewProjectStore.data.location.state = val;
    },
    projectCity (val) {
      NewProjectStore.data.location.city = val;
    },
    projectNeighborhood (val) {
      NewProjectStore.data.location.neighborhood = val;
    },
    street (val) {
      NewProjectStore.data.location.street = val;
    },
    exteriorNumber (val) {
      NewProjectStore.data.location.exterior_number = val;
    },
    interiorNumber (val) {
      NewProjectStore.data.location.interior_number = val;
    },
    projectZipCode (val) {
      NewProjectStore.data.location.zip_code = val;
    },
    projectLatitude (val) {
      NewProjectStore.data.location.latitude = val;
    },
    projectLongitude (val) {
      NewProjectStore.data.location.longitude = val;
    },
    startDate (val) {
      NewProjectStore.data.dates.start = val;
    },
    endDate (val) {
      NewProjectStore.data.dates.end = val;
    },
    hiredCost (val) {
      NewProjectStore.data.cost.hired = val;
    },
    indirectCost (val) {
      NewProjectStore.data.cost.indirect = val;
    },
    directCost (val) {
      NewProjectStore.data.cost.direct = val;
    },
    utility (val) {
      NewProjectStore.data.cost.utility = val;
    },
    financed (val) {
      NewProjectStore.data.cost.financed = val;
    },
    financialCost (val) {
      NewProjectStore.data.cost.financial_cost = val;
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
    }
  },
}
</script>

<style>
.slideout {
  padding: 20px;
  min-height: 100vh;
}
.section-subtitle {
  display: flex;
  align-items: start;
  border-bottom: solid rgb(188, 169, 127) 1px;
}

.link-small {
  font-size: 0.8em !important;
}
</style>