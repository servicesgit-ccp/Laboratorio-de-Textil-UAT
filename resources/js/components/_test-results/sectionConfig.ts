export type SectionKey =
  | 'INICIAL'
  | 'APARIENCIA'
  | 'DENSIDAD'
  | 'TRACCION'
  | 'ESTABILIDAD EN PRENDA'
  | 'ESTABILIDAD EN TELA'
  | 'PESO'
  | 'PILLING'
  | 'TORSION'
  | 'FROTE'
  | 'VALOR PH'
  | 'RASGADO'
  | 'LAVADO';

  

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
  INICIAL: {
    title: 'Datos Iniciales de la Muestra',
    routeSection: 'INICIAL',
    startButtonLabel: 'Capturar Datos Iniciales',
    pendingMessage: 'Pendiente de capturar datos iniciales',
    editButtonLabel: 'Editar Datos Iniciales',
    allowImages: true,
  },
  APARIENCIA: {
    title: 'Apariencia de la Prenda',
    routeSection: 'APARIENCIA',
    startButtonLabel: 'Capturar APARIENCIA',
    pendingMessage: 'Pendiente de capturar datos de APARIENCIA',
    editButtonLabel: 'Editar APARIENCIA',
    allowImages: true,
  },
  DENSIDAD: {
    title: 'Datos de Densidad',
    routeSection: 'DENSIDAD',
    startButtonLabel: 'Capturar Densidad',
    pendingMessage: 'Pendiente de capturar datos de densidad',
    editButtonLabel: 'Editar Densidad',
  },
  TRACCION: {
    title: 'ASTM D5034 – Resistencia a la tracción',
    routeSection: 'TRACCION',
    startButtonLabel: 'Capturar TRACCION',
    pendingMessage: 'Pendiente de capturar datos TRACCION',
    editButtonLabel: 'Editar TRACCION',
  },
  'ESTABILIDAD EN PRENDA': {
    title: 'AATCC 150 – Dimensionalidad',
    routeSection: 'ESTABILIDAD EN PRENDA',
    startButtonLabel: 'Capturar ESTABILIDAD EN PRENDA',
    pendingMessage: 'Pendiente de capturar datos ESTABILIDAD EN PRENDA',
    editButtonLabel: 'Editar ESTABILIDAD EN PRENDA',
  },
  'ESTABILIDAD EN TELA': {
    title: 'AATCC 135 – Dimensionalidad (Lavado)',
    routeSection: 'ESTABILIDAD EN TELA',
    startButtonLabel: 'Capturar ESTABILIDAD EN TELA',
    pendingMessage: 'Pendiente de capturar datos ESTABILIDAD EN TELA',
    editButtonLabel: 'Editar ESTABILIDAD EN TELA',
  },
  PESO: {
    title: 'ASTM D3776 – Peso del tejido',
    routeSection: 'PESO',
    startButtonLabel: 'Capturar PESO',
    pendingMessage: 'Pendiente de capturar datos PESO', 
    editButtonLabel: 'Editar PESO',
  },
  PILLING: {
    title: 'ASTM D3512 – Pilling',
    routeSection: 'PILLING',
    startButtonLabel: 'Capturar PILLING',
    pendingMessage: 'Pendiente de capturar datos PILLING',
    editButtonLabel: 'Editar PILLING',
  },
  TORSION: {
    title: 'AATCC 179 – Torsión',
    routeSection: 'TORSION',
    startButtonLabel: 'Capturar TORSION',
    pendingMessage: 'Pendiente de capturar datos TORSION',
    editButtonLabel: 'Editar TORSION',
  },
  FROTE: {
    title: 'AATCC 8 – Solidez del color al frote',
    routeSection: 'FROTE',
    startButtonLabel: 'Capturar FROTE',
    pendingMessage: 'Pendiente de capturar datos FROTE',
    editButtonLabel: 'Editar FROTE',
    allowImages: true,
  },
  'VALOR PH': {
    title: 'AATCC 81 – Valor de pH',
    routeSection: 'VALOR PH',
    startButtonLabel: 'Capturar VALOR PH',
    pendingMessage: 'Pendiente de capturar datos VALOR PH',
    editButtonLabel: 'Editar VALOR PH',
    allowImages: true,
  },
  RASGADO: {
    title: 'ASTM D2261 – Resistencia a la rasgadura',
    routeSection: 'RASGADO',
    startButtonLabel: 'Capturar RASGADO',
    pendingMessage: 'Pendiente de capturar datos RASGADO',
    editButtonLabel: 'Editar RASGADO',
  },
  LAVADO: {
    title: 'AATCC 61 – Solidez del color al lavado',
    routeSection: 'LAVADO',
    startButtonLabel: 'Capturar LAVADO',
    pendingMessage: 'Pendiente de capturar datos LAVADO',
    editButtonLabel: 'Editar LAVADO',
    allowImages: true,
    onlyImages: true,
  },
};
