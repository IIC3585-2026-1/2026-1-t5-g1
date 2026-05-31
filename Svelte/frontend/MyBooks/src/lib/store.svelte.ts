import type { Book, BookStatus } from './types';

const STORAGE_KEY = 'mybooks_library';

// ── Carga desde localStorage (o array vacío si es primera vez) ──
function loadBooks(): Book[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Book[]) : [];
  } catch {
    return [];
  }
}

// ── Clase del store ──────────────────────────────────────────────
class BooksStore {
  books = $state<Book[]>(loadBooks());

  // ── Persistencia automática ──────────────────────────────────
  constructor() {
    $effect.root(() => {
      $effect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));
      });
    });
  }

  // ── Lecturas (derivadas) ─────────────────────────────────────
  byStatus(status: BookStatus): Book[] {
    return this.books.filter((b) => b.status === status);
  }

  find(id: string): Book | undefined {
    return this.books.find((b) => b.id === id);
  }

  isInLibrary(id: string): boolean {
    return this.books.some((b) => b.id === id);
  }

  // ── Escrituras (acciones) ────────────────────────────────────
  add(book: Book): void {
    if (!this.isInLibrary(book.id)) {
      this.books = [...this.books, book];
    }
  }

  move(id: string, status: BookStatus): void {
    const i = this.books.findIndex((b) => b.id === id);
    if (i !== -1) {
      this.books[i] = { ...this.books[i], status };
    }
  }

  update(id: string, patch: Partial<Book>): void {
    const i = this.books.findIndex((b) => b.id === id);
    if (i !== -1) {
      this.books[i] = { ...this.books[i], ...patch };
    }
  }

  remove(id: string): void {
    this.books = this.books.filter((b) => b.id !== id);
  }
}

export const store = new BooksStore();
