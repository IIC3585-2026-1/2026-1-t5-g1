<script lang="ts">
  import Icon from '../ui/Icon.svelte';

  interface Props {
    icon?: string;
    title: string;
    sub?: string;
    action?: import('svelte').Snippet;
  }

  let { icon = 'books', title, sub, action }: Props = $props();
</script>

<div style="text-align: center; padding: 64px 24px; max-width: 420px; margin: 0 auto;">
  <div style="
    width: 72px; height: 72px;
    border-radius: 999px;
    background: var(--paper-2);
    border: 1px dashed var(--line-2);
    display: grid; place-items: center;
    margin: 0 auto 20px;
    color: var(--ink-soft);
  ">
    <Icon name={icon} size={30} stroke={1.4} />
  </div>

  <div style="font-family: 'Newsreader', serif; font-size: 24px; color: var(--ink); margin-bottom: 8px;">
    {title}
  </div>

  {#if sub}
    <div style="font-family: 'DM Sans', sans-serif; font-size: 14.5px; color: var(--ink-soft); line-height: 1.5; margin-bottom: {action ? '22px' : '0'};">
      {sub}
    </div>
  {/if}

  {#if action}
    {@render action()}
  {/if}
</div>
