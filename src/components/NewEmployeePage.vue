<template>
  <div class="slideout">
    <v-form>
      <v-container>
        <!---------------------------- Sección Info general ------------------------------>
        <v-row>
          <div class="section-subtitle">
            <h5>Información general</h5>
          </div>
        </v-row>

        <!-- Datos generales del empleado -->
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
              :rules="rules"
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
      </v-container>
    </v-form>
  </div>
</template>

<script>
import constants from '@/constants';
import NewEmployeeStore from '@/store/NewEmployeeStore'

export default {
  data: () => ({
    names: '',
    firstSurname: '',
    secondSurname: '',
    rfc: '',
    phone: '',
    email: '',
    area: '',
    rules: [
      value => !!value || 'Campo requerido.'
    ],
    areas: constants.areas
  }),
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    save2 (date) {
      this.$refs.menu2.save(date)
    }
  },
  watch: {
    names (value) {
      NewEmployeeStore.data.personal_information.names = value;
    },
    firstSurname (value) {
      NewEmployeeStore.data.personal_information.paternal_surname = value;
    },
    secondSurname (value) {
      NewEmployeeStore.data.personal_information.maternal_surname = value;
    },
    rfc (value) {
      NewEmployeeStore.data.tax_information.rfc = value;
    },
    phone (value) {
      NewEmployeeStore.data.personal_information.cellphone = value;
    },
    email (value) {
      NewEmployeeStore.data.user.email = value;
    },
    area (value) {
      let areaId = constants.areasMap[value];
      NewEmployeeStore.data.work_area_id = areaId;
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