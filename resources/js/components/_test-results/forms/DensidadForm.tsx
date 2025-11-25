import React, { useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

type DensidadField = {
  label: string;
  display_name: string;
  value: string | null;
};

type DensidadSection = {
  [key: string]: DensidadField | any;
};

type Props = {
  testId: number;
  densidadSection: DensidadSection;
};

const DensidadForm: React.FC<Props> = ({ testId, densidadSection }) => {
  // Tomamos solo los campos reales de la sección
  const fieldEntries = useMemo(
    () =>
      Object.entries(densidadSection).filter(([key, value]) => {
        if (['img', 'status', 'user_id', 'user_name'].includes(key)) return false;
        return value && typeof value === 'object' && 'display_name' in value;
      }),
    [densidadSection],
  );

  // Estado inicial para useForm
  const initialData: Record<string, string> = {};
  fieldEntries.forEach(([key, field]) => {
    const f = field as DensidadField;
    initialData[key] = f.value ?? '';
  });

  const { data, setData, put, processing, errors } = useForm<{
    fields: Record<string, string>;
  }>({
    fields: initialData,
  });

  const handleChange = (key: string, value: string) => {
    setData('fields', {
      ...data.fields,
      [key]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ruta genérica para actualizar sección "Densidad"
    put(
      route('test-results.section.update', {
        test: testId,
        section: 'Densidad',
      }),
      {
        preserveScroll: true,
      },
    );
  };

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Datos de Densidad</h5>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {fieldEntries.map(([key, field]) => {
              const f = field as DensidadField;

              return (
                <Col md={6} key={key}>
                  <Form.Group controlId={`densidad-${key}`}>
                    <Form.Label className="small">
                      {f.display_name}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={data.fields[key] ?? ''}
                      onChange={(e) => handleChange(key, e.target.value)}
                      isInvalid={!!errors[`fields.${key}`]}
                    />
                    {errors[`fields.${key}`] && (
                      <Form.Control.Feedback type="invalid">
                        {errors[`fields.${key}`]}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
              );
            })}
          </Row>

          <div className="d-flex justify-content-end mt-4 gap-2">
            <Button
              type="button"
              variant="outline-secondary"
              className="rounded-pill"
              onClick={() => history.back()}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="dark"
              className="rounded-pill px-4"
              disabled={processing}
            >
              {processing ? 'Guardando...' : 'Guardar Densidad'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DensidadForm;
