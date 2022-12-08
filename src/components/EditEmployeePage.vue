<template>
  <div id="edit-employee-background">

    <div v-if="loadingData" class="overlay">
      <div class="spinner-border text-warning spinner" role="status"></div>
    </div>

    <!--------------- Message Card --------------------------->
    <div v-if="deletingEmployee" class="overlay">
      <DialogCard
        card-title="Borrar Colaborador"
        card-subtitle="¡Atención! Esto borrará al colaborador permanentemente."
        confirm-text="Eliminar Colaborador"
        card-message=""
        @closeCard="deleteEmployee"
      />
    </div>

    <div v-if="editedEmployee" class="overlay">
      <MessageCard
        card-title="¡Listo!"
        card-subtitle="Colaborador editado correctamente."
        card-message=""
        @closeCard="editedEmployee = false"
      />
    </div>

    <div v-if="errorEditingEmployee" class="overlay">
      <MessageCard
        card-title="¡Ups!"
        card-subtitle="Algo salió mal. Intentalo más tarde."
        card-message=""
        @closeCard="errorEditingEmployee = false"
      />
    </div>

    <!--------------- Upload File Card --------------------------->
    <div v-if="showUploadFile" class="overlay">
      <UploadEmployeeFileCard
        card-title="Cargar Archivo"
        card-subtitle=''
        card-message="Selecciona un archivo para subirlo al sistema."
        @closeCard="showUploadFile = false"
        acceptedFileTypes=".jpg,.jpeg,.png"
      />
    </div>

    <div v-if="deletingFile" class="overlay">
      <DialogCard
        card-title="Borrar Archivo"
        card-subtitle="¡Atención! Esto borrará el archivo permanentemente."
        confirm-text="Eliminar archivo"
        card-message=""
        @closeCard="deleteFile"
      />
    </div>
    <v-form>
      <v-container>
        <v-row>
          <h3 class="page-title">Editar Colaborador Loatan</h3>
        </v-row>

        <!---------------------------- Sección Info general ------------------------------>
        <v-row>
          <div class="section-subtitle">
            <h5>Información general</h5>
          </div>
        </v-row>

        <div class="generic-card">
          <div class="generic-card-content">
            <!-- Datos generales del cliente -->
            <v-row>
              <v-col>
                <v-text-field
                  v-model=names
                  label="Nombre(s)"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=firstSurname
                  label="Apellido Paterno"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=secondSurname
                  label="Apellido materno"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=rfc
                  label="RFC"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=phone
                  label="Teléfono"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=email
                  label="e-mail"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
                <br>
                <v-select
                  v-model=area
                  :items="areas"
                  label="Área Loatan"
                  solo
                ></v-select>
              </v-col>
            </v-row>
          </div>
        </div>

        <!------------------------------ Sección Archivos adjuntos ------------------------------>
        <br>
        <v-row>
          <div class="section-subtitle">
            <h5>Archivos adjuntos</h5>
          </div>
        </v-row>

        <!-- Archivos -->
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
                @click=requestDeleteFile(item)
              >
                Eliminar
              </v-btn>
            </template>
          </v-data-table>
        </v-row>

        <!---------------------------- Sección Eliminar Cliente ------------------------------>
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
                  @click="requestDeleteEmployee"
                  >
                  Eliminar Colaborador
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
import axios from 'axios';
import DialogCard from './DialogCard.vue';
import constants from '@/constants';
import EditEmployeeStore from '@/store/EditEmployeeStore';
import NewEmployeeStore from '@/store/NewEmployeeStore';
import MessageCard from './MessageCard.vue';
import UploadEmployeeFileCard from './UploadEmployeeFileCard.vue';

