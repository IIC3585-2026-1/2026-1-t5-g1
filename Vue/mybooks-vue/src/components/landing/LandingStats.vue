<template>
  <section class="stats-grid" aria-label="Resumen de biblioteca">
    <button
      v-for="tile in statTiles"
      :key="tile.key"
      class="stat-card"
      type="button"
      @click="$emit('open-library')"
    >
      <span class="stat-icon" :class="`stat-${tile.key}`" v-html="tile.icon"></span>
      <strong>{{ counts[tile.key] }}</strong>
      <span>{{ tile.label }}</span>
    </button>
  </section>
</template>

<script setup>
defineProps({
  counts: {
    type: Object,
    required: true,
  },
})

defineEmits(['open-library'])

const icons = {
  reading: '<svg viewBox="0 0 24 24"><path d="M4 5.5c2.6 0 5 .7 8 2.5 3-1.8 5.4-2.5 8-2.5v12c-2.6 0-5 .7-8 2.5-3-1.8-5.4-2.5-8-2.5z"/><path d="M12 8v12"/></svg>',
  read: '<svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg>',
  wishlist: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9.2C1.6 7.3 3.7 4 7.2 4c2 0 3.6 1.1 4.8 2.8C13.2 5.1 14.8 4 16.8 4c3.5 0 5.6 3.3 4.2 6.8C19 15.6 12 20 12 20z"/></svg>',
  recommended: '<svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"/></svg>',
}

const statTiles = [
  { key: 'reading', label: 'Leyendo', icon: icons.reading },
  { key: 'read', label: 'Leído', icon: icons.read },
  { key: 'wishlist', label: 'Wishlist', icon: icons.wishlist },
  { key: 'recommended', label: 'Recomendado', icon: icons.recommended },
]
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 30px;
}
.stat-card {
  min-height: 50px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 15px;
  background: rgba(251, 246, 236, 0.84);
  color: var(--ink);
  cursor: pointer;
  text-align: left;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}
.stat-card:hover {
  border-color: var(--line-2);
  box-shadow: 0 18px 36px -28px rgba(60, 44, 28, 0.65);
  transform: translateY(-3px);
}
.stat-icon {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
}
.stat-icon :deep(svg) {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}
.stat-icon { margin-bottom: 10px; }
.stat-reading { color: var(--coffee); }
.stat-read { color: var(--sage-deep); }
.stat-wishlist { color: var(--burgundy); }
.stat-recommended { color: var(--gold-deep); }
strong {
  display: block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 44px;
  font-weight: 500;
  line-height: 1;
}
.stat-card span:last-child { display: block; margin-top: 6px; color: var(--ink-soft); font-size: 16px; }
@media (max-width: 1040px) {
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 720px) {
  .stats-grid { grid-template-columns: 1fr; }
}
</style>
