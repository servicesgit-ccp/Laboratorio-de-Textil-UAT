import React, {useState} from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { usePage, router } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PageTitle from '@/components/PageTitle';
import TestResultInfoCard from '@/components/_test-results/TestResultInfoCard';
import TestStatusChips from '@/components/_test-results/TestStatusChips';
import TestSectionTabs from '@/components/_test-results/TestSectionTabs';

const formatDate = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const TestResultDetailPage: React.FC = () => {
  const { testResult } = usePage().props as {
    testResult: any;
  };
  const firstResult = testResult.results?.[0];
  const content = firstResult?.content ?? {};
  const sectionKeys: string[] = Object.keys(content); // ['Inicial', 'AATCC150', 'ASTMD5034', ...]

  const [activeSection, setActiveSection] = useState<string>(
    sectionKeys[0] ?? ''
  );


  // === ADAPTAMOS el objeto del backend ===
  const adapted = {
    folio: testResult.test_request?.number ?? '',
    estilo: testResult.test_request?.style_id ?? '',
    sku: '', 
    descripcion: '',
    solicitado: '',
    fechaIngreso: formatDate(testResult.created_at),
    fechaSalida: formatDate(testResult.finished_at),
    pruebasPendientes: '',
  };

  return (
    <MainLayout>
      <PageTitle
        title={`Análisis de Muestra - ${adapted.folio}`}
        subTitle="Análisis"
      />

      {/* Header */}
      <div className="mb-3 border-bottom pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted">
            Registra los resultados de las pruebas de laboratorio
          </p>
          <button
            type="button"
            className="btn btn-link p-0 d-inline-flex align-items-center text-decoration-none"
            onClick={() => router.get('/test-results')}
          >
            <IconifyIcon icon="tabler:arrow-left" className="me-1" />
            <span>Volver al Listado</span>
          </button>
        </div>
      </div>

      {/* Datos generales */}
      <div className="mt-3">
        <TestResultInfoCard data={adapted} />
        <TestStatusChips results={testResult.results ?? []} />
        <TestSectionTabs
          sections={sectionKeys}
          activeKey={activeSection}
          onChange={setActiveSection}
        />
      </div>
    </MainLayout>
  );
};

export default TestResultDetailPage;
