<script lang="ts">
  import { goto } from '$app/navigation';
  import { store } from '$lib/store.svelte';
  import { STATUS_META } from '$lib/types';
  import type { BookStatus } from '$lib/types';
  import SectionHead from '$lib/components/layout/SectionHead.svelte';
  import BookCard from '$lib/components/book/BookCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Icon from '$lib/components/ui/Icon.svelte';

  const sections: { status: BookStatus; path: string; desc: string }[] = [
    { status: 'reading',     path: '/biblioteca/leyendo',      desc: 'En curso ahora mismo'  },
    { status: 'read',        path: '/biblioteca/leidos',       desc: 'Lecturas terminadas'   },
    { status: 'wishlist',    path: '/biblioteca/wishlist',     desc: 'Quiero leer pronto'    },
    { status: 'recommended', path: '/biblioteca/recomendados', desc: 'Sugeridos para ti'     },
  ];
</script>

<div style="max-width: 1200px; margin: 0 auto;">

  <SectionHead
    kicker="Mi biblioteca"
    title="Tu estante de lectura"
  />

  <div style="display: flex; flex-direction: column; gap: 44px;">
    {#each sections as { status, path, desc }}
      {@const list = store.byStatus(status)}
      {@const meta = STATUS_META[status]}

      <div>
        <!-- encabezado de sección -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--line);">
          <div style="display: flex; align-items: baseline; gap: 14px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: {meta.color};">
                <Icon name={meta.icon} size={20} />
              </span>
              <h2 style="font-family: 'Newsreader', serif; font-size: 28px; font-weight: 500; color: var(--ink); margin: 0;">
                {meta.label}
              </h2>
            </div>
            <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink-soft);">
              {list.length} · {desc}
            </span>
          </div>
          <Button variant="ghost" size="sm" iconRight="arrowRight" onclick={() => goto(path)}>
            Abrir
          </Button>
        </div>

        <!-- scroll horizontal de portadas -->
        {#if list.length === 0}
          <p style="font-family: 'Newsreader', serif; font-style: italic; color: var(--ink-soft); font-size: 17px; padding: 10px 0;">
            Aún no hay libros aquí.
          </p>
        {:else}
          <div style="display: flex; gap: 24px; overflow-x: auto; padding-bottom: 8px;">
            {#each list as book (book.id)}
              <div style="width: 132px; flex: none;">
                <BookCard
                  {book}
                  onclick={() => goto(`/libro/${book.id}`)}
                />
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

</div>
