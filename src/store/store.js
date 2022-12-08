import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userAuthenticated: false,
    userDetails: {}
  },
  mutations: {
    authenticateUser(state, authenticated) {
      state.userAuthenticated = authenticated;
    },
    saveUserDetails(state, userDetails) {
      state.userDetails = userDetails;
      sessionStorage.setItem('loatanAppUserDetails', JSON.stringify(userDetails));
    }
  },
  actions: {
    authenticateUser({ commit }, authenticated) {
      commit('authenticateUser', authenticated);
    },
    saveUserDetails({ commit }, userDetails) {
      commit('saveUserDetails', userDetails);
    }
  }
})

export default store