<script lang="ts">
  import Icon from './Icon.svelte';

  interface Props {
    value?: number;
    size?: number;
    onChange?: (n: number) => void;
  }

  let { value = 0, size = 16, onChange }: Props = $props();

  let hover = $state(0);
</script>

<div
  role="group"
  aria-label="Valoración"
  style="display: inline-flex; gap: 2px;"
  onmouseleave={() => hover = 0}
>
  {#each [1, 2, 3, 4, 5] as n}
    {@const filled = (hover || value) >= n}
    <button
      type="button"
      onclick={onChange ? () => onChange(n) : undefined}
      onmouseenter={onChange ? () => hover = n : undefined}
      aria-label="Valorar {n} de 5"
      disabled={!onChange}
      style="
        background: none; border: none; padding: 2px;
        color: {filled ? 'var(--gold-deep)' : 'var(--line-2)'};
        cursor: {onChange ? 'pointer' : 'default'};
        line-height: 0;
        transition: color 0.12s;
      "
    >
      <Icon
        name="star"
        {size}
        stroke={1.2}
        style="fill: {filled ? 'var(--gold)' : 'none'}"
      />
    </button>
  {/each}
</div>
