<script lang="ts">
  import type { Book } from '$lib/types';
  import { COVER_SCHEMES } from '$lib/data';

  interface Props {
    book: Book;
    width?: number | string;
    ratio?: number;
    class?: string;
  }

  let { book, width = 150, ratio = 1.5, class: className = '' }: Props = $props();

  const s = $derived(COVER_SCHEMES[book.scheme % COVER_SCHEMES.length]);
  const w = $derived(typeof width === 'number' ? `${width}px` : width);
  const u = (px: number) => `${(px / 1.5).toFixed(2)}cqw`;

  const coverUrl = $derived(
    book.coverId
      ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
      : null
  );
</script>

<div
  class="cover {className}"
  title="{book.title} — {book.authors[0] ?? ''}"
  style="
    width: {w};
    aspect-ratio: 1 / {ratio};
    background: {s.bg};
    color: {s.ink};
    border-radius: {u(4)};
    container-type: inline-size;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
    font-family: 'Newsreader', Georgia, serif;
  "
>
  {#if coverUrl}
    <img
      src={coverUrl}
      alt={book.title}
      style="width:100%; height:100%; object-fit:cover; display:block;"
    />
  {:else}
    <div class="inner col" style="inset:{u(7)}; border:{u(1)} solid {s.ink}; padding:{u(9)}; align-items:center; text-align:center; justify-content:center; gap:{u(8)};">
      <div style="font-family:'DM Sans',sans-serif; font-size:{u(7.5)}; letter-spacing:0.2em; text-transform:uppercase; opacity:0.7;">{book.authors[0]}</div>
      <div style="width:{u(18)}; height:{u(1)}; background:{s.ink}; opacity:0.5;"></div>
      <div style="font-weight:500; line-height:1.1; font-size:{u(18)}; font-style:italic;">{book.title}</div>
      <div style="font-size:{u(10)}; opacity:0.6;">✦</div>
    </div>
  {/if}

  <div class="spine" style="width:{u(4)}; background:rgba(0,0,0,0.16);"></div>
  <div class="sheen"></div>
</div>

<style>
  .cover {
    position: relative;
    overflow: hidden;
    flex: none;
  }
  .inner {
    position: absolute;
    inset: 0;
    display: flex;
  }
  .col { flex-direction: column; }
  .spine { position: absolute; left: 0; top: 0; bottom: 0; }
  .sheen {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(105deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 38%, rgba(0,0,0,0.06));
  }
</style>
