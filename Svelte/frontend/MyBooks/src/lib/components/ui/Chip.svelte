<script lang="ts">
  import Icon from './Icon.svelte';

  interface Props {
    active?: boolean;
    icon?: string;
    onclick?: () => void;
    children: import('svelte').Snippet;
  }

  let { active = false, icon, onclick, children }: Props = $props();

  let hover = $state(false);
</script>

<button
  {onclick}
  onmouseenter={() => hover = true}
  onmouseleave={() => hover = false}
  style="
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 7px 14px;
    border-radius: 999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s ease, color 0.15s ease;
    background: {active ? 'var(--ink)' : hover ? 'var(--paper-3)' : 'var(--paper-2)'};
    color: {active ? 'var(--paper)' : 'var(--ink)'};
    border: 1px solid {active ? 'var(--ink)' : 'var(--line)'};
  "
>
  {#if icon}
    <Icon name={icon} size={14} />
  {/if}
  {@render children()}
</button>
