<script setup>
import { ref } from 'vue';

import AddressForm from './AddressForm.vue';

const props = defineProps(['billingAddress']);
const address = ref(props.billingAddress || []);
const emit = defineEmits(['billingAddress']);

const handleAddress = (info) => {
  address.value = info;
  emit('billingAddress', address.value);
};
</script>

<template>
  <div id="billing-address">
    <AddressForm
      idPrefix="billing-"
      @address="handleAddress"
      :address="address"
    />
  </div>
</template>
