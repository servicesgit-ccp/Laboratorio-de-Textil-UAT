import React, { useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

type AstmdField = {
  label: string;
  display_name: string;
  value: string | null;
};

type Astmd5034Section = {
  [key: string]: AstmdField | any;
};

type Props = {
  testId: number;
  astmdSection: Astmd5034Section;
};

const Astmd5034Form: React.FC<Props> = ({ testId, astmdSection }) => {
  // Fallback por si viene null/undefined
  const safeSection: Astmd5034Section = astmdSection || {};

  // Filtramos los campos "reales"
  const fieldEntries = useMemo(
    () =>
      Object.entries(safeSection).filter(([key, value]) => {
        if (['img', 'status', 'user_id', 'user_name'].includes(key)) return false;
        return value && typeof value === 'object' && 'display_name' in value;
      }),
    [safeSection],
  );

  const initialData: Record<string, string> = {};
  fieldEntries.forEach(([key, field]) => {
    const f = field as AstmdField;
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

    put(
      route('test-results.section.update', {
        test: testId,
        section: 'ASTMD5034',
      }),
      { preserveScroll: true },
    );
  };

  // Si por alguna razón no hay campos, mostramos un mensajito y no reventamos
  if (!fieldEntries.length) {
    return (
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <h5 className="mb-0">ASTM D5034 - Resistencia a la tracción</h5>
          <p className="mt-3 text-muted">
            No se encontraron campos para esta sección. Verifica que el backend esté enviando
            los datos de <code>ASTMD5034</code> correctamente.
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">ASTM D5034 - Resistencia a la tracción</h5>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {fieldEntries.map(([key, field]) => {
              const f = field as AstmdField;

              return (
                <Col md={6} key={key}>
                  <Form.Group controlId={`astmd5034-${key}`}>
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
              {processing ? 'Guardando...' : 'Guardar ASTM D5034'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Astmd5034Form;
