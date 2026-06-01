<script lang="ts">
  import { goto } from '$app/navigation';
  import { store } from '$lib/store.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import BookCard from '$lib/components/book/BookCard.svelte';
  import Icon from '$lib/components/ui/Icon.svelte';
  import { STATUS_META } from '$lib/types';

  const counts = $derived({
    reading:     store.byStatus('reading').length,
    read:        store.byStatus('read').length,
    wishlist:    store.byStatus('wishlist').length,
    recommended: store.byStatus('recommended').length,
  });

  const wishlist = $derived(store.byStatus('wishlist'));

  const tiles = [
    { key: 'reading'     as const, path: '/biblioteca/leyendo'      },
    { key: 'read'        as const, path: '/biblioteca/leidos'       },
    { key: 'wishlist'    as const, path: '/biblioteca/wishlist'     },
    { key: 'recommended' as const, path: '/biblioteca/recomendados' },
  ];
</script>

<div style="max-width: 1200px; margin: 0 auto;">

  <!-- Saludo -->
  <div style="margin-bottom: 34px;">
    <div style="font-family: 'DM Sans', sans-serif; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--coffee); font-weight: 600;">
      Mi biblioteca
    </div>
    <h1 style="font-family: 'Newsreader', serif; font-size: 46px; font-weight: 500; color: var(--ink); margin: 10px 0 0; line-height: 1.02; letter-spacing: -0.02em;">
      Bienvenido/a a tu colección personal
    </h1>
    <p style="font-family: 'Newsreader', serif; font-style: italic; font-size: 19px; color: var(--ink-soft); margin: 8px 0 0;">
      Tu biblioteca tiene {store.books.length} libros guardados.
    </p>
  </div>

  <!-- Conteo de la biblioteca -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; margin-bottom: 34px;">
    {#each tiles as { key, path }}
      {@const meta = STATUS_META[key]}
      <button
        onclick={() => goto(path)}
        onmouseenter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
        onmouseleave={(e) => (e.currentTarget.style.transform = 'none')}
        style="
          text-align: left; background: var(--paper-2);
          border: 1px solid var(--line); border-radius: 16px;
          padding: 18px 20px; cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        "
      >
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="color: {meta.color};"><Icon name={meta.icon} size={22} /></div>
          <Icon name="arrowRight" size={16} style="color: var(--line-2)" />
        </div>
        <div style="font-family: 'Newsreader', serif; font-size: 40px; font-weight: 500; color: var(--ink); margin-top: 12px; line-height: 1;">
          {counts[key]}
        </div>
        <div style="font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--ink-soft); margin-top: 4px;">
          {meta.label}
        </div>
      </button>
    {/each}
  </div>

  <!-- Wishlist -->
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
    <h2 style="font-family: 'Newsreader', serif; font-size: 26px; font-weight: 500; color: var(--ink); margin: 0;">
      Quiero leer
    </h2>
    {#if wishlist.length > 0}
      <div style="display: flex; gap: 10px; align-items: center;">
        <Button variant="ghost" size="sm" iconRight="arrowRight" onclick={() => goto('/biblioteca/wishlist')}>
          Ver lista
        </Button>
        <Button variant="gold" size="sm" icon="spark" onclick={() => goto('/ruleta')}>
          Girar ruleta
        </Button>
      </div>
    {/if}
  </div>

  {#if wishlist.length > 0}
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 28px;">
      {#each wishlist as book (book.id)}
        <BookCard {book} onclick={() => goto(`/libro/${book.id}`)} />
      {/each}
    </div>
  {:else}
    <div style="text-align: center; padding: 60px; border: 1px dashed var(--line-2); border-radius: 20px;">
      <div style="font-family: 'Newsreader', serif; font-size: 22px; color: var(--ink-soft); margin-bottom: 16px;">
        Tu wishlist está vacía
      </div>
      <Button icon="search" onclick={() => goto('/explorar')}>
        Explorar libros
      </Button>
    </div>
  {/if}

</div>
