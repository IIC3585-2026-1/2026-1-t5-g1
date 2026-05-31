import type { Book, CoverLayout } from './types';

// ── Esquemas de color para portadas procedurales ─────
export const COVER_SCHEMES = [
  { bg: '#2F4032', ink: '#EFE7D2', accent: '#C2A05B' },
  { bg: '#5A2A2E', ink: '#F0E3D4', accent: '#D9A05B' },
  { bg: '#C9A24A', ink: '#3A2A14', accent: '#3A2A14' },
  { bg: '#6B4A30', ink: '#F2E7D3', accent: '#D7B97E' },
  { bg: '#EEE5D0', ink: '#2C2620', accent: '#9A6A43' },
  { bg: '#B5613F', ink: '#F6EADC', accent: '#F1D6A8' },
  { bg: '#8B9A78', ink: '#2C3724', accent: '#2C3724' },
  { bg: '#2A2723', ink: '#E9DDC4', accent: '#C2A05B' },
  { bg: '#566E66', ink: '#EFE7D2', accent: '#E0C98A' },
  { bg: '#4A3550', ink: '#E8D9D0', accent: '#D9A8B0' },
  { bg: '#3C5067', ink: '#E7E0CF', accent: '#D7B97E' },
  { bg: '#A24A3C', ink: '#F4E6D6', accent: '#F0CFA0' },
];

export const COVER_LAYOUTS: CoverLayout[] = ['classic'];

// ── Tipo que representa un resultado de Open Library ─
export interface OLDoc {
  key:                     string;
  title:                   string;
  author_name?:            string[];
  first_publish_year?:     number;
  cover_i?:                number;
  subject?:                string[];
  language?:               string[];
  number_of_pages_median?: number;
}

// ── Convierte un resultado de OL a nuestro tipo Book ─
export function mapOLBook(doc: OLDoc): Book {
  const scheme = Math.floor(Math.random() * COVER_SCHEMES.length);
  const layout = COVER_LAYOUTS[Math.floor(Math.random() * COVER_LAYOUTS.length)];

  return {
    id:             doc.key.replace('/works/', ''),
    title:          doc.title,
    authors:        doc.author_name ?? ['Autor desconocido'],
    scheme,
    layout,
    status:         'wishlist',
    categories:     (doc.subject ?? []).slice(0, 3),
    language:       (doc.language ?? []).includes('spa') ? 'es' : 'en',
    pages:          doc.number_of_pages_median ?? 0,
    published:      String(doc.first_publish_year ?? ''),
    desc:           '',
    hasPreview:     false,
    rating:         0,
    progress:       0,
    comment:        '',
    recommendedBy:  '',
    startDate:      '',
    endDate:        '',
    openLibraryKey: doc.key,
    coverId:        doc.cover_i,
  };
}
