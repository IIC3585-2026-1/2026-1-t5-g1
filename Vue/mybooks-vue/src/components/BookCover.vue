<template>
  <div
    class="cover"
    :class="{ compact }"
    :title="`${book.title} - ${firstAuthor}`"
  >
    <img :src="coverUrl" :alt="book.title" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import noImage from '../assets/no-image.jpg'

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

const firstAuthor = computed(() => props.book.authors?.[0] || props.book.author || 'Autor desconocido')
const coverUrl = computed(() =>
  props.book.thumbnail_url || (props.book.coverId ? `https://covers.openlibrary.org/b/id/${props.book.coverId}-M.jpg` : noImage)
)
</script>

<style scoped>
.cover {
  position: relative;
  display: flex;
  width: 100%;
  aspect-ratio: 0.68 / 1;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18), 0 8px 18px -15px rgba(60, 44, 28, 0.7);
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
</style>
