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
}

.main-content {
  flex: 1;
  padding: 3rem;
}
</style>
