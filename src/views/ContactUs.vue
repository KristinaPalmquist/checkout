<script setup>
import BasicButton from '@/components/BasicButton.vue';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
// const formContent = ref([]);
const formContent = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const showSentMessage = ref(false);

const clearForm = () => {
  name.value = '';
  email.value = '';
  subject.value = '';
  message.value = '';
};

const handleSubmit = () => {
  // Here you would typically handle form submission, e.g., send data to a server
  // successMessage.value =
  formContent.value = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };
  showSentMessage.value = true;
  name.value = '';
  email.value = '';
  subject.value = '';
  message.value = '';
};
</script>

<template>
  <div id="contact-us">
    <div class="contact-form">
      <h1>Contact Us</h1>
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
          <textarea id="message" v-model="message" rows="7" required></textarea>
        </div>
        <div class="btn-div">
          <BasicButton
            :btnType="button"
            :btnText="'Clear'"
            :btnFunction="clearForm"
          />
          <BasicButton
            :btnType="submit"
            :btnText="'Submit'"
            :btnClass="'cta-btn'"
            :btnFunction="handleSubmit"
          />
        </div>
      </form>
    </div>
    <div class="contact-messages">
      <div v-if="showSentMessage">
        <div class="sent-message">
          <h2>Sent message</h2>
          <div
            v-for="(content, key) in formContent"
            :key="key"
            class="message-item"
          >
            <span class="message-key">{{ key }}:</span>
            <span class="message-value">{{ content }}</span>
          </div>
        </div>
        <div class="message">
          <p>Thank you for contacting us!</p>
          <p>We will get back to you shortly.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#contact-us {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: calc(100vh - 3rem);
}

.contact-form {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}
.contact-form form {
  width: 100%;
}

.contact-form label,
.contact-form input,
.contact-form textarea {
  display: block;
  width: 90%;
  margin: auto;
}

.contact-messages {
  height: 80vh;
}

.contact-messages > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding-bottom: 15%;
  gap: 1rem;
}

.contact-messages .message {
  text-align: center;
  margin: 0 auto;
}

.sent-message {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  text-align: left;
  padding-left: 15%;
}

.message-item {
  display: grid;
  grid-template-columns: 5rem 1fr;
  margin-bottom: 0.5rem;
}

.message-key {
  font-weight: bold;
}

.message-value {
  padding-left: 1rem;
}
</style>
