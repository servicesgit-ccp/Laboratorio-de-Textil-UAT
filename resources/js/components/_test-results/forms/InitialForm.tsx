import React, { useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import CameraCapture from '@/components/_test-results/CameraCapture';

type InitialField = {
  label: string;
  display_name: string;
  value: string | null;
};

type InitialSection = {
  [key: string]: InitialField | any;
};

type Props = {
  testId: number;
  initialSection: InitialSection;
};

const InitialForm: React.FC<Props> = ({ testId, initialSection }) => {
  // Siempre trabajar con un objeto seguro
  const safeSection = initialSection || {};

  // Filtramos solo los campos "reales", ignorando img/status/user_id/user_name
  const fieldEntries = useMemo(
    () =>
      Object.entries(safeSection).filter(([key, value]) => {
        if (['img', 'status', 'user_id', 'user_name'].includes(key)) return false;
        return value && typeof value === 'object' && 'display_name' in value;
      }),
    [safeSection],
  );

  // Estado inicial para useForm
  const initialData: Record<string, string> = {};
  fieldEntries.forEach(([key, field]) => {
    const f = field as InitialField;
    initialData[key] = f.value ?? '';
  });

  const { data, setData, put, processing, errors } = useForm<{
    fields: Record<string, string>;
    images: File[];
  }>({
    fields: initialData,
    images: [],
  });

  const handleChange = (key: string, value: string) => {
    setData('fields', {
      ...data.fields,
      [key]: value,
    });
  };

  const handleFilesChange = (files: File[]) => {
    setData('images', files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(
      route('test-results.section.update', {
        test: testId,
        section: 'Inicial',
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
          <h5 className="mb-0">Datos Iniciales</h5>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {fieldEntries.map(([key, field]) => {
              const f = field as InitialField;
              return (
                <Col md={6} key={key}>
                  <Form.Group controlId={`initial-${key}`}>
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
            Captura o adjunta fotografías de la condición inicial de la prenda.
          </p>

          <CameraCapture
            inputId="initial-camera"
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
              {processing ? 'Guardando...' : 'Guardar Datos Iniciales'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default InitialForm;
