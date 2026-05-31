<template>
  <header class="hero">
    <p class="eyebrow">Mi biblioteca</p>
    <h1>Bienvenido/a a tu colección personal.</h1>
    <p>Tu biblioteca tiene {{ totalBooks }} libros guardados.</p>
  </header>
</template>

<script setup>
defineProps({
  totalBooks: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
.hero {
  margin-bottom: 34px;
}

.eyebrow {
  margin: 0;
  color: var(--coffee);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h1 {
  margin: 12px 0 0;
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 5vw, 56px);
  font-weight: 500;
}

p:last-child {
  margin: 10px 0 0;
  color: var(--ink-soft);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-style: italic;
}
</style>
