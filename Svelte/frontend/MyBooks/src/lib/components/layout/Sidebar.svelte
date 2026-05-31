<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '../ui/Icon.svelte';

  const NAV = [
    { path: '/',                    label: 'Inicio',        icon: 'home'    },
    { path: '/explorar',            label: 'Explorar',      icon: 'compass' },
    { path: '/biblioteca',          label: 'Mi biblioteca', icon: 'books'   },
    { path: '/biblioteca/wishlist', label: 'Quiero leer',   icon: 'heart'   },
    { path: '/ruleta',              label: 'Ruleta',        icon: 'dice', magic: true },
    { path: '/estadisticas',        label: 'Estadísticas',  icon: 'chart',  },
  ];

  const currentPath = $derived($page.url.pathname);
</script>

<aside style="
  width: 264px; flex: none; height: 100vh;
  position: sticky; top: 0;
  background: var(--paper-2); border-right: 1px solid var(--line);
  display: flex; flex-direction: column;
  z-index: 70; overflow-y: auto;
">
  <!-- logo -->
  <div style="padding: 30px 22px 22px;">
    <button
      onclick={() => goto('/')}
      style="display: flex; align-items: center; gap: 11px; cursor: pointer; background: none; border: none; padding: 0;"
    >
      <div style="
        width: 38px; height: 38px; border-radius: 10px;
        background: var(--ink); color: var(--gold);
        display: grid; place-items: center; flex: none;
        font-family: 'Newsreader', serif; font-size: 22px;
        font-weight: 600; font-style: italic;
      ">M</div>
      <div>
        <div style="font-family: 'Newsreader', serif; font-size: 22px; font-weight: 600; color: var(--ink); line-height: 1;">MyBooks</div>
      </div>
    </button>
  </div>

  <!-- navegación -->
  <nav style="padding: 0 14px; display: flex; flex-direction: column; gap: 3px; flex: 1;">
    {#each NAV as item}
      {@const active = currentPath === item.path}
      <button
        onclick={() => goto(item.path)}
        style="
          display: flex; align-items: center; gap: 12px;
          width: 100%; text-align: left; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          font-weight: {active ? 600 : 500};
          padding: 11px 14px; border-radius: 11px; border: none;
          background: {active ? (item.magic ? 'var(--gold)' : 'var(--ink)') : 'transparent'};
          color: {active ? (item.magic ? '#2C2620' : 'var(--paper)') : item.magic ? 'var(--gold-deep)' : 'var(--ink)'};
        "
      >
        <Icon name={item.icon} size={19} stroke={1.7} />
        {item.label}
        {#if item.magic && !active}
          <span style="margin-left: auto; width: 7px; height: 7px; border-radius: 999px; background: var(--gold); display: block;"></span>
        {/if}
      </button>
    {/each}
  </nav>
</aside>
