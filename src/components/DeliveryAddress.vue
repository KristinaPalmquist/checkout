<script setup>
import { defineEmits, onUpdated, ref } from 'vue';
import AddressForm from './AddressForm.vue';

const useSameAddress = ref();

const handleAddress = (address) => {
  emit('deliveryAddress', address);
};

const emit = defineEmits(['deliveryAddress']);

onUpdated(() => {
  if (useSameAddress.value === true) {

  } else if (useSameAddress.value === false) {
    handleAddress(address);
  }
  handleAddress(address);
});
</script>
<template>
  <h3>Delivery Address</h3>
  <input
    type="checkbox"
    name="sameAddress"
    id="sameAddress"
    v-model="useSameAddress"
  />
  <label for="sameAddress">Use Billing Address</label>
  <AddressForm
    idPrefix="delivery-"
    @address="handleAddress"
    autocomplete="section-* shipping"
    v-show="!useSameAddress"
  />
</template>
