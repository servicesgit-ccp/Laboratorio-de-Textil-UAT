import React, { useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import CameraCapture from '@/components/_test-results/CameraCapture';

type AstmD3776Field = {
  label: string;
  display_name: string;
  value: string | null;
};

type AstmD3776Section = {
  [key: string]: AstmD3776Field | any;
};

type Props = {
  testId: number;
  astmSection: AstmD3776Section;
};

const AstmD3776Form: React.FC<Props> = ({ testId, astmSection }) => {
  const safeSection = astmSection || {};

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
    const f = field as AstmD3776Field;
    initialData[key] = f.value ?? '';
  });

  const { data, setData, put, processing, errors } = useForm<{
    fields: Record<string, string>;
    images: File[];
  }>({
    fields: initialData,
    images: [],
  });
        
  const handleFilesChange = (files: File[]) => {
    setData('images', files);
  };

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
        section: 'ASTM D3776',
      }),
      { preserveScroll: true },
    );
  };

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-4">
        <h5 className="mb-3">ASTM D3776 – Peso por unidad de área</h5>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {fieldEntries.map(([key, field]) => {
              const f = field as AstmD3776Field;

              return (
                <Col md={6} key={key}>
                  <Form.Group controlId={`astmd3776-${key}`}>
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
          {/* Módulo de cámara / fotos */}
          <hr className="my-4" />
          <h6 className="mb-2">Evidencia fotográfica</h6>
          <p className="text-muted small">
            Captura o adjunta fotografías.
          </p>

          <CameraCapture
            inputId="aatcc81-camera"
            multiple={true}
            helperText="Toca el botón para abrir la cámara o seleccionar fotos desde tu dispositivo."
            error={errors.images as string | null}
            initialImages={safeSection.img ?? []}
            onFilesChange={handleFilesChange}
          />
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
              {processing ? 'Guardando...' : 'Guardar ASTM D3776'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AstmD3776Form;
