<script setup>
// import { useRouter } from 'vue-router';
import LoginButton from '../components/LoginButton.vue';
// import LoginForm from './LoginForm.vue';
// import CheckoutForm from './CheckoutForm.vue';
// import FormSummary from '../components/FormSummary.vue';

// const router = useRouter();

// const showLoginForm = ref(false);
// const showCheckoutForm = ref(true);
// const showFormSummary = ref(false);
// const formData = ref([]);

// const handleFormData = (data) => {
//   formData.value = data;
//   showCheckoutForm.value = false;
//   showFormSummary.value = true;
// };

// const handleCancel = () => {
//   showCheckoutForm.value = true;
//   showFormSummary.value = false;
// };

// const handleShowLoginForm = (value) => {
//   showLoginForm.value = value;
//   if (showLoginForm.value) {
//     showCheckoutForm.value = false;
//     showFormSummary.value = false;
//   }
// };

// const handleShowCheckoutForm = (value) => {
//   showCheckoutForm.value = value;
// };
</script>

<template>
  <div id="home-view">
    <LoginButton />
    <p>This is the brand new website for the company!</p>
    <p>
      Our hope is that it is here you will come to fulfill all of your needs
      from now on.
    </p>
    <!-- <LoginButton>
      v-if="!showLoginForm"
      @showLoginForm="handleShowLoginForm"
      @showCheckoutForm="handleShowCheckoutForm"
    /> -->
    <!-- <LoginForm v-if="showLoginForm" />

    <CheckoutForm @formData="handleFormData" v-if="showCheckoutForm" />
    <FormSummary
      v-if="showFormSummary"
      :formData="formData"
      @cancel="handleCancel"
    /> -->
  </div>
</template>

<style scoped></style>
