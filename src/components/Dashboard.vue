<template>
  <div id="dashboard-background">
    <v-container style="height: 100%; max-width: 1280px;">
      <v-row>
        <v-col cols="3">
          <NavMenu @selected-content="mainContentComponent = $event"/>
        </v-col>
        <v-col class="dashboard-title" cols="9">
          <div id="main-content">
            <component :is="mainContentComponent"/>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavMenu from './NavMenu';
import ProjectsPage from './ProjectsPage.vue';
import HrPage from './HrPage.vue';
import ClientsPage from './ClientsPage.vue';
import EmployeesPage from './EmployeesPage.vue';

export default {
  name: 'dashboard-component',
  components: {
    NavMenu,
    ProjectsPage,
    HrPage,
    ClientsPage,
    EmployeesPage
  },
  data: () => {
    return {
      mainContentComponent: 'ProjectsPage'
    }
  },
}
</script>

<style>
#dashboard-background {
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(80,80,80,1) 0%, rgba(255,255,255,1) 100%);
  height: 100vh;
}

.dashboard-title {
  margin: 30px 0px;
}
</style>