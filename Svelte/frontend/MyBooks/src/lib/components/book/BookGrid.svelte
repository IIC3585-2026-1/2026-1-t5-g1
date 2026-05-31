<script lang="ts">
  import type { Book } from '$lib/types';
  import BookCard from './BookCard.svelte';

  interface Props {
    books: Book[];
    variant?: 'feature' | 'list';
    onBookClick?: (book: Book) => void;
    onAdd?: (book: Book) => void;
  }

  let { books, variant = 'feature', onBookClick, onAdd }: Props = $props();
</script>

{#if variant === 'list'}
  <div style="display: flex; flex-direction: column; gap: 4px;">
    {#each books as book (book.id)}
      <BookCard
        {book}
        variant="list"
        onclick={() => onBookClick?.(book)}
      />
    {/each}
  </div>
{:else}
  <div style="
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 30px;
    align-items: start;
  ">
    {#each books as book (book.id)}
      <BookCard
        {book}
        variant="feature"
        onclick={() => onBookClick?.(book)}
        {onAdd}
      />
    {/each}
  </div>
{/if}
