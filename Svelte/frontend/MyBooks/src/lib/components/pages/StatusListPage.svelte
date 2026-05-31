<script lang="ts">
  import { goto } from '$app/navigation';
  import { store } from '$lib/store.svelte';
  import type { Book, BookStatus } from '$lib/types';
  import { STATUS_META } from '$lib/types';
  import SectionHead from '../layout/SectionHead.svelte';
  import BookGrid from '../book/BookGrid.svelte';
  import EmptyState from '../layout/EmptyState.svelte';
  import Button from '../ui/Button.svelte';
  import AddSheet from '../sheets/AddSheet.svelte';

  interface Props {
    status: BookStatus;
  }

  let { status }: Props = $props();

  let addBook = $state<Book | null>(null);

  const meta  = $derived(STATUS_META[status]);
  const books = $derived(store.byStatus(status));

  const emptyMessages: Record<BookStatus, { title: string; sub: string }> = {
    reading:     { title: 'No estás leyendo nada… todavía',  sub: 'Elige un libro de tu wishlist y empieza.' },
    read:        { title: 'Tu historial está en blanco',      sub: 'Cuando termines un libro aparecerá aquí.' },
    wishlist:    { title: 'Tu wishlist está vacía',           sub: 'Explora el catálogo y guarda libros.' },
    recommended: { title: 'Sin recomendaciones aún',         sub: 'Marca quién te recomendó cada libro.' },
  };
</script>

<div style="max-width: 1200px; margin: 0 auto;">

  <SectionHead kicker="Mi biblioteca" title={meta.label}>
    {#snippet right()}
      {#if status === 'wishlist' && books.length > 0}
        <Button variant="gold" icon="spark" size="lg" onclick={() => goto('/ruleta')}>
          Llevar a la ruleta
        </Button>
      {/if}
    {/snippet}
  </SectionHead>

  {#if books.length === 0}
    <EmptyState icon={meta.icon} title={emptyMessages[status].title} sub={emptyMessages[status].sub}>
      {#snippet action()}
        {#if status === 'reading'}
          <Button onclick={() => goto('/biblioteca/wishlist')} icon="heart">Ir a la wishlist</Button>
        {:else if status === 'wishlist' || status === 'recommended'}
          <Button onclick={() => goto('/explorar')} icon="search">Explorar libros</Button>
        {/if}
      {/snippet}
    </EmptyState>
  {:else}
    <BookGrid
      {books}
      variant="feature"
      onBookClick={(book) => addBook = book}
      onAdd={(book) => addBook = book}
    />
  {/if}

</div>

{#if addBook}
  <AddSheet book={addBook} onClose={() => addBook = null} />
{/if}
