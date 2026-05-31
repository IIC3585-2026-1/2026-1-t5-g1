<script lang="ts">
  interface Props {
    value?: number;
    height?: number;
    showLabel?: boolean;
  }

  let { value = 0, height = 6, showLabel = false }: Props = $props();
</script>

<div style="display: flex; align-items: center; gap: 10px; width: 100%;">
  <div style="
    flex: 1;
    height: {height}px;
    background: var(--line);
    border-radius: 999px;
    overflow: hidden;
  ">
    <div style="
      width: {value}%;
      height: 100%;
      background: var(--coffee);
      border-radius: 999px;
      transition: width 0.4s ease;
    "></div>
  </div>

  {#if showLabel}
    <span style="
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: var(--ink-soft);
      min-width: 34px;
      text-align: right;
    ">{value}%</span>
  {/if}
</div>
