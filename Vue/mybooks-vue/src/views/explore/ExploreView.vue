<template>
    <header>
        <p style="color:rgb(199, 111, 30)">EXPLORAR</p><br>
        <h1>Descubre tu próxima lectura</h1>
        <p>Busca en el catálogo y guarda libros en tus listas.</p>
    </header>

    <div class="search-container"> 
        <input v-model="query" type="search" @keyup.enter="() => loadRandomBooks(false)"
         placeholder="Busca por título, autor o tema..." id="site-search" />
        <button @click="() => loadRandomBooks(false)">Buscar</button>
    </div>

    <div class="filters">
        <div class="filter-group">
            <span>Idioma</span>
            <button :class="{ active: language === 'all' }" @click="language = 'all'">Todos</button>
            <button :class="{ active: language === 'es' }" @click="language = 'es'">Español</button>
            <button :class="{ active: language === 'en' }" @click="language = 'en'">Inglés</button>
        </div>

        <div class="filter-group">
            <span>Orden</span>
            <button :class="{ active: sort === 'relevance' }" @click="sort = 'relevance'">Relevancia</button>
            <button :class="{ active: sort === 'new' }" @click="sort = 'new'">Novedad</button>
            <button :class="{ active: sort === 'title' }" @click="sort = 'title'">Título</button>
        </div>
    </div>

    <div v-if="isLoading" class="loader-container">
        <span class="loader"></span>
    </div>

    <div v-if="!isLoading" class="books-container">
        <BookCard
            v-for="book in books"
            :book="book"
        >

        <BookMenu :book="book"/>

        </BookCard>
    </div>

    <div v-if="!isLoading && books.length" class="pagination">
        <button @click="prevPage" :disabled="page === 1">← Anterior</button>
        <span>Página {{ page }}</span>
        <button @click="nextPage" :disabled="page === totalPages">Siguiente →</button>
    </div>
</template>

<script setup> 
    import { ref, onMounted, computed } from 'vue';
    import BookCard from "./../../components/BookCard.vue";
    import BookMenu from "./../../components/BookMenu.vue";
    
    const query = ref("");
    const books = ref([]);
    const isLoading = ref(false);
    const language = ref('all');
    const sort = ref('relevance');
    const page = ref(1);
    const LIMIT = 10;
    const totalResults = ref(0);
    const API_URL = "https://openlibrary.org/search.json?";
    const subjects = ['fiction', 'fantasy', 'mystery', 'romance', 'science', 'history', 'thriller'];
    

    const loadRandomBooks = async (onmounted) => {
        if (onmounted === false && !query.value.trim()) return;
        isLoading.value = true;
        const q = query.value.trim() ? query.value.trim() : subjects[Math.floor(Math.random() * subjects.length)];
        
        let url = `${API_URL}q=${encodeURIComponent(q)}&limit=${LIMIT}`;
        if (language.value !== "all") url += `&lang=${language.value}`;
        if (sort.value !== "relevance") url += `&sort=${sort.value}`;
        if (page.value > 1) url += `&page=${page.value}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            totalResults.value = data.numFound;
            
            books.value = data.docs.map((book) => {
                return {
                    id: book.key.replace('/works/', ''),
                    author: book.author_name?.[0] || "Autor desconocido",
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

    const totalPages = computed(() => Math.ceil(totalResults.value / LIMIT))

    const prevPage = () => {
        if (page.value > 1) {
            page.value--
            loadRandomBooks(true)
        }
    }

    const nextPage = () => {
        if (page.value < totalPages.value) {
            page.value++
            loadRandomBooks(true)
        }
    }

    onMounted(async () => {
        await loadRandomBooks(true);
    });

</script>

<style scoped>
header h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(38px, 5vw, 56px);
}

p:last-child {
  margin: 10px 0 0;
  color: var(--ink-soft);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-style: italic;
}

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
    background: rgba(199, 111, 30, 0.78);
    transition: transform 0.1s ease;
}

.search-container button:hover {
    cursor: pointer;
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

.filters {
    display: flex;
    gap: 2rem;
    padding: 0 1rem 1rem;
    align-items: center;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.filter-group span {
    font-size: 0.85rem;
    color: #888;
}

.filter-group button {
    padding: 0.4rem 1rem;
    border-radius: 999px;
    border: 1px solid #ccc;
    background: transparent;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
}

.filter-group button.active {
    background: #222;
    color: white;
    border-color: #222;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
}

.pagination button {
    padding: 0.5rem 1.2rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
}

.pagination button:hover:not(:disabled) {
    background: #222;
    color: white;
}

.pagination button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.pagination span {
    font-size: 0.9rem;
    color: #666;
}
</style>