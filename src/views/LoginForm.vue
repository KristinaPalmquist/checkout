<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BasicButton from '../components/BasicButton.vue';
import {
  SET_AUTHENTICATION,
  SET_USERNAME,
  GET_USERNAME,
} from '@/store/storeconstants';

const store = useStore();
const router = useRouter();

const createBtnColor = ref('white');
const createBtnTextColor = ref('#c4c4c4');
const loginBtnClass = ref('cta-btn');

const input = ref({ userName: '', password: '' });
const output = ref('');

const showUserNameError = ref(false);
const userNameError = ref('');
const showPasswordError = ref(false);
const passwordError = ref('');

const validateUserName = () => {
  if (input.value.userName === '') {
    userNameError.value = 'Username is required';
    showUserNameError.value = true;
  } else {
    userNameError.value = '';
    showUserNameError.value = false;
  }
};

const validatePassword = () => {
  if (input.value.password === '') {
    passwordError.value = 'Password is required';
    showPasswordError.value = true;
  } else {
    passwordError.value = '';
    showPasswordError.value = false;
  }
};

const handleLogin = () => {
  validateUserName();
  validatePassword();

  if (userNameError.value === '' && passwordError.value === '') {
    output.value = 'Authentication successful';
    store.commit(`auth/${SET_AUTHENTICATION}`, true);
    store.commit(`auth/${SET_USERNAME}`, input.value.userName);
    output.value = store.getters[`auth/${GET_USERNAME}`];
    router.push('/welcome');
  } else {
    store.commit(`auth/${SET_AUTHENTICATION}`, false);
    output.value =
      'Username and password cannot be empty. Authentication failed.';
  }
};
</script>

<template>
  <div>
    <h3>Login Form</h3>
    <form @submit.prevent="handleLogin">
      <label for="username">Username:</label>
      <input
        type="text"
        id="userName"
        name="userName"
        v-model="input.userName"
        @input="validateUserName"
        @blur="validateUserName"
        required
      />
      <p class="error" v-show="showUserNameError">{{ userNameError }}</p>

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="input.password"
        @input="validatePassword"
        @blur="validatePassword"
        required
      />
      <p class="error" v-show="showPasswordError">{{ passwordError }}</p>

      <BasicButton
        :btnType="'button'"
        :btnText="'Create Account'"
        :btnColor="createBtnColor"
        :btnTextColor="createBtnTextColor"
      />
      <BasicButton
        :btnType="'submit'"
        :btnText="'Login'"
        :btnFunction="handleLogin"
        :btnClass="loginBtnClass"
      />

      <p>Output: {{ output }}</p>
    </form>
  </div>
</template>

<style scoped></style>
