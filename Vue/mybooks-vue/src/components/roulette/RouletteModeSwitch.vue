<template>
  <div class="mode-switch" aria-label="Modo de sorteo">
    <button type="button" :class="{ active: modelValue === 'all' }" @click="$emit('update:modelValue', 'all')">
      <span aria-hidden="true">♡</span>
      Toda la wishlist
    </button>
    <button type="button" :class="{ active: modelValue === 'manual' }" @click="$emit('update:modelValue', 'manual')">
      <span aria-hidden="true">✓</span>
      Selección manual
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.mode-switch {
  display: flex;
  width: fit-content;
  max-width: 100%;
  gap: 6px;
  margin: 0 auto 28px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.34);
}
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 190px;
  gap: 9px;
  padding: 12px 22px;
  border-radius: 999px;
  background: transparent;
  color: rgba(245, 239, 227, 0.76);
  cursor: pointer;
  font-weight: 800;
}
button.active { background: var(--gold); color: var(--ink); }
@media (max-width: 760px) {
  .mode-switch { width: 100%; flex-direction: column; border-radius: 24px; }
  button { min-width: 0; }
}
</style>
