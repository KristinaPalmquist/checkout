<script setup>
import LoginButton from '../components/LoginButton.vue';

const companyName = 'Retro Retreat';
</script>

<template>
  <div id="home-view" class="component-container">
    <LoginButton />
    <h1>Welcome to {{ companyName }}</h1>
    <p>
      Discover a treasure trove of preworn fashion, second-hand, and vintage
      clothing. We are delighted to have you here at {{ companyName }}.
    </p>
    <section class="introduction">
      <h2>About Us</h2>
      <p>
        At {{ companyName }}, we are passionate about sustainable fashion. Our
        curated collection of pre-loved clothing offers unique styles and
        timeless pieces that you won't find anywhere else.
      </p>
    </section>
    <section class="features">
      <h2>Our Features</h2>
      <ul>
        <li>
          <strong>Curated Selection:</strong> Each item is carefully selected to
          ensure quality and style.
        </li>
        <li>
          <strong>Sustainable Fashion:</strong> By choosing second-hand, you're
          making a positive impact on the environment.
        </li>
        <li>
          <strong>Exceptional Customer Service:</strong> Our team is here to
          help you find the perfect piece and answer any questions you may have.
        </li>
      </ul>
    </section>
  </div>

</template>

<style scoped>




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

</style>
