<template>
  <article class="book-card">
    <BookCover :book="book" />
    <h3>{{ book.title }}</h3>
    <p>{{ firstAuthor }}</p>
    <slot />
  </article>
</template>

<script setup>
import { computed } from 'vue'
import BookCover from './BookCover.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const firstAuthor = computed(() => props.book.authors?.[0] || props.book.author || 'Autor desconocido')
</script>

<style scoped>
.book-card {
  min-width: 0;
  max-width: 200px;
}

.book-card :deep(.cover) {
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.book-card:hover :deep(.cover) {
  box-shadow: 0 20px 38px -22px rgba(60, 44, 28, 0.6);
  transform: translateY(-4px);
}

h3 {
  display: -webkit-box;
  margin: 12px 0 0;
  overflow: hidden;
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.15;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

p {
  margin: 5px 0 0;
  color: var(--ink-soft);
  font-size: 13px;
}
</style>
