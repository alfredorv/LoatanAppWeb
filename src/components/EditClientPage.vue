<template>
  <div id="edit-client-background">

    <!--------------- Message Card --------------------------->
    <div v-if="deletingClient" class="overlay">
      <DialogCard
        card-title="Borrar Cliente"
        card-subtitle="¡Atención! Esto borrará al cliente permanentemente."
        confirm-text="Eliminar Cliente"
        card-message=""
        @closeCard="deleteClient"
      />
    </div>

    <div v-if="editedCustomer" class="overlay">
      <MessageCard
        card-title="¡Listo!"
        card-subtitle="Cliente editado correctamente."
        card-message=""
        @closeCard="editedCustomer = false"
      />
    </div>

    <div v-if="errorEditingCustomer" class="overlay">
      <MessageCard
        card-title="¡Ups!"
        card-subtitle="Algo salió mal. Intentalo más tarde."
        card-message=""
        @closeCard="errorEditingCustomer = false"
      />
    </div>

    <!--------------- Upload File Card --------------------------->
    <div v-if="showUploadFile" class="overlay">
      <UploadClientFileCard
        card-title="Cargar Archivo"
        card-subtitle=''
        card-message="Selecciona un archivo para subirlo al sistema."
        @closeCard="showUploadFile = false"
        acceptedFileTypes=".png,.jpeg,.jpg,.pdf"
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
          <h3 class="page-title">Cliente Loatan</h3>
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
              <v-col cols="10">
                <v-text-field
                  v-model=customerName
                  label="Nombre o razón social"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=customerFirstSurname
                  label="Apellido Paterno"

                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=customerSecondSurname
                  label="Apellido materno"

                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=customerRfc
                  label="RFC"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=customerPhone
                  label="Teléfono"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  v-model=customerEmail
                  label="e-mail"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-radio-group
                  v-model=personType
                  column
                  style="margin-top: 35px;"
                >
                  <v-radio
                    label="Persona moral"
                    color="rgb(188, 169, 127)"
                    value="moral"
                  ></v-radio>
                  <v-radio
                    label="Persona Física"
                    color="rgb(188, 169, 127)"
                    value="fisica"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <!-- Ubicación del cliente -->
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model=state
                  :items="states"
                  label="Estado"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model=city
                  label="Ciudad"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model=neighborhood
                  label="Colonia"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model=zipCode
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
                      v-model=search
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
                  @click="requestDeleteClient"
                  >
                  Eliminar Cliente
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
import constants from '@/constants';
import DialogCard from './DialogCard.vue';
import EditClientStore from '@/store/EditClientStore';
import NewClientStore from '@/store/NewClientStore';
import MessageCard from './MessageCard.vue';
import UploadClientFileCard from './UploadClientFileCard.vue';

export default {
  beforeMount () {
    this.loadingData = true;
    const baseUrl = constants.urls[process.env.NODE_ENV];
    let customerUrl = baseUrl + constants.endpoints.customers.getCustomer + EditClientStore.id;

    axios.get(customerUrl)
      .then(response => {
        let client = response.data.client;

        this.customerName = client.name;
        this.customerFirstSurname = client.surname;
        this.customerSecondSurname = client.second_surname;
        this.customerRfc = client.rfc;
        this.customerPhone = client.phone;
        this.customerEmail = client.user.email;
        this.state = client.location.state;
        this.city = client.location.city;
        this.neighborhood = client.location.neighborhood;
        this.street = client.location.street;
        this.exteriorNumber = client.location.ext_number;
        this.interiorNumber = client.location.int_number;
        this.zipCode = client.location.zip_code;
        this.personType = client.is_moral == true ? 'moral' : 'fisica';

        for(const att in client.attachments) {
          if(att.includes('_filename')) {
            let fileType = constants.customer.attachments[att];
            this.attachedFiles.push({
              name: client.attachments[att],
              type: fileType,
              actions: {}
            });
          }
        }

        this.loadingData = false;
      })
      .catch(error => {
        console.log(error);
        this.loadingData = false;
      });
  },
  components: {
    DialogCard,
    MessageCard,
    UploadClientFileCard
},
  data: () => ({
    customerName: '',
    customerFirstSurname: '',
    customerSecondSurname: '',
    customerRfc: '',
    customerPhone: '',
    customerEmail: '',
    state: '',
    city: '',
    neighborhood: '',
    zipCode: '',
    street: '',
    exteriorNumber: '',
    interiorNumber: '',
    personType: '',
    search: '',
    showUploadFile: false,
    deletingClient: false,
    editedCustomer: false,
    errorEditingCustomer: false,
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
    states: constants.states
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
    customerName (value) {
      NewClientStore.data.name = value;
    },
    customerFirstSurname (value) {
      NewClientStore.data.surname = value;
    },
    customerSecondSurname (value) {
      NewClientStore.data.second_surname = value;
    },
    customerRfc (value) {
      NewClientStore.data.rfc = value;
    },
    customerPhone (value) {
      NewClientStore.data.phone = value;
    },
    customerEmail (value) {
      NewClientStore.data.email = value;
    },
    state (value) {
      NewClientStore.data.location.state = value;
    },
    city (value) {
      NewClientStore.data.location.city = value;
    },
    neighborhood (value) {
      NewClientStore.data.location.neighborhood = value;
    },
    zipCode (value) {
      NewClientStore.data.location.zip_code = value;
    },
    street (value) {
      NewClientStore.data.location.street = value;
    },
    exteriorNumber (value) {
      NewClientStore.data.location.ext_number = value;
    },
    interiorNumber (value) {
      NewClientStore.data.location.int_number = value;
    },
    personType (value) {
      NewClientStore.data.is_moral = value == 'moral' ? true : false;
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
    requestDeleteClient () {
      this.deletingClient = true;
    },
    deleteClient (dialogValue) {
      if(dialogValue != 'Cancel') {
        const baseUrl = constants.urls[process.env.NODE_ENV];
        const deleteCustomerUrl = baseUrl + constants.endpoints.customers.deleteCustomer;
        axios.delete(deleteCustomerUrl + EditClientStore.id)
          .then(response => {
            if(response.status == 200) {
              this.goToDashboard();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }

      this.deletingClient = false;
    },
    submitInfo () {
      const payload = JSON.stringify(NewClientStore);
      const baseUrl = constants.urls[process.env.NODE_ENV];
      const editClientUrl = baseUrl + constants.endpoints.customers.updateCustomer + EditClientStore.id;
      const customConfig = { headers: { 'Content-Type': 'application/json' }};

      axios.put(editClientUrl, payload, customConfig)
      .then(response => {
        if(response.status == 200) {
            this.editedCustomer = true;
          }
        })
        .catch(error => {
          this.errorEditingCustomer = true;
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
        const deleteFileUrl = baseUrl + constants.endpoints.customers.deleteFile + EditClientStore.id + '/attachment';
        const customConfig = { headers: { 'Content-Disposition': 'form-data' }};
        const key = Object.keys(constants.customer.attachments).find((key) => {
          return constants.customer.attachments[key] === this.file.type;
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

#edit-client-background {
  height: 100%;
  background: linear-gradient(0deg, rgba(80,80,80,1) 0%, rgba(255,255,255,1) 100%);
}
</style>