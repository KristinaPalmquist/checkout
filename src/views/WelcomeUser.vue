<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { GET_USERNAME } from '@/store/storeconstants';

const store = useStore();
const userName = ref(store.getters[`auth/${GET_USERNAME}`] || 'User');
</script>

<template>
  <div id="welcome-user" class="component-container">
    <h1>Welcome, {{ userName }}!</h1>
    <p>
      We're thrilled to have you here at Retro Retreat, your go-to destination for sustainable fashion. Explore our curated collection of pre-loved clothing and accessories, and find unique pieces that suit your style.
    </p>
    <!-- <section class="quick-links">
      <h2>Quick Links</h2>
      <ul>
        <li><router-link to="/new-arrivals">New Arrivals</router-link></li>
        <li><router-link to="/categories/vintage">Vintage Collection</router-link></li>
        <li><router-link to="/categories/accessories">Accessories</router-link></li>
        <li><router-link to="/categories/sale">Sale</router-link></li>
      </ul>
    </section> -->
    <!-- <section class="featured">
      <h2>Featured Items</h2>
    </section> -->
  </div>
</template>

<style scoped>


.quick-links {
  margin-bottom: 2rem;
  width: clamp(20rem, 50%, 30rem);
  margin: 2rem auto;
  text-align: center;
}

.quick-links ul {
  list-style-type: none;
  padding: 0;
}

.quick-links li {
  margin: 0.5rem 0;
}


.quick-links a:hover {
  text-decoration: underline;
}

.featured {
  margin-top: 2rem;
}


</style>
