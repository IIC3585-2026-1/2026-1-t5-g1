<script lang="ts">
  import Icon from './Icon.svelte';

  interface Props {
    variant?: 'primary' | 'sage' | 'gold' | 'ghost' | 'soft' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
    iconRight?: string;
    full?: boolean;
    disabled?: boolean;
    onclick?: () => void;
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    full = false,
    disabled = false,
    onclick,
    children,
  }: Props = $props();

  let hover = $state(false);

  const sizes = {
    sm: { padding: '7px 12px',  fontSize: '13px' },
    md: { padding: '10px 18px', fontSize: '14px' },
    lg: { padding: '14px 26px', fontSize: '15.5px' },
  };

  const variants = $derived({
    primary: { background: hover ? 'var(--ink)'       : 'var(--coffee)',    color: '#fff',     border: '1px solid transparent' },
    sage:    { background: hover ? 'var(--sage-deep)'  : 'var(--sage)',      color: '#fff',     border: '1px solid transparent' },
    gold:    { background: hover ? 'var(--gold-deep)'  : 'var(--gold)',      color: '#2C2620',  border: '1px solid transparent' },
    ghost:   { background: hover ? 'var(--paper-2)'   : 'transparent',      color: 'var(--ink)', border: '1px solid var(--line)' },
    soft:    { background: hover ? 'var(--paper-3)'   : 'var(--paper-2)',   color: 'var(--ink)', border: '1px solid var(--line)' },
    danger:  { background: hover ? 'var(--burgundy)'  : 'transparent',      color: hover ? '#fff' : 'var(--burgundy)', border: '1px solid var(--burgundy)' },
  }[variant]);

  const iconSize = $derived(size === 'lg' ? 18 : 16);
</script>

<button
  {onclick}
  {disabled}
  onmouseenter={() => hover = true}
  onmouseleave={() => hover = false}
  style="
    padding: {sizes[size].padding};
    font-size: {sizes[size].fontSize};
    background: {variants.background};
    color: {variants.color};
    border: {variants.border};
    width: {full ? '100%' : 'auto'};
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    letter-spacing: 0.01em;
    border-radius: 999px;
    cursor: {disabled ? 'not-allowed' : 'pointer'};
    opacity: {disabled ? 0.5 : 1};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    white-space: nowrap;
    transition: background 0.18s ease, color 0.18s ease;
  "
>
  {#if icon}
    <Icon name={icon} size={iconSize} />
  {/if}

  {@render children?.()}

  {#if iconRight}
    <Icon name={iconRight} size={iconSize} />
  {/if}
</button>
