<script setup>
import { ref } from 'vue';

const props = defineProps(['idPrefix', 'address']);
const idPrefix = props.idPrefix;

const emit = defineEmits(['address']);

const street = ref(props.address[0] ||'');
const streetAdditional = ref(props.address[1] ||'');
const zip = ref(props.address[2] ||'');
const city = ref(props.address[3] ||'');
const country = ref(props.address[4] ||'');
const address = [street, streetAdditional, zip, city, country];

const streetError = ref('');
const zipError = ref('');
const cityError = ref('');
const countryError = ref('');

const validateStreet = () => {
  streetError.value = street.value ? '' : 'Street address is required.';
  emitAddress();
};

const validateZip = () => {
  zipError.value = zip.value ? '' : 'ZIP code is required.';
  emitAddress();
};

const validateCity = () => {
  cityError.value = city.value ? '' : 'City is required.';
  emitAddress();
};

const validateCountry = () => {
  countryError.value = country.value ? '' : 'Country is required.';
  emitAddress();
};

const emitAddress = () => {
  const addressValues = address.map((ref) => ref.value);
  emit('address', addressValues);
};
</script>

<template>
  <form>
    <label :for="idPrefix + 'street'">Street Address</label>
    <input
      type="text"
      name="street"
      :id="idPrefix + 'street'"
      v-model="street"
      required
      @input="validateStreet"
      @blur="validateStreet"
      autocomplete="address-line1"
    />
    <span class="error" v-if="streetError">{{ streetError }}</span>

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
      required
      @input="validateZip"
      @blur="validateZip"
      autocomplete="postal-code"
    />
    <span class="error" v-if="zipError">{{ zipError }}</span>

    <label :for="idPrefix + 'city'">City</label>
    <input
      type="text"
      name="city"
      :id="idPrefix + 'city'"
      v-model="city"
      required
      @input="validateCity"
      @blur="validateCity"
      autocomplete="address-level2"
    />
    <span class="error" v-if="cityError">{{ cityError }}</span>

    <label :for="idPrefix + 'country'">Country</label>
    <input
      type="text"
      name="country"
      :id="idPrefix + 'country'"
      v-model="country"
      required
      @input="validateCountry"
      @blur="validateCountry"
      autocomplete="country"
    />
    <span class="error" v-if="countryError">{{ countryError }}</span>
  </form>
</template>
