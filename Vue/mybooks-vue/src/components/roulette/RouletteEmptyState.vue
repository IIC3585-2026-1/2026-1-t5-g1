<template>
  <div class="empty-state">
    <h2>La ruleta necesita libros</h2>
    <p>Agrega libros a tu wishlist y gira la ruleta.</p>
    <RouterLink to="/explore">Explorar libros</RouterLink>
  </div>
</template>

<style scoped>
.empty-state {
  max-width: 560px;
  margin: 64px auto 0;
  padding: 54px;
  border: 1px dashed rgba(255, 255, 255, 0.22);
  border-radius: 18px;
  text-align: center;
}
h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 32px;
  font-weight: 500;
}
p { color: rgba(245, 239, 227, 0.68); }
a {
  display: inline-flex;
  margin-top: 8px;
  padding: 13px 22px;
  border-radius: 999px;
  background: var(--gold);
  color: var(--ink);
  font-weight: 800;
  text-decoration: none;
}
</style>
