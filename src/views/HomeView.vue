<script setup>
import CategoriesSmall from '@/components/CategoriesSmall.vue';
import { ref, onMounted } from 'vue';
const companyName = ref('Retro Retreat');
const heroImageSrc = ref('../assets/images/hero.jpg');
const heroRef = ref(null);
const categoriesRef = ref(null);

onMounted(() => {
  const heroElement = heroRef.value;
  if (heroElement) {
    heroElement.style.position = 'absolute';
    heroElement.style.top = '0';
    heroElement.style.left = '0';
    heroElement.style.width = '100vw';
    heroElement.style.height = '100vh';
  }

  const categoriesElement = categoriesRef.value;
  if (categoriesElement) {
    const updateCategoriesWidth = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth > 600) {
        const offsetLeft = categoriesElement.getBoundingClientRect().left;
        categoriesElement.style.position = 'relative';
        categoriesElement.style.left = `-${offsetLeft}px`;
        categoriesElement.style.width = `${viewportWidth}px`;
      } else {
        categoriesElement.style.position = 'relative';
        categoriesElement.style.left = '0';
        categoriesElement.style.width = '100%';
      }
      // const viewportWidth = window.innerWidth;
      // const offsetLeft = categoriesElement.getBoundingClientRect().left;
      // categoriesElement.style.position = 'relative';
      // categoriesElement.style.left = `-${offsetLeft}px`;
      // categoriesElement.style.width = `${viewportWidth}px`;
    };

    updateCategoriesWidth();
    window.addEventListener('resize', updateCategoriesWidth);

    return () => {
      window.removeEventListener('resize', updateCategoriesWidth);
    };
  }
});
</script>

<template>
  <div id="home-view" class="component-container">
    <div class="hero" ref="heroRef">
      <img
        :src="heroImageSrc"
        alt="Welcome to Retro Retreat"
        class="hero-image"
      />
      <div class="fade-down"></div>
      <div class="glass-card">
        <div class="hero-text">
          <h1>Welcome to {{ companyName }}</h1>
          <p>
            Discover a treasure trove of preworn fashion, second-hand, and
            vintage clothing. We are delighted to have you here.
          </p>
        </div>
      </div>
    </div>
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
    <section class="categories">
      <div class="categories-wrapper" ref="categoriesRef">
        <h2>Browse our categories</h2>
        <CategoriesSmall />
      </div>
    </section>
  </div>
</template>

<style scoped>
#home-view {
  background-color: var(--background-color);
}
.hero {
  position: relative;
  text-align: center;
  overflow: hidden;
  z-index: -2;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  background-color: var(--background-color);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
  border: none;
}

.fade-down {
  position: absolute;
  left: 0;
  right: 0;
  top: 70%;
  height: 30%;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(
    to top,
    var(--gradient-start),
    var(--gradient-end)
  );
  border: none;
}

.glass-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  width: clamp(300px, 50%, 900px);
  /* height: max-content; */
  text-align: center;
}

.hero-text {
  color: white;
  /* border-radius: 1rem; */
  z-index: 1;
}

.hero-text h1,
.hero-text p {
  color: white;
  /* z-index: 1; */
}

.hero-text h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* .hero-text */

.introduction {
  margin-top: 100vh;
}

.features {
  margin-top: 2rem;
}

.features ul {
  list-style-type: none;
  padding: 0;
}

.features li {
  margin-bottom: 1rem;
}

.categories {
  position: relative;
  max-width: 100%;
}

.categories-wrapper {
  /* position: absolute;
  width: 100%; */
  /* max-width: 100vw; */
  overflow: hidden;
}

@media only screen and (max-width: 600px) {
  .glass-card {
    padding: 1rem;
  }

  .hero-text h1 {
    font-size: 2rem;
  }

  .hero-text p {
    font-size: 1rem;
  }
  /* .categories {
  display: flex;
  align-items: center;
  justify-content: center;
} */
  /* .categories-wrapper {
    left: 1rem;
    max-width: calc(100vw - 2rem);
  } */
}
</style>
