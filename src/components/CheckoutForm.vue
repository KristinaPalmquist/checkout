<script setup>
import BillingAddress from './BillingAddress.vue';
import DeliveryAddress from './DeliveryAddress.vue';
import UserInfo from './UserInfo.vue';
import PaymentMethod from './PaymentMethod.vue';
import { ref } from 'vue';

const userInfo = ref([]);
const billingAddress = ref([]);
const deliveryAddress = ref([]);
const paymentMethod = ref([]);
let formData = [];

const handleUserInfo = (info) => {
  userInfo.value = info;
};

const handleBillingAddress = (address) => {
  billingAddress.value = address;
};

const handleDeliveryAddress = (address) => {
  deliveryAddress.value = address;
};

const handlePaymentMethod = (method) => {
  paymentMethod.value = method;
};

const clearForm = () => {
  userInfo = {};
  billingAddress = {};
  deliveryAddress = {};
  paymentMethod = {};
  console.log('Form cleared');
};

const emit = defineEmits(['formData']);

const onSubmit = () => {
  formData = [userInfo, billingAddress, deliveryAddress, paymentMethod];
  emit('formData', formData);
  console.log('Form submitted');
  // console.log(formData);
  // console.log(formData[0]);
  // console.log(formData[0].value);
  // console.log(formData[0].value[0]);
};
</script>

<template>
  <form id="checkoutForm" @submit.prevent="onSubmit">
    <h2>Checkout</h2>
    <UserInfo @userInfo="handleUserInfo" />
    <BillingAddress @billingAddress="handleBillingAddress" />
    <DeliveryAddress @deliveryAddress="handleDeliveryAddress" />
    <PaymentMethod @paymentMethod="handlePaymentMethod" />

    <button type="clear" @click="clearForm">Clear form</button>
    <button type="submit">Submit</button>
  </form>
</template>

<style>
/* #checkoutForm label {
  margin-right: 1rem;
} */
#checkoutForm {
  background-color: #eee;
  padding: 2rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
}
#checkoutForm input {
  background-color: #fff;
}

#checkoutForm input[type='text'],
#checkoutForm input[type='email'],
#checkoutForm input[type='tel'] {
  width: 100%;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

#checkoutForm input[type='radio'],
#checkoutForm input[type='checkbox'] {
  margin-right: 1rem;
}
</style>
