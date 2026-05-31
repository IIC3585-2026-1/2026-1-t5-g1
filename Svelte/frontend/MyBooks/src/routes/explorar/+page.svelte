<script lang="ts">
  import { store } from '$lib/store.svelte';
  import { mapOLBook, type OLDoc } from '$lib/data';
  import type { Book } from '$lib/types';
  import SectionHead from '$lib/components/layout/SectionHead.svelte';
  import BookGrid from '$lib/components/book/BookGrid.svelte';
  import LoadingShelf from '$lib/components/layout/LoadingShelf.svelte';
  import EmptyState from '$lib/components/layout/EmptyState.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Chip from '$lib/components/ui/Chip.svelte';
  import AddSheet from '$lib/components/sheets/AddSheet.svelte';
  import Icon from '$lib/components/ui/Icon.svelte';

  let query   = $state('');
  let lang    = $state('all');
  let sort    = $state('relevance');
  let promise = $state<Promise<Book[]> | null>(null);
  let addBook = $state<Book | null>(null);

  async function fetchBooks(q: string, l: string, s: string): Promise<Book[]> {
    const params = new URLSearchParams({ q, limit: '20' });
    if (l !== 'all') params.set('language', l === 'es' ? 'spa' : 'eng');

    const res  = await fetch(`https://openlibrary.org/search.json?${params}`);
    const data = await res.json() as { docs: OLDoc[] };

    let results = data.docs.map(mapOLBook);

    if (s === 'new') {
      results = results.sort((a, b) => parseInt(b.published) - parseInt(a.published));
    } else if (s === 'title') {
      results = results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }

  function search() {
    if (!query.trim()) return;
    promise = fetchBooks(query.trim(), lang, sort);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') search();
  }
</script>

<div style="max-width: 1200px; margin: 0 auto;">

  <SectionHead
    kicker="Explorar"
    title="Descubre tu próxima lectura"
  />

  <!-- barra de búsqueda -->
  <div style="position: relative; margin-bottom: 22px;">
    <span style="position: absolute; left: 22px; top: 50%; transform: translateY(-50%); color: var(--ink-soft);">
      <Icon name="search" size={22} />
    </span>
    <input
      bind:value={query}
      onkeydown={handleKeydown}
      placeholder="Busca por título, autor o tema…"
      style="
        width: 100%; padding: 20px 130px 20px 58px;
        border-radius: 999px; border: 1px solid var(--line);
        background: var(--paper-2); font-family: 'Newsreader', serif;
        font-size: 19px; color: var(--ink); outline: none;
      "
    />
    <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%);">
      <Button onclick={search}>Buscar</Button>
    </div>
  </div>

  <!-- filtros -->
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin-bottom: 30px; padding-bottom: 22px; border-bottom: 1px solid var(--line);">
    <div style="display: flex; gap: 8px; align-items: center;">
      <span style="font-family: 'DM Sans', sans-serif; font-size: 12.5px; color: var(--ink-soft); font-weight: 600;">Idioma</span>
      {#each [['all', 'Todos'], ['es', 'Español'], ['en', 'Inglés']] as [v, l]}
        <Chip active={lang === v} onclick={() => lang = v}>{l}</Chip>
      {/each}
    </div>

    <div style="width: 1px; height: 24px; background: var(--line);"></div>

    <div style="display: flex; gap: 8px; align-items: center;">
      <span style="font-family: 'DM Sans', sans-serif; font-size: 12.5px; color: var(--ink-soft); font-weight: 600;">Orden</span>
      {#each [['relevance', 'Relevancia'], ['new', 'Novedad'], ['title', 'Título']] as [v, l]}
        <Chip active={sort === v} onclick={() => sort = v}>{l}</Chip>
      {/each}
    </div>
  </div>

  <!-- resultados -->
  {#if !promise}
    <EmptyState
      icon="search"
      title="¿Qué quieres leer?"
      sub="Escribe un título, autor o tema y presiona Buscar."
    />
  {:else}
    {#await promise}
      <LoadingShelf count={12} />
    {:then books}
      {#if books.length === 0}
        <EmptyState
          icon="search"
          title="Sin resultados"
          sub="No encontramos libros con esa búsqueda. Prueba con otro término."
        />
      {:else}
        <div style="margin-bottom: 16px;">
          <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink-soft);">
            {books.length} resultados
          </span>
        </div>
        <BookGrid
          {books}
          onBookClick={(book) => addBook = book}
          onAdd={(book) => addBook = book}
        />
      {/if}
    {:catch error}
      <EmptyState
        icon="close"
        title="Error al buscar"
        sub="No pudimos conectar con Open Library. Revisa tu conexión e intenta de nuevo."
      />
    {/await}
  {/if}

</div>

<!-- panel de agregar -->
{#if addBook}
  <AddSheet book={addBook} onClose={() => addBook = null} />
{/if}
