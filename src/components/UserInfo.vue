<script setup>
import { defineEmits, onUpdated, ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const tel = ref('');
const userInfo = [firstName, lastName, email, tel];

const emit = defineEmits(['userInfo']);

onUpdated(() => {
  const userInfoValues = userInfo.map((ref) => ref.value);
  emit('userInfo', userInfoValues);
});
</script>

<template>
  <h3>User Info</h3>
  <label for="firstName">First Name</label>
  <input
    type="text"
    name="firstName"
    id="firstName"
    v-model="firstName"
    autocomplete="given-name"
  />
  <label for="lastName">Last Name</label>
  <input
    type="text"
    name="lastName"
    id="lastName"
    v-model="lastName"
    autocomplete="family-name"
  />
  <label for="email">Email</label>
  <input
    type="email"
    name="email"
    id="email"
    v-model="email"
    autocomplete="email"
  />
  <label for="tel">Telephone Number</label>
  <input type="tel" name="tel" id="tel" v-model="tel" autocomplete="tel" />
</template>
