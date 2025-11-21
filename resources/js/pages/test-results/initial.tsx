import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { Card, Row, Col } from 'react-bootstrap';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import InitialForm from '@/components/_test-results/forms/InitialForm';

type InitialField = {
  label: string;
  display_name: string;
  value: string | null;
};

type InitialSection = {
  [key: string]: InitialField | any;
};

const InitialFormPage: React.FC = () => {
  const { test, initialSection } = usePage().props as {
    test: {
      id: number;
      number?: string;
      item?: string;
      notes?: string;
      requested_by?: string;
    };
    initialSection: InitialSection;
  };

  console.log(test);
  return (
    <MainLayout>
      <PageTitle
        title="Captura de Datos Iniciales"
        subTitle={`Muestra ${test.number ?? ''}`}
      />

      <div className="mb-3 border-bottom pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted">
            Registra la información inicial necesaria para el análisis de la muestra.
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

      {/* Formulario de datos iniciales */}
      <InitialForm testId={test.id} initialSection={initialSection} />
    </MainLayout>
  );
};

export default InitialFormPage;
