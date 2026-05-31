<script setup>
  import SideBar from "./components/sideBar.vue";
</script>


<template>
  <div class="layout">
    <SideBar/>
    <main class="main-content">
      <RouterView/>
    </main>
  </div>
</template>


<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: var(--paper);
}

.main-content {
  flex: 1;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  padding: 40px 56px;
}

@media (max-width: 900px) {
  .layout {
    display: block;
  }

  .main-content {
    height: auto;
    min-height: 100vh;
    padding: 24px;
  }
}
</style>
