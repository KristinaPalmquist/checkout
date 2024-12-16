<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BasicButton from './BasicButton.vue';

const router = useRouter();

const btnText = ref('Login');

const handleLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div id="login-button">
    <BasicButton :btnText="btnText" :btnFunction="handleLogin" />
  </div>
</template>

<style scoped>
#login-button {
  display: flex;
  justify-content: flex-end;
}
</style>
