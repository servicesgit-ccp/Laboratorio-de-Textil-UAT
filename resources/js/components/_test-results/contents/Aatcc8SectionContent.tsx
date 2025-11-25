import React from 'react';
import { router } from '@inertiajs/react';

type Props = {
  data?: any;
  testId: number;
};

const Aatcc8SectionContent: React.FC<Props> = ({ data = {}, testId }) => {
  const status = Number(data?.status ?? 0);

  const goToForm = () => {
    router.get(
      route('test-results.section.start', { test: testId, section: 'AATCC8' })
    );
  };

  const finishAatcc8 = () => {
    router.post(
      route('test-results.section.finish', { test: testId, section: 'AATCC8' }),
      {},
      { preserveScroll: true },
    );
  };

  // ⏳ STATUS 0 → PENDIENTE
  if (status === 0) {
    return (
      <div className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">AATCC 8 – Solidez del color al frote</h5>

          <button
            type="button"
            className="btn btn-dark rounded-pill d-flex align-items-center gap-2 px-3"
            onClick={goToForm}
          >
            <span className="fw-semibold">+</span>
            Capturar AATCC 8
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
          Pendiente de capturar datos de AATCC 8
        </div>
      </div>
    );
  }

  // ✅ STATUS 1 o 2 → CON DATOS
  return (
    <div className="mt-3">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">AATCC 8 – Solidez del color al frote</h5>

        <div className="d-flex align-items-center gap-2">
          {status === 1 && (
            <button
              type="button"
              onClick={finishAatcc8}
              className="btn btn-success rounded-pill px-3 me-2"
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
              Editar AATCC 8
            </button>
          )}
        </div>
        
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <div className="row g-3">
            {Object.entries(data)
              .filter(([key]) =>
                !['img', 'status', 'user_id', 'user_name'].includes(key)
              )
              .map(([key, field]: any) => (
                <div className="col-md-6" key={key}>
                  <div className="text-muted small">{field.display_name}</div>
                  <div className="fw-semibold">
                    {field.value ?? '--'}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Aatcc8SectionContent;
