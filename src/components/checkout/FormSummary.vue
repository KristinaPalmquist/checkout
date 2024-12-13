<script setup>
import { ref } from 'vue';

const props = defineProps(['formData']);
const emit = defineEmits(['cancel']);

const userInfo = ref(props.formData[0]);
const billingAddress = ref(props.formData[1]);
const deliveryAddress = ref(props.formData[2]);
const paymentMethod = ref(props.formData[3]);

const formData = ref([
  userInfo.value,
  billingAddress.value,
  deliveryAddress.value,
  paymentMethod.value,
]);

const onCancel = () => {
  emit('cancel');
};
const handleSubmit = () => {
  formData.value = [
    userInfo.value,
    billingAddress.value,
    deliveryAddress.value,
    paymentMethod.value,
  ];
};
</script>

<template>
  <div id="form-summary">
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

    <div class="btn-div">
      <button type="button" @click="onCancel">Cancel</button>
      <button type="submit" @click="handleSubmit" class="cta-btn">
        Submit
      </button>
    </div>
  </div>
</template>

<style scoped>
#form-summary {
  background-color: #eee;
  padding: 2rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  margin: 1rem 0;
  border: 1px solid #ccc;
  color: #000;
}

#form-summary h3 {
  margin-top: 0.5rem;
}
</style>
