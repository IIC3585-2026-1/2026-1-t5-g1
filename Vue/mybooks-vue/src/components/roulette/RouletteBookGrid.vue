<template>
  <div class="covers-grid">
    <button
      v-for="book in books"
      :key="book.id"
      class="cover-option"
      :class="{ off: manual && !picked.has(book.id) }"
      type="button"
      :disabled="!manual || disabled"
      @click="$emit('toggle', book.id)"
    >
      <span v-if="manual" class="check" aria-hidden="true">{{ picked.has(book.id) ? '✓' : '' }}</span>
      <BookCover :book="book" />
      <span class="book-title">{{ book.title }}</span>
    </button>
  </div>
</template>

<script setup>
import BookCover from '../BookCover.vue'

defineProps({
  books: { type: Array, required: true },
  manual: { type: Boolean, required: true },
  picked: { type: Set, required: true },
  disabled: { type: Boolean, default: false },
})
defineEmits(['toggle'])
</script>

<style scoped>
.covers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(116px, 1fr));
  gap: 18px;
  margin: 0 auto 36px;
}
.cover-option {
  position: relative;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
  transition: opacity 0.18s ease, transform 0.18s ease, filter 0.18s ease;
}
.cover-option:disabled { 
  cursor: default; 
}
.cover-option.off { 
  opacity: 0.34; 
  filter: grayscale(0.55); 
  transform: scale(0.96); 
}
.cover-option :deep(.cover) {
  border-radius: 18px;
  box-shadow: 0 18px 34px -18px rgba(0, 0, 0, 0.85);
}
.book-title {
  display: block;
  margin-top: 9px;
  overflow: hidden;
  color: rgba(245, 239, 227, 0.76);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.check {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  color: var(--ink);
  font-weight: 900;
}
.cover-option:not(.off) .check { 
  border-color: var(--gold); 
  background: var(--gold); 
}
@media (max-width: 760px) {
  .covers-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
