<script lang="ts">
  interface Props {
    name: string;
    size?: number;
    stroke?: number;
    style?: string;
  }

  let { name, size = 20, stroke = 1.6, style = '' }: Props = $props();

  const paths: Record<string, string> = {
    home:       'M3 10.5 12 4l9 6.5 M5.5 9.5V20h13V9.5',
    compass:    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z M15.5 8.5l-2 5-5 2 2-5z',
    books:      'M5 4h5v16H5z M10 4h5v16h-5z M15 4l4 .7-2.5 15.6-4-.7',
    heart:      'M12 20s-7-4.6-7-9.6A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 3.4C19 15.4 12 20 12 20z',
    spark:      'M12 3v6M12 15v6M3 12h6M15 12h6 M6.5 6.5l3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3',
    chart:      'M4 20V4M20 20H4 M8 16v-4M12 16V8M16 16v-6',
    check:      'M5 12l4.5 4.5L19 7',
    reading:    'M12 6.5C9.5 4.5 6 4.5 4 5.5v13c2-1 5.5-1 8 1 2.5-2 6-2 8-1v-13c-2-1-5.5-1-8 1z M12 6.5V20',
    search:     'M17.5 17.5l-3.5-3.5 M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z',
    plus:       'M12 5v14M5 12h14',
    chevron:    'M9 6l6 6-6 6',
    chevronDown:'M6 9l6 6 6-6',
    star:       'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z',
    close:      'M6 6l12 12M18 6 6 18',
    edit:       'M4 20h4L19 9l-4-4L4 16z M14 6l4 4',
    eye:        'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z',
    arrowRight: 'M5 12h14M13 6l6 6-6 6',
    arrowLeft:  'M19 12H5M11 6l-6 6 6 6',
    clock:      'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z M12 7.5V12l3 2',
    grid:       'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
    bookmark:   'M6 4h12v16l-6-4-6 4z',
    globe:      'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z M3.5 12h17 M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17',
    pages:      'M6 3h9l3 3v15H6z M15 3v3h3',
    menu:       'M4 7h16M4 12h16M4 17h16',
    dice:       'M4 4h16v16H4z M9 9h.01M15 15h.01M15 9h.01M9 15h.01',
    trash:      'M3 6h18M8 6V4h8v2 M19 6l-1 14H6L5 6',
  };
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={stroke}
  stroke-linecap="round"
  stroke-linejoin="round"
  {style}
  aria-hidden="true"
>
  {#if paths[name]}
    <path d={paths[name]} />
  {/if}
</svg>
