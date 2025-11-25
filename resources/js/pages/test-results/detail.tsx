import React, {useState, useEffect} from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { usePage, router } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PageTitle from '@/components/PageTitle';
import TestResultInfoCard from '@/components/_test-results/TestResultInfoCard';
import TestStatusChips from '@/components/_test-results/TestStatusChips';
import TestSectionTabs from '@/components/_test-results/TestSectionTabs';
import InitialSectionContent from '@/components/_test-results/contents/InitialSectionContent';
import AppearanceSectionContent from '@/components/_test-results/contents/AppearanceSectionContent';
import DensidadSectionContent from '@/components/_test-results/contents/DensidadSectionContent';
import Astmd5034SectionContent from '@/components/_test-results/contents/Astmd5034SectionContent';
import AATCC150SectionContent from '@/components/_test-results/contents/AATCC150SectionContent';
import AATCC135SectionContent from '@/components/_test-results/contents/AATCC135SectionContent';
import AstmD3776SectionContent from '@/components/_test-results/contents/AstmD3776SectionContent';
import AstmD3512SectionContent from '@/components/_test-results/contents/AstmD3512SectionContent';
import AATCC179SectionContent from '@/components/_test-results/contents/Aatcc179SectionContent';
import AATCC8SectionContent from '@/components/_test-results/contents/Aatcc8SectionContent';
import AATCC81SectionContent from '@/components/_test-results/contents/Aatcc81SectionContent';
import Astmd2261SectionContent from '@/components/_test-results/contents/Astmd2261SectionContent';
import AATCC61SectionContent from '@/components/_test-results/contents/Aatcc61SectionContent';

const formatDate = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const TestResultDetailPage: React.FC = () => {
  const testResult = usePage().props.testResult as any;

  // Contar secciones con status
  let totalSectionsWithStatus = 0;
  let pendingSections = 0;

  (testResult.results ?? []).forEach((result: any) => {
    const content = result.content ?? {};

    Object.values(content).forEach((section: any) => {
      if (section && typeof section === 'object') {
        if ('status' in section) {
          totalSectionsWithStatus++;

          const statusValue = Number(section.status);
          if (statusValue === 0 || statusValue === 1) {
            pendingSections++;
          }
        }
      }
    });
  });
  const firstResult = testResult.results?.[0];
  const content = firstResult?.content ?? {};

  const sectionEntries = Object.entries(content).map(([key, value]) => ({
    key,
    data: value,
  }));

  const [activeSection, setActiveSection] = useState(
    sectionEntries[0]?.key ?? ''
  );
  const [activeSectionData, setActiveSectionData] = useState<any>(
    sectionEntries[0]?.data ?? null
  );
  useEffect(() => {
    const result = testResult.results?.[0];
    const freshContent = result?.content ?? {};
    const freshSectionData = freshContent[activeSection];

    if (freshSectionData) {
      setActiveSectionData(freshSectionData);
    }
  }, [testResult, activeSection]);

  const adapted = {
    folio: testResult.test_request?.number ?? '',
    estilo: testResult.test_request?.style_id ?? '',
    sku: testResult.test_request?.item ?? '',
    notes: testResult.test_request?.notes ?? '',
    solicitado: testResult.test_request?.user?.name ?? '',
    fechaIngreso: formatDate(testResult.created_at),
    fechaSalida: formatDate(testResult.finished_at),
    pruebasPendientes: totalSectionsWithStatus
      ? `${pendingSections}/${totalSectionsWithStatus}`
      : '--',
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
          sections={sectionEntries}
          activeKey={activeSection}
          onChange={(key, sectionData) => {
            setActiveSection(key);
            setActiveSectionData(sectionData);
          }}
        />
        {/* Secciones de las tabs */}
        <div className="mt-4">
          {activeSection === 'Inicial' && (
            <InitialSectionContent data={activeSectionData} testId={testResult.id} />
          )}

          {activeSection === 'Apariencia' && (
            <AppearanceSectionContent data={activeSectionData} testId={testResult.id} />
          )}

          {activeSection === 'Densidad' && (
            <DensidadSectionContent data={activeSectionData} testId={testResult.id} />
          )}

          {activeSection === 'ASTMD5034' && (
            <Astmd5034SectionContent data={activeSectionData} testId={testResult.id} />
          )}
          {activeSection === 'AATCC150' && (
            <AATCC150SectionContent data={activeSectionData} testId={testResult.id} />
          )}

          {activeSection === 'AATCC135' && (
            <AATCC135SectionContent data={activeSectionData} testId={testResult.id} />
          )}
          
          {activeSection === 'ASTM D3776' && (
            <AstmD3776SectionContent data={activeSectionData} testId={testResult.id} />
          )}
          
          {activeSection === 'ASTM D3512' && (
            <AstmD3512SectionContent data={activeSectionData} testId={testResult.id} />
          )}
          
          {activeSection === 'AATCC179' && (
            <AATCC179SectionContent data={activeSectionData} testId={testResult.id} />
          )}
          
          {activeSection === 'AATCC8' && (
            <AATCC8SectionContent data={activeSectionData} testId={testResult.id} />
          )}
          
          {activeSection === 'AATCC81' && (
            <AATCC81SectionContent data={activeSectionData} testId={testResult.id} />
          )}

          {activeSection === 'ASTMD2261' && (
            <Astmd2261SectionContent data={activeSectionData} testId={testResult.id} />
          )}

          {activeSection === 'AATCC61' && (
            <AATCC61SectionContent data={activeSectionData} testId={testResult.id} />
          )}
          

        </div>
      </div>
    </MainLayout>
  );
};

export default TestResultDetailPage;
