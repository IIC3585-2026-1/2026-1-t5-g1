<template>
    <header>
        <p style="color:rgb(199, 111, 30)">MI BIBLIOTECA</p><br>
        <h1>Tus estantes</h1>
        <p>Todos tus libros organizados.</p>
    </header>
    
    <div class="read-container">
        <div class="read-header">
            <div class="read-title">
                <h2>Leyendo</h2> <p>{{readingBooksCount}} en curso ahora mismo</p> 
            </div>
            <button class="open-button">Abrir</button>
        </div>
        
        <div class="books-container">
            <BookCard
                v-for="book in readingBooks",
                :book="book"
            />
        </div>
    </div>
 

    <div class="read-container">

    </div>

    <div class="read-container">

    </div>


</template>

<script setup> 
import { ref } from 'vue';
import { getByStatus, getByStatusCount } from './../../storage/userStorage';
import BookCard from "./../../components/BookCard.vue";

const readingBooks = ref(getByStatus("reading", 5));
const readingBooksCount = ref(getByStatusCount("reading"));
const readBooks = ref(getByStatus("read", 5));
const readBooksCount = ref(getByStatusCount("read"));
const wantToReadBooks = ref(getByStatus("wantToRead", 5));
const WantToReadBooksCount = ref(getByStatusCount("wantToRead"));

</script>

<style scoped>

.read-container {
    padding-top: 2rem;
}

.read-header {
    display: flex;
    justify-content: space-between;
}

.read-title {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.read-container::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px; /* Length of the accent line */
    height: 4px;
    background-color: #3498db; /* Accent color */
    border-radius: 2px;
}

.open-button {
    padding: 0.4rem 1rem;
    border-radius: 999px;
    border: 1px solid #ccc;
    background: transparent;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
    font-weight: bold;
    transition: transform 0.1s ease;
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
    grid-template-columns: repeat(auto-fill, 200px);
    gap: 2rem;
    padding-top: 1rem;
}

</style>