import React, {useState, useEffect} from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PageTitle from '@/components/PageTitle';
import TestResultInfoCard from '@/components/_test-results/TestResultInfoCard';
import TestStatusChips from '@/components/_test-results/TestStatusChips';
import TestSectionTabs from '@/components/_test-results/TestSectionTabs';
import GenericSectionContent from '@/components/_test-results/contents/GenericSectionContent';
import { SectionKey } from '@/components/_test-results/sectionConfig';
import { Button } from 'react-bootstrap';
import { getImageUrl } from '@/utils/image';

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
    image: getImageUrl(testResult.test_request?.image_id) ?? testResult.test_request?.image ?? '',
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
          <Link href={route('test-results')}>
            <Button variant="soft-secondary">
                <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Regresar
            </Button>
           </Link>
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
          {activeSection && (
            <GenericSectionContent
              sectionName={activeSection as SectionKey}
              testId={testResult.id}
              data={activeSectionData}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TestResultDetailPage;
