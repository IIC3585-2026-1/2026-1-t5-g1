<template>
  <section class="continue-card">
    <BookCover :book="book" compact />
    <div>
      <p class="eyebrow">Continúa donde lo dejaste</p>
      <h2>{{ book.title }}</h2>
      <span>{{ firstAuthor }}</span>
      <div class="progress-track">
        <span :style="{ width: `${book.progress || 0}%` }"></span>
      </div>
      <p>{{ book.progress || 0 }}% leído</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import BookCover from '../BookCover.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const firstAuthor = computed(() => props.book.authors?.[0] || props.book.author || 'Autor desconocido')
</script>

<style scoped>
.continue-card {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-bottom: 36px;
  padding: 26px;
  border-radius: 20px;
  background: var(--ink);
  color: var(--paper-2);
}

.eyebrow {
  margin: 0;
  color: var(--coffee);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h2 {
  margin: 10px 0 6px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 500;
}

span,
p:last-child {
  color: rgba(251, 246, 236, 0.72);
  font-weight: 700;
}

.progress-track {
  width: min(420px, 100%);
  height: 8px;
  margin-top: 22px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(244, 238, 225, 0.22);
}

.progress-track span {
  display: block;
  height: 100%;
  background: var(--gold);
}

@media (max-width: 720px) {
  .continue-card {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
