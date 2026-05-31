import { computed, reactive, watch } from 'vue'

const STORAGE_KEY = 'mybooks_library'

const SEED_BOOKS = [
  createSeedBook({
    id: 'midnight-library',
    title: 'La biblioteca de medianoche',
    authors: ['Matt Haig'],
    status: 'reading',
    scheme: 0,
    categories: ['Ficción'],
    pages: 304,
    published: '2020',
    progress: 62,
  }),
  createSeedBook({
    id: 'atomic-habits',
    title: 'Hábitos atómicos',
    authors: ['James Clear'],
    status: 'reading',
    scheme: 4,
    categories: ['No ficción'],
    pages: 326,
    published: '2018',
    progress: 28,
  }),
  createSeedBook({
    id: 'tokio-blues',
    title: 'Tokio Blues',
    authors: ['Haruki Murakami'],
    status: 'read',
    scheme: 1,
    categories: ['Novela'],
    pages: 384,
    published: '1987',
    rating: 4,
  }),
  createSeedBook({
    id: 'cien-anos',
    title: 'Cien años de soledad',
    authors: ['Gabriel García Márquez'],
    status: 'read',
    scheme: 2,
    categories: ['Clásico'],
    pages: 432,
    published: '1967',
    rating: 5,
  }),
  createSeedBook({
    id: 'nombre-viento',
    title: 'El nombre del viento',
    authors: ['Patrick Rothfuss'],
    status: 'wishlist',
    scheme: 7,
    categories: ['Fantasía'],
    pages: 662,
    published: '2007',
  }),
  createSeedBook({
    id: 'circe',
    title: 'Circe',
    authors: ['Madeline Miller'],
    status: 'wishlist',
    scheme: 5,
    categories: ['Mitología'],
    pages: 393,
    published: '2018',
  }),
  createSeedBook({
    id: 'kafka-orilla',
    title: 'Kafka en la orilla',
    authors: ['Haruki Murakami'],
    status: 'wishlist',
    scheme: 8,
    categories: ['Realismo mágico'],
    pages: 505,
    published: '2002',
  }),
  createSeedBook({
    id: 'sombra-viento',
    title: 'La sombra del viento',
    authors: ['Carlos Ruiz Zafón'],
    status: 'wishlist',
    scheme: 0,
    categories: ['Misterio'],
    pages: 576,
    published: '2001',
  }),
  createSeedBook({
    id: 'mujercitas',
    title: 'Mujercitas',
    authors: ['Louisa May Alcott'],
    status: 'wishlist',
    scheme: 5,
    categories: ['Clásico'],
    pages: 544,
    published: '1868',
  }),
  createSeedBook({
    id: 'pachinko',
    title: 'Pachinko',
    authors: ['Min Jin Lee'],
    status: 'wishlist',
    scheme: 6,
    categories: ['Histórica'],
    pages: 496,
    published: '2017',
  }),
  createSeedBook({
    id: 'infinito-junco',
    title: 'El infinito en un junco',
    authors: ['Irene Vallejo'],
    status: 'wishlist',
    scheme: 4,
    categories: ['Ensayo'],
    pages: 452,
    published: '2019',
  }),
  createSeedBook({
    id: 'normal-people',
    title: 'Normal People',
    authors: ['Sally Rooney'],
    status: 'wishlist',
    scheme: 8,
    categories: ['Novela'],
    pages: 273,
    published: '2018',
  }),
  createSeedBook({
    id: 'arboles-cantan',
    title: 'Donde los árboles cantan',
    authors: ['Laura Gallego'],
    status: 'wishlist',
    scheme: 0,
    categories: ['Fantasía'],
    pages: 477,
    published: '2011',
  }),
  createSeedBook({
    id: 'poder-ahora',
    title: 'El poder del ahora',
    authors: ['Eckhart Tolle'],
    status: 'wishlist',
    scheme: 2,
    categories: ['Desarrollo personal'],
    pages: 224,
    published: '1997',
  }),
  createSeedBook({
    id: 'hija-misterio',
    title: 'La hija del misterio',
    authors: ['Autora desconocida'],
    status: 'wishlist',
    scheme: 9,
    categories: ['Misterio'],
    pages: 320,
    published: '2022',
  }),
  createSeedBook({
    id: 'fundacion',
    title: 'Fundación',
    authors: ['Isaac Asimov'],
    status: 'recommended',
    scheme: 6,
    categories: ['Ciencia ficción'],
    pages: 255,
    published: '1951',
    recommendedBy: 'Vale',
  }),
  createSeedBook({
    id: 'piranesi',
    title: 'Piranesi',
    authors: ['Susanna Clarke'],
    status: 'recommended',
    scheme: 8,
    categories: ['Fantasía'],
    pages: 272,
    published: '2020',
    recommendedBy: 'Martín',
  }),
]

