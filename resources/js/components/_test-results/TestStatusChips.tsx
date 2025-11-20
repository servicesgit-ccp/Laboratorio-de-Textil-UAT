import React from 'react';
import { Card } from 'react-bootstrap';

type Props = {
  results: any[]; // arreglo que viene de testResult.results
};

const TestStatusChips: React.FC<Props> = ({ results }) => {
  const firstResult = results?.[0];
  const content = firstResult?.content ?? {};

  // Cada key del content es una prueba: "Inicial", "AATCC150", "ASTMD5034", etc.
  const sections = Object.keys(content);

  const chips = sections.map((sectionKey) => {
    const section = content[sectionKey];

    // section es un objeto con claves "1", "2", ..., "img"
    const fields = Object.values(section).filter(
      (field: any) => field && typeof field === 'object' && 'value' in field
    );

    const total = fields.length;
    const filled = fields.filter((f: any) => f.value !== null && f.value !== '').length;

    let status: 'completado' | 'en_proceso' | 'pendiente' = 'pendiente';

    if (total > 0 && filled === total) {
      status = 'completado';
    } else if (filled > 0 && filled < total) {
      status = 'en_proceso';
    } else {
      status = 'pendiente';
    }

    let badgeClass = '';
    let statusLabel = '';

    switch (status) {
      case 'completado':
        badgeClass = 'bg-success-subtle text-success-emphasis border border-success-subtle';
        statusLabel = 'Completado';
        break;
      case 'en_proceso':
        badgeClass = 'bg-primary-subtle text-primary-emphasis border border-primary-subtle';
        statusLabel = 'En Proceso';
        break;
      default:
        badgeClass = 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';
        statusLabel = 'Pendiente';
        break;
    }

    return {
      key: sectionKey,
      label: `${sectionKey} - ${statusLabel}`,
      badgeClass,
    };
  });

  if (!sections.length) return null;

  return (
    <Card className="border-0 bg-body-tertiary rounded-4 mt-3">
      <Card.Body className="p-3">
        <div className="mb-2 fw-semibold">Estado de Pruebas</div>
        <div className="d-flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip.key}
              className={`badge rounded-pill px-3 py-2 ${chip.badgeClass}`}
              style={{ fontWeight: 350, fontSize: '0.70rem' }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TestStatusChips;
