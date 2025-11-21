import React from 'react';

type TestSection = {
  key: string;
  data: any;
};

type Props = {
  sections: TestSection[];
  activeKey: string;
  onChange: (key: string, data: any) => void;
};

const TestSectionTabs: React.FC<Props> = ({ sections, activeKey, onChange }) => {
  if (!sections.length) return null;
  console.log(activeKey);

  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
      {sections.map(({ key, data }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key, data)}
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
