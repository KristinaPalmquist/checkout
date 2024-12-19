<script setup></script>

<template>
  <div id="not-found" class="component-container">
    <h1>404 - Page Not Found</h1>
    <p class="large">Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<style scoped>
#not-found {
  text-align: center;
  padding: 2rem;
}
/* 
.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.not-found a {
  color: #007bff;
  text-decoration: none;
}

.not-found a:hover {
  text-decoration: underline;
} */
</style>
