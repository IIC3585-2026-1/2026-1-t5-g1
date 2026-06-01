<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { store } from '$lib/store.svelte';
  import { STATUS_META } from '$lib/types';
  import Cover from '$lib/components/book/Cover.svelte';
  import Icon from '$lib/components/ui/Icon.svelte';
  import AddSheet from '$lib/components/sheets/AddSheet.svelte';
  import Stars from '$lib/components/ui/Stars.svelte';

  const id = $derived($page.params.id ?? "");
  const book = $derived(store.find(id));

  // Estado de edición
  let movingBook      = $state(false);

  function setRating(n: number) {
    if (!book) return;
    store.update(book.id, { rating: n });
  }

  function setProgress(e: Event) {
    if (!book) return;
    const val = Number((e.target as HTMLInputElement).value);
    store.update(book.id, { progress: val });
  }

  function setDate(field: 'startDate' | 'endDate', value: string) {
    if (!book) return;
    store.update(book.id, { [field]: value });
  }

  function setRecommendedBy(e: Event) {
    if (!book) return;
    store.update(book.id, { recommendedBy: (e.target as HTMLInputElement).value });
  }

  function handleDelete() {
    if (!book) return;
    if (confirm(`¿Eliminar "${book.title}" de tu biblioteca?`)) {
      store.remove(book.id);
      goto('/');
    }
  }

  // Helpers

  const today = new Date().toISOString().slice(0, 10);
</script>

