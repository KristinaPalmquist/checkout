<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
const successMessage = ref('');
const formContent = ref([]);

const handleSubmit = () => {
  // Here you would typically handle form submission, e.g., send data to a server
  successMessage.value =
    'Thank you for contacting us. We will get back to you shortly.';
  formContent.value = [
    `Name: ${name.value}`,
    `Email: ${email.value}`,
    `Subject: ${subject.value}`,
    `Message: ${message.value}`,
  ];
  name.value = '';
  email.value = '';
  subject.value = '';
  message.value = '';
};
</script>

<template>
  <div>
    <h2>Contact Us</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="subject">Subject</label>
        <input type="text" id="subject" v-model="subject" required />
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" v-model="message" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="successMessage">{{ successMessage }}</p>
    <div v-if="formContent">
      <h4>Sent message:</h4>
      <p v-for="(content, index) in formContent" :key="index">{{ content }}</p>
    </div>
  </div>
</template>

<style scoped>


button {
  padding: 0.5rem 1rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: var(--dark-accent-color);
}

p {
  margin-top: 1rem;
  color: var(--dark-accent-color);
  font-weight: bold;
  text-align: center;
}
</style>
