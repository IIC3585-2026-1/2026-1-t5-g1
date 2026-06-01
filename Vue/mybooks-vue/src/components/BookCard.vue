<template> 
    <div class="book-card">
        <div class="card-image-wrapper">
            <img v-if="book.thumbnail_url" :src="book.thumbnail_url" :alt="book.title"/>
            <img v-else src="./../assets/no-image.jpg" alt="Sin portada"/>
                    
            <button class="menu-btn" @click.stop="isMenuOpen = !isMenuOpen">⋯</button>
                    
            <div v-if="isMenuOpen" class="menu-dropdown">
                <button @click="saveBook(book, 'wantToRead'); isMenuOpen = false">Quiero leer</button>
                <button @click="saveBook(book, 'reading'); isMenuOpen = false">Leyendo</button>
                <button @click="saveBook(book, 'read'); isMenuOpen = false">Leído</button>
            </div>
        </div>
        <p class="book-title"> {{book.title}} </p>
        <p class="book-author"> {{book.author}} </p>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { saveBook } from './../storage/userStorage';

const props = defineProps({
    book: Object
});

const isMenuOpen = ref(false);
</script>


<style scoped>
.card-image-wrapper {
    position: relative;
}

.card-image-wrapper img {
    border-radius: 12px;
    object-fit: fill;
    width: 100%;
    height: 270px; 
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}


.book-author {
    font-size: 0.8rem;
    color: rgba(107, 87, 54, 0.9);
}

.book-title {
    font-weight: bold;
}

.menu-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-dropdown {
    position: absolute;
    top: 44px;
    right: 8px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10;
    overflow: hidden;
}

.menu-dropdown button {
    display: block;
    width: 100%;
    padding: 0.6rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    font-size: 0.85rem;
    white-space: nowrap;
}

.menu-dropdown button:hover {
    background: #f5f5f5;
}
</style>
