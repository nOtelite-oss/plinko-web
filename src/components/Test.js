import { useEffect, useState } from 'react';

export const Test = () => {
  const [value, setValue] = useState({
    value: 'Hello',
    endAt: 50000,
  });

  useEffect(() => {
    if (value.value.length > value.endAt) return;
    setValue((prev) => ({ ...prev, value: prev.value + '! ' }));
  }, [value.value.length, value.endAt]);

  console.log('render');
  return (
    <div>
      <p style={{ maxWidth: '100%', whiteSpace: 'pre-wrap' }}>{value.value}</p>
    </div>
  );
};
