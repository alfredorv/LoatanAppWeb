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
                <h5>Foto de perfil</h5>
              </v-row>
              <v-row>
                <input
                  id="avatar"
                  type="file"
                  name="file"
                  style="padding: 5px;"
                  :accept=acceptedFileTypes
                >
              </v-row>
              <v-row style="padding: 5px;">
                <v-btn
                  block
                  @click="uploadFile('avatar')"
                >
                  Subir foto de perfil
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
import EditEmployeeStore from '@/store/EditEmployeeStore';

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
    uploadFile(fileType) {
      let file = document.getElementById(fileType).files[0];
      let formData = new FormData();

      formData.append('attachment', file);
      formData.append('what', fileType);

      const baseUrl = constants.urls[process.env.NODE_ENV];
      const uploadEmployeeFile = baseUrl + constants.endpoints.users.uploadFile + EditEmployeeStore.id + '/attachment';
      const customConfig = { headers: { 'Content-Disposition': 'form-data' }};

      axios.post(uploadEmployeeFile, formData, customConfig)
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