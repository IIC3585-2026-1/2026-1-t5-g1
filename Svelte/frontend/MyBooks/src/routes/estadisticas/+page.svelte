<script lang="ts">
  import { store } from '$lib/store.svelte';
  import SectionHead from '$lib/components/layout/SectionHead.svelte';
  import Icon from '$lib/components/ui/Icon.svelte';
  import Tooltip from '$lib/components/ui/Tooltip.svelte';

  const booksReadByMonth = $derived(
    store.byStatus('read').reduce((acc, b) => {
        if (!b.endDate) return acc;
        const [year, month] = b.endDate.split('-');
        if (year === String(new Date().getFullYear())) {
        acc[Number(month)] = (acc[Number(month)] ?? 0) + 1;
        }
        return acc;
    }, {} as Record<number, number>)
    );

  const booksStartedByMonth = $derived(
    [...store.byStatus('reading'), ...store.byStatus('read')].reduce((acc, b) => {
        if (!b.startDate) return acc;
        const [year, month] = b.startDate.split('-');
        if (year === String(new Date().getFullYear())) {
        acc[Number(month)] = (acc[Number(month)] ?? 0) + 1;
        }
        return acc;
    }, {} as Record<number, number>)
    );

  const readByMonth = $derived(
    (() => {
        const counts = Object.values(booksReadByMonth);
        if (counts.length === 0) return 0;
        const avg = counts.reduce((sum, n) => sum + n, 0) / 12;
        return Math.round(avg * 10) / 10; // un decimal: 2.3
    })()
    );

  const readThisYear = $derived(
    Object.values(booksReadByMonth).reduce((sum, n) => sum + n, 0)
    );

  function monthIntensity(count: number): string {
    if (count === 0) return 'var(--paper-3)';
    if (count === 1) return 'var(--coffee-light, #D4B896)';
    if (count === 2) return 'var(--coffee, #A07850)';
    return 'var(--coffee-deep, #6B4A30)'; // 3 o más
  }


  const tiles = $derived([
  { label: 'Libros leídos',  icon: 'check', count: readThisYear },
  { label: 'Libros por mes', icon: 'clock', count: readByMonth  },
]);

  const months = [
    { number: 1, name: 'enero', label: "E"},
    { number: 2, name: 'febrero', label: "F" },
    { number: 3, name: 'marzo', label: "M" },
    { number: 4, name: 'abril', label: "A" },
    { number: 5, name: 'mayo', label: "M"},
    { number: 6, name: 'junio', label: "J" },
    { number: 7, name: 'julio', label: "J"},
    { number: 8, name: 'agosto', label: "A" },
    { number: 9, name: 'septiembre', label: "S"},
    { number: 10, name: 'octubre', label: "O" },
    { number: 11, name: 'noviembre', label: "N"},
    { number: 12, name: 'diciembre', label: "D" },
  ]
</script>

<div style="max-width: 1200px; margin: 0 auto;">

  <SectionHead
    kicker="Estadísticas"
    title="Tu año en libros"
    sub="Resumen de tu actividad lectora en 2026"
  />

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; margin-bottom: 34px;">
    {#each tiles as { label, icon, count }}
      <button
        onmouseenter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
        onmouseleave={(e) => (e.currentTarget.style.transform = 'none')}
        style="
          text-align: left; background: var(--paper-2);
          border: 1px solid var(--line); border-radius: 16px;
          padding: 18px 20px;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        "
      >
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="color: var(--gold-deep);"><Icon name={icon} size={22} /></div>
        </div>
        <div style="font-family: 'Newsreader', serif; font-size: 40px; font-weight: 500; color: var(--ink); margin-top: 12px; line-height: 1;">
          {count}
        </div>
        <div style="font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--ink-soft); margin-top: 4px;">
          {label}
        </div>
      </button>
    {/each}
  </div>

  <!-- libros por mes -->
  <div style="
          text-align: left; background: var(--paper-2);
          border: 1px solid var(--line); border-radius: 16px;
          padding: 18px 20px;
        ">
    <h3 style="font-family: 'Newsreader', serif; font-size: 20px; font-weight: 500; color: var(--ink);">
        Actividad Mensual
    </h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(10px, 1fr)); gap: 14px; ">
    {#each months as { name, number, label }}
    {@const readCount = booksReadByMonth[number] ?? 0}
    {@const readingCount = booksStartedByMonth[number] ?? 0}
      <div
        style="
          text-align: left; background: var(--paper-2);
          padding: 18px 20px;
        "
      >
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 10px">
          <div style="font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--ink-soft); margin-top: 4px;">
            {label}
          </div>
            <Tooltip month={name} finished={readCount} started={readingCount}>
                <div style="
                    width: 36px; height: 36px;
                    border-radius: 7px; cursor: pointer;
                    background: {monthIntensity(readCount + readingCount)};
                    border: 1px solid var(--line);
                "></div>
            </Tooltip>
        </div>
      </div>
    {/each}
    </div>
  </div>

</div>