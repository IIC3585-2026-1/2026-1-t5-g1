<script lang="ts">
  import { goto } from '$app/navigation';
  import { store } from '$lib/store.svelte';
  import type { Book } from '$lib/types';
  import Cover from '$lib/components/book/Cover.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Icon from '$lib/components/ui/Icon.svelte';
  import EmptyState from '$lib/components/layout/EmptyState.svelte';

  // ── Estado ───────────────────────────────────────────
  type Phase = 'select' | 'spinning' | 'result';

  let phase     = $state<Phase>('select');
  let mode      = $state<'all' | 'manual'>('all');
  let picked    = $state<Set<string>>(new Set());
  let winner    = $state<{ book: Book; reel: Book[]; } | null>(null);
  let spinTarget = $state(0);

  let reelEl = $state<HTMLDivElement | null>(null);

  const wishlist = $derived(store.byStatus('wishlist'));
  const pool     = $derived(
    mode === 'all'
      ? wishlist
      : wishlist.filter(b => picked.has(b.id))
  );

  // inicializa picked con todos los libros de wishlist
  $effect(() => {
    picked = new Set(wishlist.map(b => b.id));
  });

  // ── Acciones ─────────────────────────────────────────
  function toggle(id: string) {
    const next = new Set(picked);
    next.has(id) ? next.delete(id) : next.add(id);
    picked = next;
  }

  function startSpin() {
    if (pool.length < 1) return;

    const win      = pool[Math.floor(Math.random() * pool.length)];
    const total    = 44;
    const winIndex = 38;
    const reel: Book[] = [];

    for (let i = 0; i < total; i++) {
      reel.push(i === winIndex ? win : pool[Math.floor(Math.random() * pool.length)]);
    }

    winner = { book: win, reel };
    phase  = 'spinning';

    // medir el contenedor DESPUÉS de que Svelte actualice el DOM
    setTimeout(() => {
      const ITEM = 150; // cover 130px + gap 20px
      const cw   = reelEl?.offsetWidth ?? 880;
      spinTarget = winIndex * ITEM - (cw / 2 - ITEM / 2);
    }, 0);
  }

  function onSpinEnd() {
    phase = 'result';
  }

  function reset() {
    phase     = 'select';
    winner    = null;
    spinTarget = 0;
  }
</script>

