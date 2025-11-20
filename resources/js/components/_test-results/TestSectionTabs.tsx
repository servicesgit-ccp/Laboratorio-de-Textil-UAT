import React from 'react';

type Props = {
  sections: string[];
  activeKey: string;
  onChange: (key: string) => void;
};

const TestSectionTabs: React.FC<Props> = ({ sections, activeKey, onChange }) => {
  if (!sections.length) return null;

  return (
    <div className="bg-body-tertiary rounded-pill px-2 py-1 d-flex flex-wrap gap-1 mt-3 justify-content-center">
      {sections.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={[
            'btn btn-sm rounded-pill px-3 py-1 border-0',
            activeKey === key
              ? 'bg-white fw-semibold shadow-sm'
              : 'bg-transparent text-body',
          ].join(' ')}
          style={{ fontSize: '0.85rem' }}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default TestSectionTabs;
