<script setup>
import { defineProps, onUpdated, ref } from 'vue';

const props = defineProps(['idPrefix']);
const idPrefix = props.idPrefix;

const street = ref('');
const streetAdditional = ref('');
const zip = ref('');
const city = ref('');
const country = ref('');
const address = [street, streetAdditional, zip, city, country];

const emit = defineEmits(['address']);

onUpdated(() => {
  const addressValues = address.map((ref) => ref.value);
  emit('address', addressValues);
});
</script>

<template>
  <form>
    <label :for="idPrefix + 'street'">Street Address</label>
    <input
      type="text"
      name="street"
      :id="idPrefix + 'street'"
      v-model="street"
      autocomplete="address-line1"
    />
    <label :for="idPrefix + 'streetAdditional'"
      >Street Address (optional)</label
    >
    <input
      type="text"
      name="streetAdditional"
      :id="idPrefix + 'streetAdditional'"
      v-model="streetAdditional"
      autocomplete="address-line2"
    />
    <label :for="idPrefix + 'zip'">Postal Code</label>
    <input
      type="text"
      name="zip"
      :id="idPrefix + 'zip'"
      v-model="zip"
      autocomplete="postal-code"
    />
    <label :for="idPrefix + 'city'">City</label>
    <input type="text" name="city" :id="idPrefix + 'city'" v-model="city" autocomplete="address-level2"/>
    <label :for="idPrefix + 'country'">Country</label>
    <input
      type="text"
      name="country"
      :id="idPrefix + 'country'"
      v-model="country"
      autocomplete="country"
    />
  </form>
</template>
