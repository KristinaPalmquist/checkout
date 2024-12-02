<script setup>
import { onUpdated, defineEmits, ref } from 'vue';
const paymentMethod = ref('');

const emit = defineEmits(['paymentMethod']);

onUpdated(() => {
  emit('paymentMethod', paymentMethod.value);
});
</script>

<template>
  <h3>Payment method</h3>
  <input
    type="radio"
    id="invoice"
    name="paymentMethod"
    value="invoice"
    v-model="paymentMethod"
  />
  <label for="invoice">Invoice</label><br />
  <input
    type="radio"
    id="card"
    name="paymentMethod"
    value="card"
    v-model="paymentMethod"
  />
  <label for="card">Card</label><br />
  <input
    type="radio"
    id="swish"
    name="paymentMethod"
    value="swish"
    v-model="paymentMethod"
  />
  <label for="swish">Swish</label>
</template>
