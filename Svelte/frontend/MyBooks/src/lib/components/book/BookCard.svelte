<script lang="ts">
  import type { Book } from '$lib/types';
  import Cover from './Cover.svelte';
  import StatusBadge from './StatusBadge.svelte';
  import Stars from '../ui/Stars.svelte';
  import Progress from '../ui/Progress.svelte';
  import Icon from '../ui/Icon.svelte';

  interface Props {
    book: Book;
    variant?: 'feature' | 'list';
    onclick?: () => void;
    onAdd?: (book: Book) => void;
  }

  let { book, variant = 'feature', onclick, onAdd }: Props = $props();

  let hover = $state(false);

  const author = $derived(book.authors[0] ?? '');
  const lift = $derived(
    hover
      ? 'transform: translateY(-4px); box-shadow: 0 20px 38px -20px rgba(60,44,28,0.55);'
      : 'transform: none; box-shadow: 0 8px 20px -14px rgba(60,44,28,0.4);'
  );
</script>

{#if variant === 'list'}
  <div
    role="button"
    tabindex="0"
    {onclick}
    onkeydown={(e) => e.key === 'Enter' && onclick?.()}
    onmouseenter={() => hover = true}
    onmouseleave={() => hover = false}
    style="
      display: flex; gap: 16px; align-items: center;
      padding: 12px; border-radius: 14px; cursor: pointer;
      background: {hover ? 'var(--paper-2)' : 'transparent'};
      border: 1px solid {hover ? 'var(--line)' : 'transparent'};
      transition: background 0.15s ease, border-color 0.15s ease;
    "
  >
    <Cover {book} width={54} />
    <div style="flex: 1; min-width: 0;">
      <div style="font-family: 'Newsreader', serif; font-size: 19px; font-weight: 500; color: var(--ink); line-height: 1.15;">
        {book.title}
      </div>
      <div style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink-soft); margin-top: 3px;">
        {author} · {book.published}
      </div>
      {#if book.status === 'reading'}
        <div style="margin-top: 8px; max-width: 220px;">
          <Progress value={book.progress} showLabel />
        </div>
      {/if}
    </div>
    <div style="display: flex; align-items: center; gap: 14px;">
      {#if book.rating > 0}
        <Stars value={book.rating} size={14} />
      {/if}
      <StatusBadge status={book.status} small />
      <Icon name="chevron" size={18} style="color: var(--ink-soft)" />
    </div>
  </div>

{:else}
  <div
    role="button"
    tabindex="0"
    {onclick}
    onkeydown={(e) => e.key === 'Enter' && onclick?.()}
    onmouseenter={() => hover = true}
    onmouseleave={() => hover = false}
    style="cursor: pointer; display: flex; flex-direction: column; position: relative;"
  >
    <div style="position: relative; transition: transform 0.22s ease, box-shadow 0.22s ease; border-radius: 5px; {lift}">
      <Cover {book} width="100%" />

      {#if onAdd}
        <button
          onclick={(e) => { e.stopPropagation(); onAdd(book); }}
          title="Agregar a una lista"
          style="
            position: absolute; right: 8px; bottom: 8px;
            width: 34px; height: 34px; border-radius: 999px;
            background: var(--paper); border: 1px solid var(--line);
            color: var(--ink); cursor: pointer;
            display: grid; place-items: center;
            box-shadow: 0 4px 12px -4px rgba(0,0,0,0.3);
            opacity: {hover ? 1 : 0};
            transform: {hover ? 'translateY(0)' : 'translateY(6px)'};
            transition: opacity 0.2s ease, transform 0.2s ease;
          "
        >
          <Icon name="plus" size={18} />
        </button>
      {/if}
    </div>

    <div style="margin-top: 10px;">
      <div style="
        font-family: 'Newsreader', serif;
        font-size: 16.5px; font-weight: 500;
        color: var(--ink); line-height: 1.15;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      ">
        {book.title}
      </div>
      <div style="font-family: 'DM Sans', sans-serif; font-size: 12.5px; color: var(--ink-soft); margin-top: 2px;">
        {author}
      </div>
      {#if book.status === 'reading'}
        <div style="margin-top: 8px;">
          <Progress value={book.progress} />
        </div>
      {/if}
      {#if book.rating > 0 && book.status !== 'reading'}
        <div style="margin-top: 7px;">
          <Stars value={book.rating} size={13} />
        </div>
      {/if}
    </div>
  </div>
{/if}
