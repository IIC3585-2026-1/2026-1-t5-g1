<template>
    <header>
        <p class="title">MI BIBLIOTECA</p>
        <h1>Tus estantes</h1>
        <p>Todos tus libros, organizados por su lugar en tu vida lectora.</p>
    </header>

    <BookShelf status="reading" title="Leyendo" subtitle="en curso ahora mismo" :limit="5" />
    <BookShelf status="read" title="Leídos" subtitle="libro(s) completado(s)" :limit="5" />
    <BookShelf status="wantToRead" title="Quiero leer" subtitle="en tu lista" :limit="5" />
</template>

<script setup>
import BookShelf from '../../components/library/LibraryBookShelf.vue'
</script>

<style scoped>
header h1 {
    margin: 0;
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

.title {
  color: var(--coffee);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
</style>