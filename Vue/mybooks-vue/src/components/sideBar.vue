<template>
  <div class="layout">
    <aside>
      <div class="sidebar-header">
        <h2>MyBooks</h2>
      </div>
      <nav class="sidebar-nav">
        <RouterLink to="/" class="nav-item">Inicio</RouterLink>
        <RouterLink to="/explore" class="nav-item">Explorar</RouterLink>
        <RouterLink to="/library" class="nav-item">Biblioteca</RouterLink>
        <RouterLink to="/roulette" class="nav-item">Ruleta</RouterLink>
      </nav>
    </aside>
    <main class="main-content">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: rgb(251, 246, 241);
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.nav-item {
  padding: 1rem;
  text-decoration: none;
  transition: background 0.2s;
}

.nav-item:hover {
  background: rgba(255,255,255,0.1);
}

.nav-item.router-link-active {
  background: rgba(255,255,255,0.2);
}

.main-content {
  flex: 1;
  padding: 2rem;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    transform: translateX(-100%);
  }

}
</style>