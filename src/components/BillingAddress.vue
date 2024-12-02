<script setup>
import { defineEmits, onUpdated, ref } from 'vue';
import AddressForm from './AddressForm.vue';

const address = ref([]);

const emit = defineEmits(['billingAddress']);

const handleAddress = (address) => {
  emit('billingAddress', address);
};

onUpdated(() => {
  handleAddress(address);
});
</script>

<template>
  <h3>Billing Address</h3>
  <AddressForm idPrefix="billing-" @address="handleAddress" />
</template>
