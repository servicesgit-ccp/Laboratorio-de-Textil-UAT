import React from 'react';
import { router } from '@inertiajs/react';

type Props = {
  data?: any;      // content["AATCC61"]
  testId: number;
};

const Aatcc61SectionContent: React.FC<Props> = ({ data = {}, testId }) => {
  const status = Number(data?.status ?? 0);
  const images = Array.isArray(data.img) ? data.img : [];

  const goToForm = () => {
    router.get(
      route('test-results.section.start', { test: testId, section: 'AATCC61' })
    );
  };

  const finishSection = () => {
    router.post(
      route('test-results.section.finish', { test: testId, section: 'AATCC61' }),
      {},
      { preserveScroll: true },
    );
  };

  // PENDIENTE (status 0)
  if (status === 0) {
    return (
      <div className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">AATCC 61 – Evidencia fotográfica</h5>

          <button
            type="button"
            className="btn btn-dark rounded-pill d-flex align-items-center gap-2 px-3"
            onClick={goToForm}
          >
            <span className="fw-semibold">+</span>
            Capturar fotos
          </button>
        </div>

        <div
          className="alert rounded-4 px-3 py-3 d-flex align-items-center"
          style={{
            background: '#fdf7f2',
            borderColor: '#f4e3d7',
            color: '#b3541e',
          }}
        >
          <i className="bi bi-exclamation-circle me-2" />
          Pendiente de capturar evidencia fotográfica para AATCC 61
        </div>
      </div>
    );
  }

  // CAPTURADO / TERMINADO (status 1 o 2)
  return (
    <div className="mt-3">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">AATCC 61 – Evidencia fotográfica</h5>

        <div className="d-flex align-items-center gap-2">
          {status === 1 && (
            <button
              type="button"
              onClick={finishSection}
              className="btn btn-success rounded-pill px-3"
            >
              Terminar test
            </button>
          )}

          {status !== 2 && (
            <button
              type="button"
              onClick={goToForm}
              className="btn btn-outline-dark rounded-pill px-3"
            >
              Administrar fotos
            </button>
          )}
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-muted fst-italic">
          No hay fotos registradas aún.
        </div>
      ) : (
        <div className="row g-3">
          {images.map((img: any, idx: number) => {
            const url = typeof img === 'string' ? img : img.url;
            return (
              <div className="col-6 col-md-3" key={idx}>
                <div className="border rounded-4 overflow-hidden">
                  <img
                    src={url}
                    alt={`AATCC61-${idx}`}
                    className="img-fluid"
                    style={{ objectFit: 'cover', aspectRatio: '1 / 1' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Aatcc61SectionContent;
