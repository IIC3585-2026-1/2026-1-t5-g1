<template>
  <section class="wishlist-section">
    <div class="section-head">
      <h2>Wishlist</h2>
      <button v-if="books.length" class="text-button" type="button" @click="$emit('open-library')">
        Ver lista
      </button>
    </div>

    <div v-if="books.length" class="book-grid">
      <BookCard
        v-for="book in books.slice(0, 6)"
        :key="book.id"
        :book="book"
        class="clickable"
        @click="$emit('open-library')"
      />
    </div>

    <div v-else class="empty-state">
      <h2>Tu wishlist está vacía</h2>
      <p>Explora y guarda libros para que aparezcan aquí.</p>
      <button type="button" class="gold-button" @click="$emit('explore')">Explorar libros</button>
    </div>
  </section>
</template>

<script setup>
import BookCard from '../BookCard.vue'

defineProps({
  books: {
    type: Array,
    required: true,
  },
})

defineEmits(['explore', 'open-library'])
</script>

<style scoped>
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}
.section-head h2,
.empty-state h2 {
  margin: 0;
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 35px;
  font-weight: 500;
}
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 190px));
  gap: 28px;
  justify-content: start;
}
.clickable { cursor: pointer; }
.gold-button,
.text-button {
  cursor: pointer;
  transition: transform 0.18s ease;
}
.gold-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
  padding: 13px 24px;
  border-radius: 999px;
  background: var(--gold);
  color: var(--ink);
  font-weight: 800;
}
.text-button {
  border-radius: 999px;
  background: transparent;
  color: var(--coffee-deep);
  font-weight: 800;
}
.gold-button:hover,
.text-button:hover { transform: translateY(-2px); }
.empty-state {
  padding: 54px;
  border: 1px dashed var(--line-2);
  border-radius: 18px;
  text-align: center;
}
.empty-state p { max-width: 42ch; margin: 10px auto 0; color: var(--ink-soft); }
@media (max-width: 720px) {
  .book-grid { grid-template-columns: 1fr; }
}
</style>
