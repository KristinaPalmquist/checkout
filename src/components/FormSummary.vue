<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps(['formData']);

const userInfo = ref(props.formData[0]);
const billingAddress = ref(props.formData[1]);
const deliveryAddress = ref(props.formData[2]);
const paymentMethod = ref(props.formData[3]);

const goBack = () => {
  window.history.back();
};
const handleSubmit = () => {
  const formData = [
    userInfo.value,
    billingAddress.value,
    deliveryAddress.value,
    paymentMethod.value,
  ];
};
</script>

<template>
  <div v-show="formData">
    <h2>Summary</h2>
    <h3>User Info</h3>
    <p>First Name: {{ userInfo[0] }}</p>
    <p>Last Name: {{ userInfo[1] }}</p>
    <p>Email: {{ userInfo[2] }}</p>
    <p>Telephone Number: {{ userInfo[3] }}</p>
    <h3>Billing Address</h3>
    <p>Street: {{ billingAddress[0] }}</p>
    <p>Street Additional: {{ billingAddress[1] }}</p>
    <p>Zip Code: {{ billingAddress[2] }}</p>
    <p>City: {{ billingAddress[3] }}</p>
    <p>Country: {{ billingAddress[4] }}</p>
    <h3>Delivery Address</h3>
    <p>Street: {{ deliveryAddress[0] }}</p>
    <p>Street Additional: {{ deliveryAddress[1] }}</p>
    <p>Zip Code: {{ deliveryAddress[2] }}</p>
    <p>City: {{ deliveryAddress[3] }}</p>
    <p>Country: {{ deliveryAddress[4] }}</p>
    <h3>Payment Method</h3>
    <p>{{ paymentMethod }}</p>

    <button @click="goBack">Go Back</button>
    <button @click="handleSubmit">Submit</button>
  </div>
</template>

<style scoped></style>
