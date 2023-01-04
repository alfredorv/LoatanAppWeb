import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import NewProjectPage from './components/NewProjectPage.vue'
import NewClientPage from './components/NewClientPage.vue'
import EditClientPage from './components/EditClientPage.vue'
import EditProjectPage from './components/EditProjectPage.vue'
import EditEmployeePage from './components/EditEmployeePage.vue'
import ForgotPasswordPage from './components/ForgotPasswordPage.vue'
import vuetify from './plugins/vuetify'
import vueCountryRegionSelect from 'vue-country-region-select'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(vueCountryRegionSelect)

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/newProject', component: NewProjectPage },
  { path: '/newClient', component: NewClientPage },
  { path: '/editClient', component: EditClientPage },
  { path: '/editProject', component: EditProjectPage },
  { path: '/editEmployee', component: EditEmployeePage },
  { path: '/forgotPassword', component: ForgotPasswordPage },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

// router.beforeEach((to, from, next) => {
//   if(to.name !== 'Login' /*&& store.state.userAuthenticated*/) {
//     next({ name: 'Login' });
//   } else if(to.name == 'Login') {
//     next();
//   } else {
//     return false;
//   }
// });

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