<!-- ── Fondo oscuro de la ruleta ───────────────────── -->
<div style="
  min-height: calc(100vh - 80px);
  background: radial-gradient(130% 100% at 50% -10%, #34432f 0%, var(--ink) 55%, #211c17 100%);
  margin: -40px clamp(-24px, -4vw, -56px);
  padding: 40px clamp(24px, 4vw, 56px);
  position: relative; overflow: hidden;
">
  <!-- anillos ambientales decorativos -->
  <div style="position: absolute; top: -200px; left: 50%; transform: translateX(-50%); width: 700px; height: 700px; border-radius: 999px; border: 1px solid rgba(194,160,91,0.16); pointer-events: none;"></div>
  <div style="position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 460px; height: 460px; border-radius: 999px; border: 1px solid rgba(194,160,91,0.12); pointer-events: none;"></div>

  <div style="position: relative; max-width: 1000px; margin: 0 auto;">

    <!-- encabezado -->
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="font-family: 'Newsreader', serif; font-size: 56px; font-weight: 500; color: var(--paper); margin: 12px 0 0; line-height: 1; letter-spacing: -0.02em;">
        La Ruleta Lectora
      </h1>
    </div>

    <!-- ── FASE: SELECT ─────────────────────────────── -->
    {#if phase === 'select'}
      {#if wishlist.length === 0}
        <EmptyState
          icon="spark"
          title="La ruleta necesita libros"
          sub="Agrega libros a tu wishlist y vuelve para dejar que el azar elija."
        >
          {#snippet action()}
            <Button onclick={() => goto('/explorar')} icon="search">
              Explorar libros
            </Button>
          {/snippet}
        </EmptyState>

      {:else}
        <!-- toggle modo -->
        <div style="display: flex; justify-content: center; margin-bottom: 28px;">
          <div style="display: flex; gap: 6px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; padding: 5px;">
            {#each [['all', 'Toda la wishlist', 'heart'], ['manual', 'Selección manual', 'check']] as [v, label, icon]}
              <button
                onclick={() => mode = v as 'all' | 'manual'}
                style="
                  display: inline-flex; align-items: center; gap: 8px;
                  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
                  padding: 11px 22px; border-radius: 999px; cursor: pointer; border: none;
                  background: {mode === v ? 'var(--gold)' : 'transparent'};
                  color: {mode === v ? '#2C2620' : 'rgba(245,239,227,0.75)'};
                  transition: background 0.18s ease, color 0.18s ease;
                "
              >
                <Icon name={icon} size={16} /> {label}
              </button>
            {/each}
          </div>
        </div>

        {#if mode === 'manual'}
          <p style="text-align: center; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: rgba(245,239,227,0.6); margin: 0 0 18px;">
            Toca las portadas que quieras incluir · {pool.length} seleccionados
          </p>
        {/if}

        <!-- grid de portadas -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(108px, 1fr)); gap: 18px; max-width: 860px; margin: 0 auto 36px;">
          {#each wishlist as book (book.id)}
            {@const on = mode === 'all' || picked.has(book.id)}
            <button
              onclick={mode === 'manual' ? () => toggle(book.id) : undefined}
              style="
                background: none; border: none; padding: 0; text-align: left;
                cursor: {mode === 'manual' ? 'pointer' : 'default'};
                opacity: {on ? 1 : 0.32};
                transform: {on ? 'none' : 'scale(0.96)'};
                transition: opacity 0.2s ease, transform 0.2s ease;
                filter: {on ? 'none' : 'grayscale(0.5)'};
              "
            >
              <div style="border-radius: 6px; box-shadow: {on ? '0 14px 30px -14px rgba(0,0,0,0.7)' : 'none'}; position: relative;">
                <Cover {book} width="100%" />
                {#if mode === 'manual'}
                  <div style="
                    position: absolute; top: 7px; right: 7px;
                    width: 24px; height: 24px; border-radius: 999px;
                    display: grid; place-items: center;
                    background: {on ? 'var(--gold)' : 'rgba(0,0,0,0.4)'};
                    border: 1.5px solid {on ? 'var(--gold)' : 'rgba(255,255,255,0.5)'};
                    color: #2C2620;
                  ">
                    {#if on}<Icon name="check" size={14} stroke={2.4} />{/if}
                  </div>
                {/if}
              </div>
              <div style="font-family: 'DM Sans', sans-serif; font-size: 11.5px; color: rgba(245,239,227,0.75); margin-top: 7px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                {book.title}
              </div>
            </button>
          {/each}
        </div>

        <!-- botón girar -->
        <div style="text-align: center;">
          <button
            onclick={startSpin}
            disabled={pool.length < 1}
            style="
              font-family: 'DM Sans', sans-serif; font-weight: 700;
              font-size: 18px; letter-spacing: 0.02em; color: #2C2620;
              padding: 20px 52px; border-radius: 999px; border: none;
              cursor: {pool.length < 1 ? 'not-allowed' : 'pointer'};
              background: {pool.length < 1 ? 'rgba(255,255,255,0.2)' : 'linear-gradient(180deg, var(--gold), #b18a3e)'};
              box-shadow: {pool.length < 1 ? 'none' : '0 14px 36px -10px rgba(194,160,91,0.6)'};
              opacity: {pool.length < 1 ? 0.5 : 1};
              display: inline-flex; align-items: center; gap: 12px;
              transition: transform 0.15s ease;
            "
          >
            <Icon name="spark" size={22} /> Girar la ruleta
          </button>
          <div style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(245,239,227,0.5); margin-top: 14px;">
            {pool.length} {pool.length === 1 ? 'libro entra' : 'libros entran'} al sorteo
          </div>
        </div>
      {/if}

    <!-- ── FASE: SPINNING ───────────────────────────── -->
    {:else if phase === 'spinning' && winner}
      <div style="padding-top: 30px;">
        <div class="mb-pulse" style="font-family: 'DM Sans', sans-serif; font-size: 14px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); text-align: center; margin-bottom: 26px; font-weight: 600;">
          Barajando tu destino…
        </div>

        <!-- ventana del reel -->
        <div
          bind:this={reelEl}
          style="position: relative; height: 280px; overflow: hidden; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.25);"
        >
          <!-- marcador central dorado -->
          <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 134px; transform: translateX(-50%); border: 2px solid var(--gold); border-radius: 10px; z-index: 3; box-shadow: 0 0 40px rgba(194,160,91,0.5); pointer-events: none;"></div>
          <div style="position: absolute; left: 50%; top: -2px; transform: translateX(-50%); z-index: 4; color: var(--gold);">
            <Icon name="chevronDown" size={26} />
          </div>

          <!-- degradados laterales -->
          <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 160px; z-index: 2; background: linear-gradient(90deg, rgba(20,16,12,0.9), transparent); pointer-events: none;"></div>
          <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 160px; z-index: 2; background: linear-gradient(270deg, rgba(20,16,12,0.9), transparent); pointer-events: none;"></div>

          <!-- tira de portadas animada -->
          <div
            class="mb-spin-run"
            onanimationend={onSpinEnd}
            style="
              display: flex; gap: 20px; align-items: center;
              height: 100%; padding-left: 10px;
              --spin-target: -{spinTarget}px;
              will-change: transform;
            "
          >
            {#each winner.reel as book, i (i)}
              <div style="flex: none;">
                <Cover {book} width={130} />
              </div>
            {/each}
          </div>
        </div>
      </div>

    <!-- ── FASE: RESULT ─────────────────────────────── -->
    {:else if phase === 'result' && winner}
      <div style="text-align: center; padding-top: 14px;">
        <h2 style="font-family: 'Newsreader', serif; font-style: italic; font-size: 26px; color: var(--paper); margin: 0 0 30px; font-weight: 400;">
          Tu próxima lectura es…
        </h2>

        <div style="display: flex; flex-direction: column; align-items: center;">
          <!-- portada ganadora -->
          <div style="position: relative; margin-bottom: 26px;">
            <div style="position: absolute; inset: -40px; border-radius: 999px; background: radial-gradient(circle, rgba(194,160,91,0.45), transparent 68%); filter: blur(8px);"></div>
            <div style="position: relative; box-shadow: 0 40px 90px -30px rgba(0,0,0,0.9); border-radius: 8px;">
              <Cover book={winner.book} width={210} />
            </div>
          </div>

          <h3 style="font-family: 'Newsreader', serif; font-size: 40px; font-weight: 500; color: var(--paper); margin: 0; line-height: 1.05; max-width: 560px;">
            {winner.book.title}
          </h3>
          <div style="font-family: 'Newsreader', serif; font-style: italic; font-size: 20px; color: rgba(245,239,227,0.72); margin-top: 10px;">
            {winner.book.authors.join(', ')}
          </div>

          <!-- categorías -->
          <div style="display: flex; gap: 8px; margin-top: 18px; justify-content: center; flex-wrap: wrap;">
            {#each winner.book.categories as cat}
              <span style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: rgba(245,239,227,0.8); border: 1px solid rgba(255,255,255,0.2); padding: 5px 13px; border-radius: 999px;">
                {cat}
              </span>
            {/each}
          </div>

          <!-- botones -->
          <div style="display: flex; gap: 12px; margin-top: 34px; flex-wrap: wrap; justify-content: center;">
            <Button
              variant="gold"
              size="lg"
              icon="reading"
              onclick={() => {
                store.move(winner!.book.id, 'reading');
                goto(`/libro/${winner!.book.id}`);
              }}
            >
              Empezar a leer
            </Button>

            <button
              onclick={reset}
              style="font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15.5px; color: rgba(245,239,227,0.8); background: transparent; border: 1px solid rgba(255,255,255,0.18); padding: 14px 26px; border-radius: 999px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;"
            >
              <Icon name="spark" size={18} /> Volver a girar
            </button>
          </div>
        </div>
      </div>
    {/if}

  </div>
</div>
