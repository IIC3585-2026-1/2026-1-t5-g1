<template>
  <aside class="sidebar">
    <RouterLink to="/" class="brand" aria-label="Ir al inicio">
      <span class="brand-mark">M</span>
      <span>
        <strong>MyBooks</strong>
        <small>Biblioteca personal</small>
      </span>
    </RouterLink>

    <nav class="sidebar-nav" aria-label="Navegacion principal">
      <RouterLink to="/" class="nav-item">
        <span class="nav-icon" aria-hidden="true">⌂</span>
        Inicio
      </RouterLink>
      <RouterLink to="/explore" class="nav-item">
        <span class="nav-icon" aria-hidden="true">⌕</span>
        Explorar
      </RouterLink>
      <RouterLink to="/library" class="nav-item">
        <span class="nav-icon" aria-hidden="true">▥</span>
        Mi biblioteca
      </RouterLink>
      <RouterLink to="/statistics" class="nav-item">
        <span class="nav-icon" aria-hidden="true">#</span>
        Estadisticas
      </RouterLink>
      <RouterLink to="/roulette" class="nav-item nav-accent">
        <span class="nav-icon" aria-hidden="true">✳</span>
        Ruleta
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  display: flex;
  width: 260px;
  height: 100vh;
  flex: 0 0 260px;
  flex-direction: column;
  gap: 34px;
  padding: 30px 20px 22px;
  background: var(--paper-2);
  border-right: 1px solid var(--line);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--ink);
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 11px;
  background: var(--ink);
  color: var(--gold);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-style: italic;
  line-height: 1;
}

.brand strong {
  display: block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 25px;
  line-height: 1;
}

.brand small {
  display: block;
  margin-top: 5px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.13em;
  line-height: 1.25;
  text-transform: uppercase;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 14px 16px;
  border-radius: 10px;
  color: var(--ink);
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.18s ease, color 0.18s ease;
}

.nav-icon {
  width: 22px;
  color: currentColor;
  font-size: 20px;
  line-height: 1;
  text-align: center;
}

.nav-item:hover,
.nav-item.router-link-active {
  background: var(--ink);
  color: var(--paper-2);
}

.nav-accent {
  color: var(--coffee);
}

@media (max-width: 768px) {
  .sidebar {
    position: static;
    width: 100%;
    height: auto;
    flex-basis: auto;
    padding: 18px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .sidebar-nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

}
</style>
