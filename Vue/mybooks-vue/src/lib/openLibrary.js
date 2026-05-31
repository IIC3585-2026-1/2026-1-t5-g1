export const COVER_SCHEMES = [
  { bg: '#2f4032', ink: '#efe7d2', accent: '#c2a05b' },
  { bg: '#5a2a2e', ink: '#f0e3d4', accent: '#d9a05b' },
  { bg: '#c9a24a', ink: '#3a2a14', accent: '#3a2a14' },
  { bg: '#6b4a30', ink: '#f2e7d3', accent: '#d7b97e' },
  { bg: '#eee5d0', ink: '#2c2620', accent: '#9a6a43' },
  { bg: '#b5613f', ink: '#f6eadc', accent: '#f1d6a8' },
  { bg: '#8b9a78', ink: '#2c3724', accent: '#2c3724' },
  { bg: '#2a2723', ink: '#e9ddc4', accent: '#c2a05b' },
  { bg: '#566e66', ink: '#efe7d2', accent: '#e0c98a' },
  { bg: '#4a3550', ink: '#e8d9d0', accent: '#d9a8b0' },
]

const API_URL = 'https://openlibrary.org/search.json'

export const randomSubjects = [
  'fiction',
  'fantasy',
  'mystery',
  'romance',
  'science',
  'history',
  'thriller',
]

export async function searchOpenLibraryBooks(query, limit = 18) {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
    fields:
      'key,title,author_name,first_publish_year,cover_i,subject,language,number_of_pages_median',
  })
  const response = await fetch(`${API_URL}?${params}`)

  if (!response.ok) {
    throw new Error('No se pudo cargar OpenLibrary')
  }

  const data = await response.json()
  return (data.docs ?? []).map(mapOpenLibraryBook)
}

export function mapOpenLibraryBook(doc, index = 0) {
  const id = doc.key?.replace('/works/', '') || `${doc.title}-${index}`
  const language = doc.language?.includes('spa') ? 'es' : doc.language?.[0] || ''

  return {
    id,
    title: doc.title || 'Libro sin titulo',
    authors: doc.author_name?.length ? doc.author_name : ['Autor desconocido'],
    scheme: Math.abs(hashString(id)) % COVER_SCHEMES.length,
    status: 'wishlist',
    categories: (doc.subject ?? []).slice(0, 3),
    language,
    pages: doc.number_of_pages_median || 0,
    published: String(doc.first_publish_year || ''),
    desc: '',
    hasPreview: false,
    rating: 0,
    progress: 0,
    comment: '',
    recommendedBy: '',
    startDate: '',
    endDate: '',
    openLibraryKey: doc.key,
    coverId: doc.cover_i,
  }
}

function hashString(value) {
  return [...value].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) | 0, 0)
}
