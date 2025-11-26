import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

type Props = {
  data: {
    folio: string;
    estilo: string;
    sku: string;
    notes: string;
    solicitado: string;
    fechaIngreso: string;
    fechaSalida: string;
    pruebasPendientes: string | number;
  };
};

const TestResultInfoCard: React.FC<Props> = ({ data }) => {
  return (
    <Card className="border-0 bg-body-tertiary rounded-4">
      <Card.Body className="p-4">
        <Row className="gy-3">
          <Col md={3}>
            <div className="text-muted small mb-1">Folio:</div>
            <div className="fw-semibold">{data.folio}</div>
          </Col>

          <Col md={3}>
            <div className="text-muted small mb-1">SKU/ESTILO:</div>
            <div className="fw-semibold">{data.sku}</div>
          </Col>

          <Col md={3}>
            <div className="text-muted small mb-1">Descripción:</div>
            <div className="fw-semibold">{data.notes}</div>
          </Col>

          <Col md={3}>
            <div className="text-muted small mb-1">Solicitado por:</div>
            <div className="fw-semibold">{data.solicitado}</div>
          </Col>

          <Col md={3}>
            <div className="text-muted small mb-1">Fecha Ingreso:</div>
            <div className="fw-semibold">{data.fechaIngreso}</div>
          </Col>

          <Col md={3}>
            <div className="text-muted small mb-1">Pruebas Pendientes:</div>
            <div className="fw-semibold">{data.pruebasPendientes}</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TestResultInfoCard;
