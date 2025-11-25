// resources/js/Pages/test-results/section-form.tsx

import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { Card, Row, Col } from 'react-bootstrap';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

// Formularios específicos por sección
import InitialForm from '@/components/_test-results/forms/InitialForm';
import AppearanceForm from '@/components/_test-results/forms/AppearanceForm';
import DensidadForm from '@/components/_test-results/forms/DensidadForm';
import Astmd5034Form from '@/components/_test-results/forms/Astmd5034Form';
import AATCC150Form from '@/components/_test-results/forms/AATCC150Form';
import AATCC135Form from '@/components/_test-results/forms/AATCC135Form';
import AstmD3776Form from '@/components/_test-results/forms/AstmD3776Form';
import AstmD3512Form from '@/components/_test-results/forms/AstmD3512Form';
import AATCC179Form from '@/components/_test-results/forms/Aatcc179Form';
import AATCC8Form from '@/components/_test-results/forms/Aatcc8Form';
import AATCC81Form from '@/components/_test-results/forms/Aatcc81Form';
import Astmd2261Form from '@/components/_test-results/forms/Astmd2261Form';
import AATCC61Form from '@/components/_test-results/forms/Aatcc61Form';

type SectionField = {
  label: string;
  display_name: string;
  value: string | null;
};

type SectionData = {
  [key: string]: SectionField | any;
};

const SectionFormPage: React.FC = () => {
  const { test, sectionKey, sectionData } = usePage().props as {
    test: {
      id: number;
      number?: string;
      item?: string;
      notes?: string;
      requested_by?: string;
    };
    sectionKey: string;
    sectionData: SectionData;
  };

  const titleBySection: Record<string, string> = {
    Inicial: 'Captura de Datos Iniciales',
    Apariencia: 'Captura de Apariencia',
    // agrega más si quieres textos específicos
  };

  const subtitleBySection: Record<string, string> = {
    Inicial: `Muestra ${test.number ?? ''} · Datos iniciales`,
    Apariencia: `Muestra ${test.number ?? ''} · Apariencia`,
  };

  const descriptionBySection: Record<string, string> = {
    Inicial: 'Registra la información inicial necesaria para el análisis de la muestra.',
    Apariencia: 'Registra las observaciones de apariencia de la muestra.',
  };

  const pageTitle = titleBySection[sectionKey] ?? `Captura de ${sectionKey}`;
  const pageSubtitle = subtitleBySection[sectionKey] ?? `Muestra ${test.number ?? ''}`;
  const pageDescription = descriptionBySection[sectionKey]
    ?? 'Completa la información requerida para esta prueba.';

  const renderForm = () => {
    switch (sectionKey) {
      case 'Inicial':
        return <InitialForm testId={test.id} initialSection={sectionData} />;

      case 'Apariencia':
        return <AppearanceForm testId={test.id} appearanceSection={sectionData} />;
      
      case 'Densidad':
        return <DensidadForm testId={test.id} densidadSection={sectionData} />
        
      case 'ASTMD5034':
        return <Astmd5034Form testId={test.id} astmdSection={sectionData} />

      case 'AATCC150':
        return <AATCC150Form testId={test.id} aatccSection={sectionData} />
        
      case 'AATCC135':
        return <AATCC135Form testId={test.id} aatccSection={sectionData} />

      case 'ASTM D3776':
        return <AstmD3776Form testId={test.id} astmSection={sectionData} />

      case 'ASTM D3512':
        return <AstmD3512Form testId={test.id} astmSection={sectionData} />
        
      case 'AATCC179':
        return <AATCC179Form testId={test.id} aatcc179Section={sectionData} />
        
      case 'AATCC8':
        return <AATCC8Form testId={test.id} aatcc8Section={sectionData} />
        
      case 'AATCC81':
        return <AATCC81Form testId={test.id} aatcc81Section={sectionData} />
        
      case 'ASTMD2261':
        return <Astmd2261Form testId={test.id} astmd2261Section={sectionData} />

      case 'AATCC61':
        return <AATCC61Form testId={test.id} />

      default:
        return (
          <div className="alert alert-warning rounded-4">
            No hay formulario específico implementado para la sección: <strong>{sectionKey}</strong>
          </div>
        );
    }
  };

  return (
    <MainLayout>
      <PageTitle
        title={pageTitle}
        subTitle={pageSubtitle}
      />

      <div className="mb-3 border-bottom pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted">
            {pageDescription}
          </p>
          <button
            type="button"
            className="btn btn-link p-0 d-inline-flex align-items-center text-decoration-none"
            onClick={() => router.get(route('test-results.detail', { test: test.id }))}
          >
            <IconifyIcon icon="tabler:arrow-left" className="me-1" />
            <span>Volver al análisis</span>
          </button>
        </div>
      </div>

      {/* Card con info del test */}
      <Card className="border-0 bg-body-tertiary rounded-4 mb-3">
        <Card.Body>
          <Row className="gy-2">
            <Col md={3}>
              <div className="text-muted small">Folio</div>
              <div className="fw-semibold">{test.number ?? '--'}</div>
            </Col>
            <Col md={3}>
              <div className="text-muted small">SKU / Ítem</div>
              <div className="fw-semibold">{test.item ?? '--'}</div>
            </Col>
            <Col md={3}>
              <div className="text-muted small">Solicitado por</div>
              <div className="fw-semibold">{test.requested_by ?? '--'}</div>
            </Col>
            <Col md={3}>
              <div className="text-muted small">Notas</div>
              <div className="fw-semibold text-truncate">{test.notes ?? '--'}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Formulario de la sección */}
      {renderForm()}
    </MainLayout>
  );
};

export default SectionFormPage;
