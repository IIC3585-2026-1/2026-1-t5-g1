<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { Book, BookStatus } from '$lib/types';
  import { STATUS_META } from '$lib/types';
  import { store } from '$lib/store.svelte';
  import Cover from '../book/Cover.svelte';
  import Icon from '../ui/Icon.svelte';

  interface Props {
    book: Book;
    onClose: () => void;
  }

  let { book, onClose }: Props = $props();

  const statuses     = Object.keys(STATUS_META) as BookStatus[];
  const alreadyIn    = $derived(store.isInLibrary(book.id));
  const currentStatus = $derived(store.find(book.id)?.status);

  function select(status: BookStatus) {
    if (alreadyIn) {
      store.move(book.id, status);
    } else {
      store.add({ ...book, status });
    }
    onClose();
  }
</script>

<div
  role="presentation"
  onclick={onClose}
  onkeydown={(e) => e.key === 'Escape' && onClose()}
  style="position: fixed; inset: 0; background: rgba(40,30,20,0.4); backdrop-filter: blur(3px); z-index: 80; display: grid; place-items: center; padding: 20px;"
>
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Agregar libro a lista"
    tabindex="-1"
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) => e.stopPropagation()}
    transition:fly={{ y: 14, duration: 260 }}
    style="width: 360px; background: var(--paper); border-radius: 22px; border: 1px solid var(--line); padding: 24px; box-shadow: 0 30px 70px -20px rgba(0,0,0,0.5);"
  >
    <div style="display: flex; gap: 14px; margin-bottom: 20px;">
      <Cover {book} width={52} />
      <div style="flex: 1; min-width: 0;">
        <div style="font-family: 'Newsreader', serif; font-size: 18px; color: var(--ink); line-height: 1.15;">{book.title}</div>
        <div style="font-family: 'DM Sans', sans-serif; font-size: 12.5px; color: var(--ink-soft); margin-top: 2px;">{book.authors[0] ?? ''}</div>
      </div>
    </div>

    <div style="font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); font-weight: 600; margin-bottom: 12px;">
      {alreadyIn ? 'Mover a' : 'Agregar a'}
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      {#each statuses as status}
        {@const meta = STATUS_META[status]}
        {@const active = currentStatus === status}
        <button
          onclick={() => select(status)}
          style="
            display: flex; align-items: center; gap: 12px;
            padding: 12px 14px; border-radius: 12px;
            cursor: pointer; text-align: left;
            background: {active ? 'var(--paper-3)' : 'var(--paper-2)'};
            border: 1px solid {active ? meta.color : 'var(--line)'};
            transition: all 0.12s ease;
          "
        >
          <span style="color: {meta.color};"><Icon name={meta.icon} size={18} /></span>
          <span style="font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 500; color: var(--ink); flex: 1;">{meta.label}</span>
          {#if active}<Icon name="check" size={16} style="color: {meta.color}" />{/if}
        </button>
      {/each}
    </div>
  </div>
</div>
