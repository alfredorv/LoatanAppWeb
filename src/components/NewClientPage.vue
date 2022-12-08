<template>
  <div class="slideout">

    <!--------------- Upload File Card --------------------------->
    <div v-if="showUploadFile" class="overlay">
      <UploadFileCard
        card-title="Cargar datos de cliente"
        :card-subtitle=documentType
        card-message="Selecciona un archivo adjunto para subirlo al sistema."
        @closeCard="showUploadFile = false"
        acceptedFileTypes=".jpeg,.pdf,.png"
      />
    </div>

    <v-form>
      <v-container>
        <!---------------------------- Sección Info general ------------------------------>
        <v-row>
          <div class="section-subtitle">
            <h5>Información general</h5>
          </div>
        </v-row>

        <!-- Datos generales del cliente -->
        <v-row>
          <v-col cols="8">
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
          <v-col cols="4">
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
                label="Persona física"
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

        <!---------------------------- Sección Archivos Adjuntos ------------------------------>
        <!-- <v-row>
          <div class="section-subtitle">
            <h5>Archivos adjuntos</h5>
          </div>
        </v-row>

          <div v-if="personType == 'moral'">
            <v-row>
              <v-col cols="4">
                <v-btn
                  @click="uploadFile('INE')"
                >
                  INE
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn
                  @click="uploadFile('Acta constitutiva')"
                >
                  Acta constitutiva
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn
                  @click="uploadFile('Constancia de situación fiscal')"
                >
                  Constancia del SAT
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-row>
              <v-col cols="4"></v-col>
              <v-col cols="4">
                <v-btn
                  @click="uploadFile('INE')"
                >
                  INE
                </v-btn>
              </v-col>
              <v-col cols="4"></v-col>
            </v-row>
          </div> -->
      </v-container>
    </v-form>
  </div>
</template>

<script>
import UploadFileCard from './UploadFileCard.vue';
import NewClientStore from '@/store/NewClientStore';
import constants from '@/constants';

export default {
  components: {
    UploadFileCard
  },
  data: () => ({
    customerName: '',
    customerFirstSurname: '',
    customerSecondSurname: '',
    customerRfc: '',
    customerPhone: '',
    customerEmail: '',
    isMoralPerson: true,
    state: '',
    city: '',
    neighborhood: '',
    zipCode: '',
    street: '',
    exteriorNumber: '',
    interiorNumber: '',
    personType: 'moral',
    documentType: '',
    showUploadFile: false,
    rules: [
      value => !!value || 'Campo requerido.'
    ],
    states: constants.states
  }),
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    save2 (date) {
      this.$refs.menu2.save(date)
    },
    uploadFile (documentType) {
      this.documentType = documentType;
      this.showUploadFile = true;
    }
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
  }
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
  margin-bottom: 10px;
}

.page-title {
  margin: 25px;
}
</style>