<template>
    <div class="menu-wrapper">
        <button class="menu-btn" @click.stop="isMenuOpen = !isMenuOpen">⋯</button>
        
        <div v-if="isMenuOpen" class="menu-dropdown">
            <button v-if="props.status !== 'wantToRead'" @click="saveBook(book, 'wantToRead'); isMenuOpen = false">Quiero leer</button>
            <button v-if="props.status !== 'reading'" @click="saveBook(book, 'reading'); isMenuOpen = false">Leyendo</button>
            <button v-if="props.status !== 'read'" @click="saveBook(book, 'read'); isMenuOpen = false">Leído</button>
            <button v-if="props.status !== null" @click="removeBook(book.id); isMenuOpen = false">Eliminar</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { saveBook, removeBook } from '../storage/userStorage'

const props = defineProps({
    book: Object,
    status: {
        type: String,
        default: null
    }
})

const isMenuOpen = ref(false)
</script>

<style scoped>
.menu-wrapper {
    position: relative;
    margin-top: 8px;
}

.menu-btn {
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 1rem;
}

.menu-dropdown {
    position: absolute;
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