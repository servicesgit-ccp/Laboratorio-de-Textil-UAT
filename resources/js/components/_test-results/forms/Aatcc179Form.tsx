import React, { useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

type Aatcc179Field = {
  label: string;
  display_name: string;
  value: string | null;
};

type Aatcc179Section = {
  [key: string]: Aatcc179Field | any;
};

type Props = {
  testId: number;
  aatcc179Section: Aatcc179Section;
};

const Aatcc179Form: React.FC<Props> = ({ testId, aatcc179Section }) => {
  const safeSection = aatcc179Section || {};

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
    initialData[key] = (field as Aatcc179Field).value ?? '';
  });

  const { data, setData, put, processing, errors } = useForm<{
    fields: Record<string, string>;
  }>({
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
        section: 'AATCC179'
      }),
      { preserveScroll: true }
    );
  };

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-4">
        <h5 className="mb-3">AATCC 179 – Torsión y Dimensionalidad</h5>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">

            {fieldEntries.map(([key, field]) => {
              const f = field as Aatcc179Field;

              return (
                <Col md={6} key={key}>
                  <Form.Group controlId={`aatcc179-${key}`}>
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
              {processing ? 'Guardando...' : 'Guardar AATCC 179'}
            </Button>
          </div>
        </Form>

      </Card.Body>
    </Card>
  );
};

export default Aatcc179Form;
