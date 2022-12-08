<template>
  <div class="card-container">
    <div class="center">
      <div class="card">
        <div class="card" style="width: 30rem;">
          <div class="card-body">
            <h5 class="card-title">{{ cardTitle }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ cardSubtitle }}</h6>
            <p class="card-text">{{ cardMessage }}</p>

            <div>
              <input
                id="file"
                type="file"
                @change="uploadFile"
                name="file"
                style="padding: 5px;"
                :accept=acceptedFileTypes
              >
            </div>
            <div style="padding: 5px;">
              <v-btn
                block
                @click="uploadFile"
              >
                Subir archivo
              </v-btn>
            </div>
            <div style="padding: 5px;">
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
    uploadFile() {
      let file = document.getElementById('file').files[0];
      let formData = new FormData();

      formData.append('attachment', file);
      formData.append('what', 'structural_ifc');

      const baseUrl = constants.urls[process.env.NODE_ENV];
      const uploadProjectFile = baseUrl + constants.endpoints.projects.uploadFile + EditProjectStore.id + '/attachment';
      const customConfig = { headers: { 'Content-Disposition': 'form-data' }};

      axios.post(uploadProjectFile, formData, customConfig)
        .then(response => console.log(response))
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