export default {
  components: {
    DialogCard,
    MessageCard,
    UploadEmployeeFileCard
},
  beforeMount () {
    this.loadingData = true;
    const baseUrl = constants.urls[process.env.NODE_ENV];
    axios.get(baseUrl + constants.endpoints.users.getEmployee + EditEmployeeStore.id)
      .then(response => {
        let employee = response.data.employee;

        this.names = employee.personal_info.names;
        this.phone = employee.personal_info.cellphone;
        this.email = employee.user.email;
        this.firstSurname = employee.personal_info.paternal_surname;
        this.secondSurname = employee.personal_info.maternal_surname;
        this.phone = employee.personal_info.cellphone;
        this.area = employee.work_area.area;

        for(const att in employee.attachments) {
          if(att.includes('_filename')) {
            let fileType = constants.customer.attachments[att];
            this.attachedFiles.push({
              name: employee.attachments[att],
              type: fileType,
              actions: {}
            });
          }
        }

        let taxInformation = employee.personal_info.tax_information;
        if(taxInformation.length > 0) {
          this.rfc = taxInformation.rfc;
        }

        this.loadingData = false;
      })
      .catch(error => {
        console.log(error);
        this.loadingData = false;
      });
  },
  data: () => ({
    names: '',
    firstSurname: '',
    secondSurname: '',
    rfc: '',
    phone: '',
    email: '',
    area: '',
    state: '',
    city: '',
    neighborhood: '',
    zipCode: '',
    search: '',
    showUploadFile: false,
    deletingEmployee: false,
    loadingData: true,
    editedEmployee: false,
    errorEditingEmployee: false,
    file: {},
    deletingFile: false,
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
    attachedFiles: [],
    areas: constants.areas
  }),
  computed: {
    headers () {
      return [
        { text: 'Archivo', value: 'name' },
        { text: 'Tipo', value: 'type' },
        { text: 'Acciones', value: 'actions', align: 'center' },
      ]
    },
  },
  watch: {
    names (val) {
      NewEmployeeStore.data.personal_information.names = val;
    },
    firstSurname (val) {
      NewEmployeeStore.data.personal_information.paternal_surname = val;
    },
    secondSurname (val) {
      NewEmployeeStore.data.personal_information.maternal_surname = val;
    },
    rfc (val) {
      NewEmployeeStore.data.tax_information.rfc = val;
    },
    phone (val) {
      NewEmployeeStore.data.personal_information.cellphone = val;
    },
    email (val) {
      NewEmployeeStore.data.user.email = val;
    },
    area (val) {
      let areaId = constants.areasMap[val];
      NewEmployeeStore.data.work_area_id = areaId;
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    save2 (date) {
      this.$refs.menu2.save(date)
    },
    goToDashboard () {
      this.$router.push('/dashboard');
    },
    uploadFile (ifcType) {
      this.ifcType = ifcType;
      this.showUploadFile = true;
    },
    requestDeleteEmployee () {
      this.deletingEmployee = true;
    },
    deleteEmployee(value) {
      if(value == 'Eliminar Colaborador') {
        const baseUrl = constants.urls[process.env.NODE_ENV];
        axios.delete(baseUrl + constants.endpoints.users.deleteEmployee + EditEmployeeStore.id)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
        this.deletingEmployee = false;
      }
    },
    submitInfo () {
      const payload = JSON.stringify(NewEmployeeStore);
      const baseUrl = constants.urls[process.env.NODE_ENV];
      const editEmployeeUrl = baseUrl + constants.endpoints.users.updateEmployee + EditEmployeeStore.id;
      const customConfig = { headers: { 'Content-Type': 'application/json' }};

      axios.put(editEmployeeUrl, payload, customConfig)
      .then(response => {
        if(response.status == 200) {
            this.editedEmployee = true;
            console.log('Editado exitosamente.');
          }
        })
        .catch(error => {
          this.errorEditingEmployee = true;
          console.log(error);
        });
    },
    requestDeleteFile (file) {
      this.deletingFile = true;
      this.file = file;
    },
    deleteFile (dialogValue) {
      if(dialogValue != 'Cancel') {
        let formData = new FormData();
        const baseUrl = constants.urls[process.env.NODE_ENV];
        const deleteFileUrl = baseUrl + constants.endpoints.users.deleteFile + EditEmployeeStore.id + '/attachment';
        const customConfig = { headers: { 'Content-Disposition': 'form-data' }};
        const key = Object.keys(constants.employee.attachments).find((key) => {
          return constants.employee.attachments[key] === this.file.type;
        }).replace('_filename', '');
        formData.append('what', key);

        axios.delete(deleteFileUrl, formData, customConfig)
          .then(response => {
            if(response.status == 204) {
              console.log('Archivo eliminado exitosamente!');
              this.file = {};
            }
          })
          .catch(error => {
            console.log(error);
            this.file = {};
          });
      }

      this.deletingFile = false;
    },
  },
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

#edit-employee-background {
  height: 100%;
  background: linear-gradient(0deg, rgba(80,80,80,1) 0%, rgba(255,255,255,1) 100%);
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