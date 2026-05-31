<script lang="ts">
  import '../app.css';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <title>MyBooks — Biblioteca personal</title>
</svelte:head>

<div style="display: flex; min-height: 100vh; background: var(--paper);">
  <Sidebar />

  <main style="flex: 1; min-width: 0; height: 100vh; overflow-y: auto;">
    <div style="padding: 40px 56px;">
      {@render children()}
    </div>
  </main>
</div>
