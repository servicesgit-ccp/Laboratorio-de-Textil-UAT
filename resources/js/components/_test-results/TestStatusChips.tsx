import React from 'react';
import { Card } from 'react-bootstrap';

type Props = {
  results: any[];
};

const TestStatusChips: React.FC<Props> = ({ results }) => {
  const firstResult = results?.[0];
  const content = firstResult?.content ?? {};

  const sections = Object.keys(content);

  const chips = sections.map((sectionKey) => {
    const section = content[sectionKey];
    const statusValue = Number(section?.status ?? 0);

    let badgeClass = '';
    let statusLabel = '';

    switch (statusValue) {
      case 2:
        badgeClass = 'bg-success-subtle text-success-emphasis border border-success-subtle';
        statusLabel = 'Completado';
        break;

      case 1:
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
