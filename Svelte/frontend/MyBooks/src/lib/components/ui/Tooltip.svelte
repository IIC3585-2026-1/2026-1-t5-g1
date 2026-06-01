<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    month: string;
    finished: number;
    started: number;
    children: Snippet;
  }

  let { month, finished, started, children }: Props = $props();
  let visible = $state(false);
</script>

<div
  role="group"
  style="position: relative; display: inline-block;"
  onmouseenter={() => visible = true}
  onmouseleave={() => visible = false}
>
  {@render children()}

  {#if visible}
    <div role="tooltip" style="
      position: absolute; bottom: calc(100% + 10px); left: 50%;
      transform: translateX(-50%);
      background: var(--paper); border: 1px solid var(--line);
      border-radius: 12px; padding: 10px 14px;
      box-shadow: 0 8px 24px rgba(44,26,14,0.12);
      white-space: nowrap; pointer-events: none;
      min-width: 160px; z-index: 20;
    ">
      <!-- nombre del mes -->
      <div style="
        font-family: 'Newsreader', serif; font-style: italic;
        font-size: 11px; color: var(--ink-soft);
        margin-bottom: 8px; text-align: center;
      ">{month} {new Date().getFullYear()}</div>

      <!-- fila terminados -->
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <div style="
          width: 22px; height: 22px; border-radius: 6px;
          background: var(--paper-3); display: flex;
          align-items: center; justify-content: center; flex-shrink: 0;
        ">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
            stroke="var(--ink-soft)" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3,8 6.5,12 13,4"/>
          </svg>
        </div>
        <span style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--ink-soft); flex: 1;">Terminados</span>
        <span style="font-family: 'Newsreader', serif; font-size: 15px; font-weight: 700; color: var(--ink);">{finished}</span>
      </div>

      <!-- fila comenzados -->
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="
          width: 22px; height: 22px; border-radius: 6px;
          background: var(--paper-3); display: flex;
          align-items: center; justify-content: center; flex-shrink: 0;
        ">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
            stroke="var(--ink-soft)" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 13V4M8 4C8 4 5 3 2 4v9c3-1 6 0 6 0M8 4c0 0 3-1 6 0v9c-3-1-6 0-6 0"/>
          </svg>
        </div>
        <span style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--ink-soft); flex: 1;">Comenzados</span>
        <span style="font-family: 'Newsreader', serif; font-size: 15px; font-weight: 700; color: var(--ink);">{started}</span>
      </div>

      <!-- flechita -->
      <div style="
        position: absolute; top: 100%; left: 50%;
        transform: translateX(-50%);
        width: 12px; height: 7px; overflow: hidden;
      ">
        <div style="
          position: absolute; width: 10px; height: 10px;
          background: var(--paper); border: 1px solid var(--line);
          border-radius: 2px; top: -6px; left: 1px;
          transform: rotate(45deg);
        "></div>
      </div>
    </div>
  {/if}
</div>