{#if !book}
  <div style="padding: 60px; text-align: center; color: var(--ink-soft);">
    Libro no encontrado.
  </div>
{:else}
  {@const meta = STATUS_META[book.status]}

  <div style="max-width: 860px; margin: 0 auto; padding: 32px 24px;">

    <!-- back -->
    <button
      onclick={() => history.back()}
      style="display: flex; align-items: center; gap: 6px; font-family: 'DM Sans', sans-serif;
             font-size: 13px; color: var(--ink-soft); background: none; border: none;
             cursor: pointer; padding: 0; margin-bottom: 28px;"
    >
      <Icon name="arrowLeft" size={16} /> Mi biblioteca
    </button>

    <!-- hero -->
    <div style="display: flex; gap: 36px; margin-bottom: 36px; align-items: flex-start;">
      <div style="flex-shrink: 0;">
        <Cover {book} width={140} />
      </div>

      <div style="flex: 1; padding-top: 4px;">
        <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
                    letter-spacing: .1em; text-transform: uppercase; color: var(--ink-soft);
                    margin-bottom: 6px;">
          {book.categories[0] ?? 'Sin categoría'}
        </div>

        <h1 style="font-family: 'Newsreader', serif; font-size: 28px; font-weight: 700;
                   color: var(--ink); line-height: 1.15; margin-bottom: 4px;">
          {book.title}
        </h1>
        <div style="font-family: 'Newsreader', serif; font-style: italic; font-size: 16px;
                    color: var(--ink-soft); margin-bottom: 16px;">
          {book.authors.join(', ')}
        </div>

        <!-- status pill -->
        <div style="display: inline-flex; align-items: center; gap: 6px;
                    padding: 5px 12px; border-radius: 99px;
                    border: 1px solid {meta.color}; color: {meta.color};
                    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
                    background: var(--paper-2); margin-bottom: 18px;">
          <Icon name={meta.icon} size={14} />
          {meta.label}
        </div>

        <!-- meta -->
        <div style="display: flex; gap: 18px; flex-wrap: wrap;">
          {#if book.published}
            <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink-soft);
                         display: flex; align-items: center; gap: 5px;">
              <Icon name="calendar" size={15} />{book.published}
            </span>
          {/if}
          {#if book.pages}
            <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink-soft);
                         display: flex; align-items: center; gap: 5px;">
              <Icon name="file" size={15} />{book.pages} páginas
            </span>
          {/if}
          <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink-soft);
                       display: flex; align-items: center; gap: 5px;">
            <Icon name="language" size={15} />{book.language === 'es' ? 'Español' : 'Inglés'}
          </span>
        </div>

        <!-- tags -->
        {#if book.categories.length}
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 14px;">
            {#each book.categories as cat}
              <span style="font-size: 11.5px; padding: 3px 10px; border-radius: 99px;
                           background: var(--paper-3); color: var(--ink-soft);
                           font-family: 'DM Sans', sans-serif; font-weight: 500;">
                {cat}
              </span>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <hr style="border: none; border-top: 1px solid var(--line); margin-bottom: 28px;" />

    <!-- grid personal -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">

      <!-- progreso -->
      <div style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px;">
        <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
                    letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft);
                    margin-bottom: 12px;">Mi progreso</div>
        <div style="font-family: 'Newsreader', serif; font-size: 28px; font-weight: 700; color: var(--ink);">
          {book.progress}%
        </div>
        <input
          class="mb-range"
          type="range" min="0" max="100" step="1"
          value={book.progress}
          oninput={setProgress}
          style="
            background:
              linear-gradient(
                to right,
                var(--coffee) 0%,
                var(--coffee) {book.progress}%,
                var(--line) {book.progress}%,
                var(--line) 100%
              );
          "
        />
        <div style="display: flex; justify-content: space-between;
                    font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--ink-soft);">
          <span>{book.pages ? `Pág. ~${Math.round(book.pages * book.progress / 100)}` : '0%'}</span>
          <span>{'100 %'}</span>
        </div>
      </div>

      <!-- rating -->
      <div style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px;">
        <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
                    letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft);
                    margin-bottom: 12px;">Mi valoración</div>
        <Stars
          value={book.rating}
          size={28}
          onChange={setRating}
        />
        <div style="font-family: 'DM Sans', sans-serif; font-size: 12.5px;
                    color: var(--ink-soft); margin-top: 8px;">
          {book.rating > 0 ? `${book.rating} de 5 estrellas` : 'Sin valorar aún'}
        </div>
      </div>

      <!-- fechas -->
      <div style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px;">
        <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
                    letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft);
                    margin-bottom: 14px;">Fechas</div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--ink-soft); margin-bottom: 5px;">
              <Icon name="play" size={13} /> Comenzado
            </div>
            <input
              type="date" value={book.startDate} max={today}
              onchange={(e) => setDate('startDate', e.currentTarget.value)}
              style="width: 100%; padding: 8px 12px; border-radius: 8px;
                     border: 1px solid var(--line); background: var(--paper-2);
                     font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink);"
            />
          </div>
          <div>
            <div style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--ink-soft); margin-bottom: 5px;">
              <Icon name="check" size={13} /> Terminado
            </div>
            <input
              type="date" value={book.endDate} max={today}
              onchange={(e) => setDate('endDate', e.currentTarget.value)}
              style="width: 100%; padding: 8px 12px; border-radius: 8px;
                     border: 1px solid var(--line); background: var(--paper-2);
                     font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink);"
            />
          </div>
        </div>
      </div>

      <!-- recomendado por -->
      <div style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px;">
        <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
                    letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft);
                    margin-bottom: 12px;">Recomendado por</div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 34px; height: 34px; border-radius: 50%; background: var(--paper-3);
                      display: flex; align-items: center; justify-content: center;
                      font-size: 13px; font-weight: 600; color: var(--ink-soft); flex-shrink: 0;">
            {book.recommendedBy ? book.recommendedBy[0].toUpperCase() : '?'}
          </div>
          <input
            type="text"
            value={book.recommendedBy}
            placeholder="Nombre de quien lo recomendó"
            onchange={setRecommendedBy}
            style="flex: 1; padding: 8px 12px; border-radius: 8px;
                   border: 1px solid var(--line); background: var(--paper-2);
                   font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink);"
          />
        </div>
      </div>
    </div>

    <!-- sinopsis -->
    {#if book.desc}
      <div style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px;
                  padding: 18px 20px; margin-bottom: 28px;">
        <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
                    letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft);
                    margin-bottom: 12px;">Sinopsis</div>
        <div style="font-family: 'Newsreader', serif; font-size: 14.5px; color: var(--ink-soft);
                    line-height: 1.75;">
          {book.desc}
        </div>
      </div>
    {/if}

    <!-- acciones -->
    <div style="display: flex; gap: 10px; align-items: center;">
      <button
        onclick={() => movingBook = true}
        style="padding: 11px 22px; border-radius: 99px; background: var(--ink);
               border: none; font-family: 'DM Sans', sans-serif; font-size: 14px;
               font-weight: 500; color: var(--paper); cursor: pointer;
               display: flex; align-items: center; gap: 7px;"
      >
        <Icon name="arrowRight" size={15} /> Mover
      </button>
      <button
        onclick={handleDelete}
        style="padding: 11px 18px; border-radius: 99px; background: transparent;
               border: 1px solid var(--line); font-family: 'DM Sans', sans-serif;
               font-size: 14px; color: var(--ink-soft); cursor: pointer;
               display: flex; align-items: center; gap: 7px; margin-left: auto;"
      >
        <Icon name="trash" size={15} /> Eliminar
      </button>
    </div>

  </div>
{/if}

<!-- sheet para mover -->
{#if movingBook && book}
  <AddSheet {book} onClose={() => movingBook = false} />
{/if}