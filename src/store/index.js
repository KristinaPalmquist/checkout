import { createStore } from 'vuex';
import {
  SET_AUTHENTICATION,
  IS_USER_AUTHENTICATED,
  SET_USERNAME,
  GET_USERNAME,
} from './storeconstants';
import auth from './auth/index';

// import auth from './modules/auth'; // Assuming you have an auth module

const store = createStore({
  state: {
    isAuthenticated: false,
    username: '',
    cart: [],
  },
  mutations: {
    SET_AUTHENTICATION(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USERNAME(state, username) {
      state.username = username;
    },
    ADD_TO_CART(state, product) {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    UPDATE_QUANTITY(state, { index, quantity }) {
      if (state.cart[index]) {
        state.cart[index].quantity = quantity;
      }
    },
  },
  actions: {
    addToCart({ commit }, product) {
      const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 hours from now
      const productToSave = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        specifications: product.specifications,
        expirationTime,
      };
      commit('ADD_TO_CART', productToSave);
    },
    removeFromCart({ commit }, index) {
      commit('REMOVE_FROM_CART', index);
    },
    loadCart({ commit }) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const now = new Date().getTime();
      const filteredCart = cart.filter(
        (product) => product.expirationTime > now
      );
      commit('SET_CART', filteredCart);
    },
    saveCart({ state }) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateQuantity({ commit }, { index, quantity }) {
      commit('UPDATE_QUANTITY', { index, quantity });
    },
    authenticateUser({ commit }, { isAuthenticated, username }) {
      commit('SET_AUTHENTICATION', isAuthenticated);
      commit('SET_USERNAME', username);
    },
  },
  getters: {
    IS_USER_AUTHENTICATED(state) {
      return state.isAuthenticated;
    },
    GET_USERNAME(state) {
      return state.username;
    },
    cartProducts: (state) => state.cart,
    totalPrice: (state) =>
      state.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
  },
  modules: {
    auth,
  },
});

export default store;
