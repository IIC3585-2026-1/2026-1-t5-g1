export function normalizeStoredBook(book, index = 0) {
  return {
    id: book.id || `book-${index}`,
    title: book.title || 'Libro sin título',
    author: book.author || book.authors?.[0] || 'Autor desconocido',
    authors: Array.isArray(book.authors) ? book.authors : [book.author || 'Autor desconocido'],
    thumbnail_url: book.thumbnail_url || null,
    coverId: book.coverId || null,
    scheme: Number.isInteger(book.scheme) ? book.scheme : index,
    status: book.status || 'wantToRead',
    categories: book.categories || [],
    pages: book.pages || 0,
    published: book.published || '',
    progress: book.progress || 0,
  }
}

export function normalizeStoredBooks(books) {
  return books.map(normalizeStoredBook)
}
