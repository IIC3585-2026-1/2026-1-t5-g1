// ── Tipo portada ────────────────────────────────
export type CoverLayout = 'classic';

export type BookStatus = 'reading' | 'read' | 'wishlist' | 'recommended';

// ── Esquema de color para portadas procedurales ─────
export interface CoverScheme {
  bg:     string;   // color de fondo
  ink:    string;   // color de texto
  accent: string;   // color de acento (líneas, detalles)
}

// ── El libro ────────────────────────────────────────
export interface Book {
  id:            string;
  title:         string;
  authors:       string[];

  // portada procedural (siempre presente)
  scheme:        number;       // índice en COVER_SCHEMES
  layout:        CoverLayout;

  // estado en la biblioteca
  status:        BookStatus;

  // metadata
  categories:    string[];
  language:      string;       // 'es' | 'en' | ...
  pages:         number;
  published:     string;       // año como string: '2021'
  desc:          string;
  hasPreview:    boolean;

  // registro personal
  rating:        number;       // 0–5
  progress:      number;       // 0–100 (%)
  comment:       string;
  recommendedBy: string;
  startDate:     string;       // 'YYYY-MM-DD' o ''
  endDate:       string;

  // Open Library (cuando viene de búsqueda)
  openLibraryKey?: string;     // '/works/OL123W'
  coverId?:        number;     // ID de portada en OL
}

// ── Metadata de cada estado ─────────────────────────
export interface StatusMeta {
  label: string;
  icon:  string;
  color: string;
}

export const STATUS_META: Record<BookStatus, StatusMeta> = {
  reading:     { label: 'Leyendo',      icon: 'reading', color: 'var(--coffee)'    },
  read:        { label: 'Leído',        icon: 'check',   color: 'var(--sage-deep)' },
  wishlist:    { label: 'Quiero leer',  icon: 'heart',   color: 'var(--burgundy)'  },
  recommended: { label: 'Recomendado',  icon: 'spark',   color: 'var(--gold-deep)' },
};
