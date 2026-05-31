<script lang="ts">
  import Icon from '../ui/Icon.svelte';
  import { STATUS_META } from '$lib/types';
  import type { BookStatus } from '$lib/types';

  interface Props {
    status: BookStatus;
    small?: boolean;
  }

  let { status, small = false }: Props = $props();

  const meta = $derived(STATUS_META[status]);
</script>

{#if meta}
  <span
    style="
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-family: 'DM Sans', sans-serif;
      font-size: {small ? '10.5px' : '12px'};
      font-weight: 600;
      letter-spacing: 0.02em;
      color: {meta.color};
      background: var(--paper-2);
      border: 1px solid var(--line);
      padding: {small ? '3px 8px' : '5px 11px'};
      border-radius: 999px;
    "
  >
    <Icon name={meta.icon} size={small ? 11 : 13} stroke={1.8} />
    {meta.label}
  </span>
{/if}
