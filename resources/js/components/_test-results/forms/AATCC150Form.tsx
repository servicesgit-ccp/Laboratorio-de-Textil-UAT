import React, { useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

type AATCC150Field = {
  label: string;
  display_name: string;
  value: string | null;
};

type AATCC150Section = {
  [key: string]: AATCC150Field | any;
};

type Props = {
  testId: number;
  aatccSection: AATCC150Section;
};

const AATCC150Form: React.FC<Props> = ({ testId, aatccSection }) => {
  const safeSection = aatccSection || {};

  const fieldEntries = useMemo(
    () =>
      Object.entries(safeSection).filter(([key, value]) => {
        if (['img', 'status', 'user_id', 'user_name'].includes(key)) return false;

        return value && typeof value === 'object' && 'display_name' in value;
      }),
    [safeSection]
  );

  const initialData: Record<string, string> = {};
  fieldEntries.forEach(([key, field]) => {
    const f = field as AATCC150Field;
    initialData[key] = f.value ?? '';
  });

  const { data, setData, put, processing, errors } = useForm({
    fields: initialData
  });

  const handleChange = (key: string, value: string) => {
    setData('fields', {
      ...data.fields,
      [key]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(
      route('test-results.section.update', {
        test: testId,
        section: 'AATCC150'
      }),
      { preserveScroll: true }
    );
  };

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-4">
        <h5 className="mb-3">AATCC 150 – Lavado Doméstico</h5>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {fieldEntries.map(([key, field]) => {
              const f = field as AATCC150Field;

              return (
                <Col md={6} key={key}>
                  <Form.Group controlId={`aatcc150-${key}`}>
                    <Form.Label className="small">{f.display_name}</Form.Label>

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
              {processing ? 'Guardando...' : 'Guardar AATCC 150'}
            </Button>

          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AATCC150Form;
