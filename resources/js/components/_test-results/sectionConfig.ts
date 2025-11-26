export type SectionKey =
  | 'Inicial'
  | 'Apariencia'
  | 'Densidad'
  | 'ASTMD5034'
  | 'AATCC150'
  | 'AATCC135'
  | 'ASTM D3776'
  | 'ASTM D3512'
  | 'AATCC179'
  | 'AATCC8'
  | 'AATCC81'
  | 'ASTMD2261'
  | 'AATCC61';

type SectionConfig = {
  title: string;
  routeSection: string;
  startButtonLabel: string;
  pendingMessage: string;
  editButtonLabel: string;
  allowImages?: boolean;
  onlyImages?: boolean;
};

export const SECTION_CONFIG: Record<SectionKey, SectionConfig> = {
  Inicial: {
    title: 'Datos Iniciales de la Muestra',
    routeSection: 'Inicial',
    startButtonLabel: 'Capturar Datos Iniciales',
    pendingMessage: 'Pendiente de capturar datos iniciales',
    editButtonLabel: 'Editar Datos Iniciales',
    allowImages: true,
  },
  Apariencia: {
    title: 'Apariencia de la Prenda',
    routeSection: 'Apariencia',
    startButtonLabel: 'Capturar Apariencia',
    pendingMessage: 'Pendiente de capturar datos de apariencia',
    editButtonLabel: 'Editar Apariencia',
    allowImages: true,
  },
  Densidad: {
    title: 'Datos de Densidad',
    routeSection: 'Densidad',
    startButtonLabel: 'Capturar Densidad',
    pendingMessage: 'Pendiente de capturar datos de densidad',
    editButtonLabel: 'Editar Densidad',
  },
  ASTMD5034: {
    title: 'ASTM D5034 – Resistencia a la tracción',
    routeSection: 'ASTMD5034',
    startButtonLabel: 'Capturar ASTM D5034',
    pendingMessage: 'Pendiente de capturar datos ASTM D5034',
    editButtonLabel: 'Editar ASTM D5034',
  },
  AATCC150: {
    title: 'AATCC 150 – Dimensionalidad',
    routeSection: 'AATCC150',
    startButtonLabel: 'Capturar AATCC 150',
    pendingMessage: 'Pendiente de capturar datos AATCC 150',
    editButtonLabel: 'Editar AATCC 150',
  },
  AATCC135: {
    title: 'AATCC 135 – Dimensionalidad (Lavado)',
    routeSection: 'AATCC135',
    startButtonLabel: 'Capturar AATCC 135',
    pendingMessage: 'Pendiente de capturar datos AATCC 135',
    editButtonLabel: 'Editar AATCC 135',
  },
  'ASTM D3776': {
    title: 'ASTM D3776 – Peso del tejido',
    routeSection: 'ASTM D3776',
    startButtonLabel: 'Capturar ASTM D3776',
    pendingMessage: 'Pendiente de capturar datos ASTM D3776',
    editButtonLabel: 'Editar ASTM D3776',
  },
  'ASTM D3512': {
    title: 'ASTM D3512 – Pilling',
    routeSection: 'ASTM D3512',
    startButtonLabel: 'Capturar ASTM D3512',
    pendingMessage: 'Pendiente de capturar datos ASTM D3512',
    editButtonLabel: 'Editar ASTM D3512',
  },
  AATCC179: {
    title: 'AATCC 179 – Torsión',
    routeSection: 'AATCC179',
    startButtonLabel: 'Capturar AATCC 179',
    pendingMessage: 'Pendiente de capturar datos AATCC 179',
    editButtonLabel: 'Editar AATCC 179',
  },
  AATCC8: {
    title: 'AATCC 8 – Solidez del color al frote',
    routeSection: 'AATCC8',
    startButtonLabel: 'Capturar AATCC 8',
    pendingMessage: 'Pendiente de capturar datos AATCC 8',
    editButtonLabel: 'Editar AATCC 8',
    allowImages: true,
  },
  AATCC81: {
    title: 'AATCC 81 – Valor de pH',
    routeSection: 'AATCC81',
    startButtonLabel: 'Capturar AATCC 81',
    pendingMessage: 'Pendiente de capturar datos AATCC 81',
    editButtonLabel: 'Editar AATCC 81',
    allowImages: true,
  },
  ASTMD2261: {
    title: 'ASTM D2261 – Resistencia a la rasgadura',
    routeSection: 'ASTMD2261',
    startButtonLabel: 'Capturar ASTM D2261',
    pendingMessage: 'Pendiente de capturar datos ASTM D2261',
    editButtonLabel: 'Editar ASTM D2261',
  },
  AATCC61: {
    title: 'AATCC 61 – Solidez del color al lavado',
    routeSection: 'AATCC61',
    startButtonLabel: 'Capturar Evidencia AATCC 61',
    pendingMessage: 'Pendiente de capturar evidencia fotográfica AATCC 61',
    editButtonLabel: 'Editar Evidencia AATCC 61',
    allowImages: true,
    onlyImages: true,
  },
};
