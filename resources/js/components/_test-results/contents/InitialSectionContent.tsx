import React from 'react';
import { router } from '@inertiajs/react';

type InitialField = {
  label: string;
  display_name: string;
  value: string | null;
};

type InitialSection = {
  [key: string]: InitialField | any;
};

type Props = {
  data: InitialSection;
  testId: number;          // 👈 nuevo prop
  onCapture?: () => void;  // opcional, si lo sigues usando para editar
};

const InitialSectionContent = ({ data = {}, testId, onCapture }) => {
  const status = Number(data?.status ?? 0);

  // Si NO ha sido capturado (status 0)
  if (status === 0) {
    return (
      <div className="mt-3">

        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Datos Iniciales de la Muestra</h5>

          <button
            type="button"
            className="btn btn-dark rounded-pill d-flex align-items-center gap-2 px-3"
            onClick={() => router.get(route('test-results.initial', { testId }))}
          >
            <span className="fw-semibold">+</span>
            Capturar Datos Iniciales
          </button>
        </div>

        {/* Mensaje de pendiente */}
        <div
          className="alert rounded-4 px-3 py-3 d-flex align-items-center"
          style={{
            background: '#fdf7f2',
            borderColor: '#f4e3d7',
            color: '#b3541e',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <i className="bi bi-exclamation-circle me-2"></i>
          Pendiente de capturar datos iniciales
        </div>
      </div>
    );
  }

  // Si YA hay datos capturados (status 1 o 2)
  return (
    <div className="mt-3">

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Datos Iniciales de la Muestra</h5>

        {status !== 2 && (
          <button
            type="button"
            onClick={onCapture}
            className="btn btn-outline-dark rounded-pill px-3"
          >
            Editar Datos Iniciales
          </button>
        )}
      </div>

      {/* Render de los datos capturados */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">

          <div className="row g-3">
            {Object.entries(data)
              .filter(([key]) => key !== 'img' && key !== 'status' && key !== 'user_id' && key !== 'user_name')
              .map(([key, field]) => (
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

export default InitialSectionContent;
