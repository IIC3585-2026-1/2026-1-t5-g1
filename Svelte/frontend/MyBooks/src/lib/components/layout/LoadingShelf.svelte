<script lang="ts">
  interface Props {
    count?: number;
  }

  let { count = 6 }: Props = $props();
</script>

<div style="
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 28px;
">
  {#each Array.from({ length: count }) as _, i (i)}
    <div>
      <div class="mb-shimmer" style="width: 100%; aspect-ratio: 1 / 1.5; border-radius: 5px;"></div>
      <div class="mb-shimmer" style="height: 14px; border-radius: 4px; margin-top: 12px; width: 85%;"></div>
      <div class="mb-shimmer" style="height: 11px; border-radius: 4px; margin-top: 7px; width: 55%;"></div>
    </div>
  {/each}
</div>
