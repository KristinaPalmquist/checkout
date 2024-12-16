<script setup>
import LoginButton from '../components/LoginButton.vue';
</script>

<template>
  <div id="home-view">
    <LoginButton />
    <h1>Welcome to The Company</h1>
    <p>
      Welcome to our brand new website! We are thrilled to have you here. Our mission is to provide you with the best products and services to meet all your needs.
    </p>
    <section class="introduction">
      <h2>About Us</h2>
      <p>
        At The Company, we are dedicated to delivering top-notch solutions to our customers. With years of experience in the industry, we pride ourselves on our commitment to quality and customer satisfaction.
      </p>
    </section>
    <section class="features">
      <h2>Our Features</h2>
      <ul>
        <li><strong>High-Quality Products:</strong> We offer a wide range of products that meet the highest standards of quality.</li>
        <li><strong>Exceptional Customer Service:</strong> Our customer service team is here to assist you with any questions or concerns you may have.</li>
        <li><strong>Innovative Solutions:</strong> We continuously innovate to bring you the latest and most effective solutions.</li>
        <li><strong>Global Reach:</strong> Our services are available to customers worldwide, ensuring that you can benefit from our offerings no matter where you are.</li>
      </ul>
    </section>
    <section class="call-to-action">
      <h2>Get Started</h2>
      <p>
        Ready to experience the best in the industry? Click the button below to get started!
      </p>
      <LoginButton />
    </section>
  </div>
</template>

<style scoped>

#home-view {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  margin-bottom: 1rem;
}

h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

p {
  line-height: 1.6;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

li strong {
  display: inline-block;
  width: 200px;
}

.call-to-action {
  margin-top: 2rem;
  align-items: center;
}

.call-to-action p {
  margin-bottom: 1rem;
}
</style>
