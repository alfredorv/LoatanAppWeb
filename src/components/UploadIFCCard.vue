<template>
  <div class="card-container">
    <div class="center">
      <div class="card">
        <div class="card" style="width: 30rem;">
          <div class="card-body">
            <h5 class="card-title">{{ cardTitle }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ cardSubtitle }}</h6>
            <p class="card-text">{{ cardMessage }}</p>

            <v-container style="margin-top: 20px">
              <v-row>
                <h5>Estructural</h5>
              </v-row>
              <v-row>
                <input
                  id="structural_ifc"
                  type="file"
                  name="file"
                  style="padding: 5px;"
                  :accept=acceptedFileTypes
                >
              </v-row>
              <v-row style="padding: 5px;">
                <v-btn
                  block
                  @click="uploadFile('structural_ifc')"
                >
                  Subir IFC Estructural
                </v-btn>
              </v-row>
            </v-container>

            <v-container style="margin-top: 20px">
              <v-row>
                <h5>Arquitectónico</h5>
              </v-row>
              <v-row>
                <input
                  id="arquitectural_ifc"
                  type="file"
                  name="file"
                  style="padding: 5px;"
                  :accept=acceptedFileTypes
                >
              </v-row>
              <v-row style="padding: 5px;">
                <v-btn
                  block
                  @click="uploadFile('arquitectural_ifc')"
                >
                  Subir IFC Arquitectónico
                </v-btn>
              </v-row>
            </v-container>

            <v-container style="margin-top: 20px">
              <v-row>
                <h5>Instalaciones</h5>
              </v-row>
              <v-row>
                <input
                  id="installations_ifc"
                  type="file"
                  name="file"
                  style="padding: 5px;"
                  :accept=acceptedFileTypes
                >
              </v-row>
              <v-row style="padding: 5px;">
                <v-btn
                  block
                  @click="uploadFile('installations_ifc')"
                >
                  Subir IFC de Instalaciones
                </v-btn>
              </v-row>
            </v-container>

            <div style="margin-top: 25px;">
              <v-btn
                block
                @click="close"
              >
                Cancelar
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import constants from '@/constants';
import EditProjectStore from '@/store/EditProjectStore';

export default {
  props: [
    'cardTitle',
    'cardSubtitle',
    'cardMessage',
    'acceptedFileTypes'
  ],
  data: () => ({
    fileTypes: ''
  }),
  methods: {
    uploadFile(ifcType) {
      let file = document.getElementById(ifcType).files[0];
      let formData = new FormData();

      formData.append('attachment', file);
      formData.append('what', ifcType);

      const baseUrl = constants.urls[process.env.NODE_ENV];
      const uploadProjectFile = baseUrl + constants.endpoints.projects.uploadFile + EditProjectStore.id + '/attachment';
      const customConfig = { headers: { 'Content-Disposition': 'form-data' }};

      axios.post(uploadProjectFile, formData, customConfig)
        .then(response => {
          if(response.status == 204) {
            console.log('FILE UPLOADED');
            this.close();
          }
        })
        .catch(error => console.error(error));
    },
    close () {
      this.$emit('closeCard')
    }
  }
}

</script>

<style>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.message-card {
  background-color: white;
  padding: 20px 80px;
  border-radius: 15px;
}
</style>