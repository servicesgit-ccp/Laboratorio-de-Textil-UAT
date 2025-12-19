// resources/js/Pages/test-results/section-form.tsx
import React from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import GenericSectionForm from '@/components/_test-results/forms/GenericSectionForm';
import { SectionKey } from '@/components/_test-results/sectionConfig';
import { Button } from 'react-bootstrap';

type PageProps = {
  test: {
    id: number;
    number?: string;
    item?: string;
    notes?: string;
    requested_by?: string;
  };
  sectionName: SectionKey;
  sectionData: any;
};

const SectionFormPage: React.FC = () => {
  const { test, sectionName, sectionData } = usePage<PageProps>().props;

  return (
    <MainLayout>
      <PageTitle
        title={`Captura de ${sectionName}`}
        subTitle={`Muestra ${test.number ?? ''}`}
      />

      <div className="mb-3 border-bottom pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted">
            Registra la información de la sección {sectionName}.
          </p>
          <Link href={route('test-results')}>
            <Button variant="soft-secondary">
                <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Regresar
            </Button>
           </Link>
        </div>
      </div>
      <GenericSectionForm
        testId={test.id}
        sectionName={sectionName}
        sectionData={sectionData}
      />
    </MainLayout>
  );
};

export default SectionFormPage;
