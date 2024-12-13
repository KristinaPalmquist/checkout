<script setup>
import { ref } from 'vue';

import AddressForm from './AddressForm.vue';

// const useSameAddress = ref();

const props = defineProps(['deliveryAddress']);
const address = ref(props.deliveryAddress || []);
const emit = defineEmits(['deliveryAddress']);

const handleAddress = (info) => {
  address.value = info;
  emit('deliveryAddress', address.value);
};

// onUpdated(() => {
//   if (useSameAddress.value === true) {
//   } else if (useSameAddress.value === false) {
//     handleAddress(address);
//   }
//   handleAddress(address);
// });
</script>
<template>
  <div id="delivery-address">
    <!-- <input
    type="checkbox"
    name="sameAddress"
    id="sameAddress"
    v-model="useSameAddress"
  />
  <label for="sameAddress">Use Billing Address</label> -->
    <AddressForm
      idPrefix="delivery-"
      @address="handleAddress"
      :address="address"
    />
  </div>
</template>
