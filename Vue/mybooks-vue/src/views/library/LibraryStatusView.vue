<template>
    <header>
        <RouterLink to="/library" class="back-btn">Volver</RouterLink>
        <p class="title">MI BIBLIOTECA</p>
        <h1>{{ titles[status] }}</h1>
        <p>{{ books.length }} libro(s)</p>
    </header>

    <div v-if="books.length > 0" class="books-container">
        <BookCard
            v-for="book in books"
            :key="book.id"
            :book="book"
        >
        <BookMenu :book="book" :status="book.status"/>
        </BookCard>
    </div>

    <div v-else class="empty-state">
        <p class="empty-title">No hay libros aquí todavía</p>
        <p class="empty-subtitle">Explorá el catálogo y agregá libros a esta lista</p>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BookCard from '../../components/BookCard.vue'
import BookMenu from "./../../components/BookMenu.vue";
import { getByStatus } from '../../storage/userStorage'

const route = useRoute()
const status = computed(() => route.params.status)

const titles = {
    reading: 'Leyendo',
    read: 'Leídos',
    wantToRead: 'Quiero leer'
}

const books = computed(() => getByStatus(status.value))
</script>

<style scoped>
.books-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 2rem;
    padding: 1.5rem;
}

.title {
  color: var(--coffee);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    margin-top: 1rem;
    border: 2px dashed #d9cfc4;
    border-radius: 16px;
    text-align: center;
}

.empty-title {
    font-size: 1rem;
    font-weight: bold;
    color: #888;
    margin: 0;
}

.empty-subtitle {
    font-size: 0.85rem;
    margin: 0.4rem 0 0;
    color: #aaa;
}

.back-btn {
    text-decoration: none;
    color: #888;
    font-size: 0.9rem;
}

.back-btn:hover {
    color: #222;
}
</style>