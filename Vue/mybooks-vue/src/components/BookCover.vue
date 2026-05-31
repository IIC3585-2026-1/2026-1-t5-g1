<template>
  <div
    class="cover"
    :class="{ compact }"
    :style="coverStyle"
    :title="`${book.title} - ${firstAuthor}`"
  >
    <img v-if="coverUrl" :src="coverUrl" :alt="book.title" />
    <template v-else>
      <span class="cover-category">{{ book.categories?.[0] || 'Novela' }}</span>
      <span class="cover-line"></span>
      <strong>{{ book.title }}</strong>
      <small>{{ firstAuthor }}</small>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { COVER_SCHEMES } from '../lib/openLibrary'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const firstAuthor = computed(() => props.book.authors?.[0] || 'Autor desconocido')
const scheme = computed(() => COVER_SCHEMES[(props.book.scheme || 0) % COVER_SCHEMES.length])
const coverUrl = computed(() =>
  props.book.coverId ? `https://covers.openlibrary.org/b/id/${props.book.coverId}-M.jpg` : null
)
const coverStyle = computed(() => ({
  '--cover-bg': scheme.value.bg,
  '--cover-ink': scheme.value.ink,
  '--cover-accent': scheme.value.accent,
}))
</script>

<style scoped>
.cover {
  position: relative;
  display: flex;
  width: 100%;
  aspect-ratio: 0.68 / 1;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 24px;
  border-radius: 16px;
  background: var(--cover-bg);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18), 0 8px 18px -15px rgba(60, 44, 28, 0.7);
  color: var(--cover-ink);
  font-family: Georgia, "Times New Roman", serif;
  text-align: center;
}

.cover::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 10px;
  background: rgba(0, 0, 0, 0.16);
  content: "";
}

.cover::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, rgba(255, 255, 255, 0.13), transparent 36%, rgba(0, 0, 0, 0.08));
  content: "";
  pointer-events: none;
}

.cover.compact {
  width: 150px;
  min-width: 150px;
  border-radius: 18px;
  box-shadow: 0 22px 28px -22px rgba(0, 0, 0, 0.9);
}

img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-category,
.cover-line,
strong,
small {
  position: relative;
  z-index: 1;
}

.cover-category {
  color: var(--cover-accent);
  font-family: "DM Sans", Inter, sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.cover-line {
  display: block;
  width: 80%;
  height: 2px;
  margin: 13px auto 18px;
  background: var(--cover-accent);
}

strong {
  font-size: clamp(24px, 2.5vw, 35px);
  font-weight: 700;
  line-height: 1.03;
}

small {
  margin-top: 18px;
  font-family: "DM Sans", Inter, sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.18em;
  opacity: 0.72;
  text-transform: uppercase;
}
</style>
