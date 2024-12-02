<script setup>
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import CheckoutForm from './components/CheckoutForm.vue';
import FormSummary from './components/FormSummary.vue';

const formData = ref([]);

const handleFormData = (formDataReceived) => {
  formData.value = formDataReceived;
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <CheckoutForm @formData="handleFormData" v-if="formData.length == 0" />
    <FormSummary :formData="formData" v-if="formData.length > 0" />
    <!-- <TheWelcome /> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
