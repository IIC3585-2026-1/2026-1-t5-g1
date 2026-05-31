<script lang="ts">
  interface Props {
    kicker?: string;
    title: string;
    sub?: string;
    right?: import('svelte').Snippet;
  }

  let { kicker, title, sub, right }: Props = $props();
</script>

<div style="
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
  flex-wrap: wrap;
">
  <div>
    {#if kicker}
      <div style="
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--coffee);
        font-weight: 600;
        margin-bottom: 8px;
      ">{kicker}</div>
    {/if}

    <h1 style="
      font-family: 'Newsreader', serif;
      font-size: 38px;
      font-weight: 500;
      color: var(--ink);
      line-height: 1.05;
      margin: 0;
      letter-spacing: -0.01em;
    ">{title}</h1>

    {#if sub}
      <p style="
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        color: var(--ink-soft);
        margin: 10px 0 0;
        max-width: 560px;
        line-height: 1.5;
      ">{sub}</p>
    {/if}
  </div>

  {#if right}
    {@render right()}
  {/if}
</div>