const state = reactive({
  books: loadBooks(),
})

watch(
  () => state.books,
  (books) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  },
  { deep: true }
)

export function useBooksStore() {
  const counts = computed(() => ({
    reading: byStatus('reading').value.length,
    read: byStatus('read').value.length,
    wishlist: byStatus('wishlist').value.length,
    recommended: byStatus('recommended').value.length,
  }))

  function byStatus(status) {
    return computed(() => state.books.filter((book) => book.status === status))
  }

  function isInLibrary(id) {
    return state.books.some((book) => book.id === id)
  }

  function addBook(book, status = 'wishlist') {
    if (isInLibrary(book.id)) return
    state.books.push({ ...book, status })
  }

  function moveBook(id, status) {
    const book = state.books.find((item) => item.id === id)
    if (book) book.status = status
  }

  function updateBook(id, patch) {
    const index = state.books.findIndex((book) => book.id === id)
    if (index !== -1) {
      state.books[index] = { ...state.books[index], ...patch }
    }
  }

  function removeBook(id) {
    state.books = state.books.filter((book) => book.id !== id)
  }

  return {
    books: computed(() => state.books),
    counts,
    byStatus,
    isInLibrary,
    addBook,
    moveBook,
    updateBook,
    removeBook,
  }
}

function loadBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedBooks()

    const savedBooks = JSON.parse(raw)
    return Array.isArray(savedBooks) && savedBooks.length
      ? mergeSeedBooks(savedBooks.map(normalizeBook))
      : seedBooks()
  } catch {
    return seedBooks()
  }
}

function seedBooks() {
  return SEED_BOOKS.map(normalizeBook)
}

function mergeSeedBooks(books) {
  const existingIds = new Set(books.map((book) => book.id))
  const missingSeeds = seedBooks().filter((book) => !existingIds.has(book.id))
  return [...books, ...missingSeeds]
}

function createSeedBook(book) {
  return {
    desc: '',
    hasPreview: false,
    language: 'es',
    comment: '',
    startDate: '',
    endDate: '',
    openLibraryKey: '',
    coverId: null,
    ...book,
  }
}

function normalizeBook(book, index) {
  const validStatuses = ['reading', 'read', 'wishlist', 'recommended']

  return {
    id: book.id || `book-${index}`,
    title: book.title || 'Libro sin titulo',
    authors: Array.isArray(book.authors) ? book.authors : [book.author || 'Autor desconocido'],
    scheme: Number.isInteger(book.scheme) ? book.scheme : index,
    status: validStatuses.includes(book.status) ? book.status : 'wishlist',
    categories: book.categories || [],
    language: book.language || '',
    pages: book.pages || 0,
    published: book.published || '',
    desc: book.desc || '',
    hasPreview: Boolean(book.hasPreview),
    rating: book.rating || 0,
    progress: book.progress || 0,
    comment: book.comment || '',
    recommendedBy: book.recommendedBy || '',
    startDate: book.startDate || '',
    endDate: book.endDate || '',
    openLibraryKey: book.openLibraryKey,
    coverId: book.coverId,
  }
}
