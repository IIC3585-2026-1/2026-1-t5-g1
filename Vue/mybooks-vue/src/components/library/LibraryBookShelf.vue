<template>
    <div class="shelf-container">
        <div class="shelf-header">
            <div class="shelf-title">
                
                <h2>{{ title }}</h2>
                <p>{{ totalCount }} {{ subtitle }}</p>
            </div>
            <RouterLink :to="`/library/${status}`" class="open-button">Abrir</RouterLink>
        </div>
        
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
    </div>
</template>

<script setup>
import { computed } from 'vue';
import BookCard from '../BookCard.vue';
import BookMenu from '../BookMenu.vue';
import { getByStatus, getByStatusCount } from '../../storage/userStorage.js';

const props = defineProps({
    status: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: 'libros' },
    limit: { type: Number, default: 5 }
});

const books = computed(() => getByStatus(props.status, props.limit));
const totalCount = computed(() => getByStatusCount(props.status));
</script>

<style scoped>
.shelf-container {
    padding-top: 2rem;
}

.shelf-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.shelf-title {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.shelf-tile h2 {
    font-family: Georgia, "Times New Roman", serif;
}

.shelf-title h2 {
    margin: 0;
}

.open-button {
    padding: 0.4rem 1rem;
    border-radius: 20px;
    border: 1px solid #ccc;
    background: transparent;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: bold;
    transition: all 0.2s;
    color: black;
    text-decoration: none;
}

.open-button:hover {
    background: #222;
    color: white;
    border-color: #222;
}

.open-button:active {
    transform: scale(0.85);
}

.books-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    padding-top: 1rem;
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
    color: #999;
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
</style>