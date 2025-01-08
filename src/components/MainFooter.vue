<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer id="main-footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h2>About Us</h2>
        <p>
          We are a company dedicated to providing the best products and services
          to our customers.
        </p>
      </div>
      <div class="footer-section links">
        <h2>Quick Links</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/categories">Categories</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section contact">
        <h2>Contact Us</h2>
        <p>Email: info@example.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
      <div class="footer-section social">
        <h2>Follow Us</h2>
        <ul>
          <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
          <li><a href="https://x.com" target="_blank">Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; Kristina Palmquist, {{ currentYear }}</p>
    </div>
  </footer>
</template>

<style scoped>
#main-footer {
  /* background-color: var(--background-color); */
  background-color: var(--color-background-transparent);
  width: 100%;
  padding: 2rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

#main-footer .footer-content {
  width: clamp(300px, 80%, 1200px);
  display: flex;
  justify-content: space-between;
  margin: 0.5rem auto 2rem;
}

.footer-section {
  flex: 1;
  padding: 1rem;
}

.footer-section h2 {
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li,
.footer-section p,
.footer-bottom p {
  margin-bottom: 0.5rem;
}

.footer-section ul li {
    margin-left: 3rem;
}


.footer-section ul li a img {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}


.footer-bottom {
  /* width: clamp(300px, 80%, 1200px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem auto; */

  text-align: center;
  padding: 1rem 0;
  border-top: 1px solid var(--color-text);
  width: 100%;
}
</style>
