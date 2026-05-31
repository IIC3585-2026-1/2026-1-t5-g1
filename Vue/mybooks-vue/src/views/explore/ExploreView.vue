<template>
    <header>
        <p>EXPLORAR</p>
        <h1>Descubre tu próxima lectura</h1>
        <p>Busca en el catálogo y guarda libros en tus listas.</p>
    </header>

    <div class="search-container"> 
        <input type="search" placeholder="Busca por título, autor o tema..." id="site-search" name="q" />
        <button @click="">Buscar</button>
    </div>

    <div v-if="isLoading" class="loader-container">
        <span class="loader"></span>
    </div>

    <div class="books-container">
        <div class="book-card" v-for="book in books" :key="book.title">
            <img v-if="book.thumbnail_url" :src="book.thumbnail_url" :alt="book.title"/>
            <div v-else class="no-cover">Sin portada.</div>
            <p class="book-title"> {{book.title}} </p>
            <p class="book-author"> {{book.author}} </p>
        </div>
    </div>
</template>

<script setup> 
    import { ref, onMounted } from 'vue'  // ← falta esto
    
    const books = ref([]);
    const isLoading = ref(false);
    const API_URL = "https://openlibrary.org/search.json?";
    const subjects = ['fiction', 'fantasy', 'mystery', 'romance', 'science', 'history', 'thriller'];
    

    const loadRandomBooks = async () => {
        isLoading.value = true;
        const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
        try {
            const response = await fetch(`${API_URL}subject=${randomSubject}&limit=10`);
            const data = await response.json();
            
            books.value = data.docs.map((book) => {
                return {
                    author: book.author_name?.join(", ") || "Autor desconocido",
                    title: book.title,
                    thumbnail_url: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null  
                };
            });
        } catch(error) {
            console.log(error);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(async () => {
        await loadRandomBooks();
    });

</script>

<style scoped>
.search-container {
    display: flex;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
}

.search-container input {
    flex: 1;
    padding: 1rem 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
}

.search-container button {
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    color: white;
    font-weight: bold;
    background: rgba(107, 87, 54, 0.78);
    transition: transform 0.1s ease;
}

.search-container button:active {
    transform: scale(0.85);
}

.books-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 2rem;
    padding: 1.5rem;
}

.book-card img {
    border-radius: 8px;
    object-fit: cover;
    width: 100%;
    height: 260px;
}

.loader-container {
    display: flex;
    justify-content: center;
    padding: 4rem;
}

.loader {
    width: 140px;
    height: 140px;
    border: 4px solid #e0d6c8;
    border-top-color: rgba(107, 87, 54, 0.78);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

</style>