import { createStore } from 'vuex';
import {
  SET_AUTHENTICATION,
  IS_USER_AUTHENTICATED,
  SET_USERNAME,
  GET_USERNAME,
} from './storeconstants';
import auth from './auth/index';

const store = createStore({
  state: {
    isAuthenticated: false,
    username: '',
  },
  getters: {
    [IS_USER_AUTHENTICATED](state) {
      return state.isAuthenticated;
    },
    [GET_USERNAME](state) {
      return state.username;
    },
  },
  mutations: {
    [SET_AUTHENTICATION](state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    [SET_USERNAME](state, username) {
      state.username = username;
    },
  },
  actions: {},
  modules: {
    auth,
  },
});

export default store;
