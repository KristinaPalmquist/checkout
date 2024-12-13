<script setup>
import { ref } from 'vue';

const props = defineProps(['userInfo']);
const emit = defineEmits(['userInfo']);

const firstName = ref(props.userInfo[0] || '');
const lastName = ref(props.userInfo[1] || '');
const email = ref(props.userInfo[2] || '');
const tel = ref(props.userInfo[3] || '');
const userInfo = [firstName, lastName, email, tel];

const firstNameError = ref('');
const lastNameError = ref('');
const emailError = ref('');
const telError = ref('');

const validateFirstName = () => {
  firstNameError.value = firstName.value ? '' : 'First name is required';
  emitUserInfo();
};

const validateLastName = () => {
  lastNameError.value = lastName.value ? '' : 'Last name is required';
  emitUserInfo();
};

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = email.value
    ? emailPattern.test(email.value)
      ? ''
      : 'Invalid email address'
    : 'Email is required';
  emitUserInfo();
};

const validateTel = () => {
  telError.value = tel.value ? '' : 'Phone number is required';
  // Add validation with regex pattern
  emitUserInfo();
};

const emitUserInfo = () => {
  const userInfoValues = userInfo.map((ref) => ref.value);
  emit('userInfo', userInfoValues);
};
</script>

<template>
  <div id="user-info">
    <label for="firstName">First Name</label>
    <input
      type="text"
      name="firstName"
      id="firstName"
      v-model="firstName"
      required
      @input="validateFirstName"
      @blur="validateFirstName"
      autocomplete="given-name"
    />
    <span class="error" v-if="firstNameError">{{ firstNameError }}</span>

    <label for="lastName">Last Name</label>
    <input
      type="text"
      name="lastName"
      id="lastName"
      v-model="lastName"
      required
      @input="validateLastName"
      @blur="validateLastName"
      autocomplete="family-name"
    />
    <span class="error" v-if="lastNameError">{{ lastNameError }}</span>

    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      v-model="email"
      required
      @input="validateEmail"
      @blur="validateEmail"
      autocomplete="email"
    />
    <span class="error" v-if="emailError">{{ emailError }}</span>

    <label for="tel">Telephone Number</label>
    <input
      type="tel"
      name="tel"
      id="tel"
      v-model="tel"
      required
      @input="validateTel"
      @blur="validateTel"
      autocomplete="tel"
    />
    <span class="error" v-if="telError">{{ telError }}</span>
  </div>
</template>

<style scoped></style>
