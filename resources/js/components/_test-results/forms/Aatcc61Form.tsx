import React from 'react';
import { useForm } from '@inertiajs/react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import CameraCapture from '@/components/_test-results/CameraCapture';

type Props = {
  testId: number;
  existingImages?: Array<string | { url: string }>;
};

const Aatcc61Form: React.FC<Props> = ({ testId, existingImages = [] }) => {
  const normalizedExisting = existingImages.map((img) =>
    typeof img === 'string' ? img : img.url
  );

  const { data, setData, post, processing, errors } = useForm<{
    photos: File[];
  }>({
    photos: [],
  });

  const handleFilesChange = (files: File[]) => {
    setData('photos', files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(
      route('test-results.section.update', {
        test: testId,
        section: 'AATCC61',
      }),
      {
        preserveScroll: true,
        forceFormData: true,
      }
    );
  };

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">AATCC 61 – Captura de fotos</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <Row className="gy-4">
            <Col xs={12}>
              <CameraCapture
                inputId="aatcc61-camera-input"
                multiple={true}
                helperText="Toca el botón para abrir la cámara o seleccionar fotos."
                error={errors.photos as string | null}
                initialImages={normalizedExisting}
                onFilesChange={handleFilesChange}
              />
            </Col>
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
              {processing ? 'Guardando...' : 'Guardar fotos'}
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default Aatcc61Form;
