<template>
  <div class="spin-panel">
    <button class="spin-button" type="button" :disabled="count < 1 || spinning" @click="$emit('spin')">
      <span class="spark" aria-hidden="true">*</span>
      {{ spinning ? 'Girando...' : 'Girar la ruleta' }}
    </button>
    <p>{{ count }} {{ count === 1 ? 'libro entra' : 'libros entran' }} al sorteo</p>
  </div>
</template>

<script setup>
defineProps({
  count: { type: Number, required: true },
  spinning: { type: Boolean, required: true },
})
defineEmits(['spin'])
</script>

<style scoped>
.spin-panel { text-align: center; }
.spin-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: min(330px, 100%);
  gap: 14px;
  padding: 20px 52px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--gold), #b18a3e);
  box-shadow: 0 20px 50px -16px rgba(194, 160, 91, 0.65);
  color: var(--ink);
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.01em;
  transition: transform 0.16s ease, opacity 0.16s ease;
}
.spin-button:hover { transform: translateY(-2px); }
.spin-button:disabled { cursor: not-allowed; opacity: 0.5; transform: none; }
.spark { font-size: 26px; line-height: 1; }
p {
  margin: 14px 0 0;
  color: rgba(245, 239, 227, 0.5);
  font-size: 13px;
  font-weight: 700;
}
</style>
