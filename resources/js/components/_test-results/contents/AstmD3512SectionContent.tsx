import React from 'react';
import { router } from '@inertiajs/react';

const AstmD3512SectionContent = ({ data = {}, testId }) => {
  const status = Number(data?.status ?? 0);

  const goToForm = () => {
    router.get(
      route('test-results.section.start', { test: testId, section: 'ASTM D3512' })
    );
  };

  const finishAstmD3512 = () => {
    router.post(
      route('test-results.section.finish', { test: testId, section: 'ASTM D3512' }),
      {},
      { preserveScroll: true },
    );
  };

  // 🔸 PENDIENTE (status 0)
  if (status === 0) {
    return (
      <div className="mt-3">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">ASTM D3512 – Pilling de la tela</h5>

          <button
            type="button"
            className="btn btn-dark rounded-pill d-flex align-items-center gap-2 px-3"
            onClick={goToForm}
          >
            <span className="fw-semibold">+</span>
            Capturar ASTM D3512
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
          Pendiente de capturar datos de ASTM D3512
        </div>

      </div>
    );
  }

  // ✅ EN PROCESO / TERMINADO (status 1 ó 2)
  return (
    <div className="mt-3">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">ASTM D3512 – Pilling de la tela</h5>

        {/* Botón Terminar test (solo cuando está en proceso) */}
        {status === 1 && (
          <button
            type="button"
            onClick={finishAstmD3512}
            className="btn btn-success rounded-pill px-3"
          >
            Terminar test
          </button>
        )}

        {/* Botón Editar mientras no esté terminado */}
        {status !== 2 && (
          <button
            type="button"
            onClick={goToForm}
            className="btn btn-outline-dark rounded-pill px-3 ms-2"
          >
            Editar ASTM D3512
          </button>
        )}
      </div>

      {/* Datos capturados */}
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

export default AstmD3512SectionContent;
