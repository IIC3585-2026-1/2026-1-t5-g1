export type CoverLayout = 'classic';

export type BookStatus = 'reading' | 'read' | 'wishlist' | 'recommended';

// Esquema para portadas sin foto
export interface CoverScheme {
  bg:     string;   // color de fondo
  ink:    string;   // color de texto
  accent: string;   // color de líneas, detalles
}

export interface Book {
  id:            string;
  title:         string;
  authors:       string[];
  scheme:        number;       
  layout:        CoverLayout;
  status:        BookStatus;
  categories:    string[];
  language:      string;       
  pages:         number;
  published:     string;       
  desc:          string;
  hasPreview:    boolean;
  rating:        number;       
  progress:      number;       
  comment:       string;
  recommendedBy: string;
  startDate:     string;      
  endDate:       string;
  openLibraryKey?: string;     
  coverId?:        number;     
}

// Metadata de cada estado 
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
