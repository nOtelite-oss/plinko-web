import { useEffect, useState } from 'react';

export const Test = () => {
  const [value, setValue] = useState('Hello');

  useEffect(() => {
    const a = setInterval(() => {
      console.log();
      setValue((prev) => prev + '! ');
    }, 1000);

    return () => {
      clearInterval(a);
    };
  }, []);

  console.log('render');
  return (
    <div>
      <p style={{ maxWidth: '100%', whiteSpace: 'pre-wrap' }}>{value}</p>
    </div>
  );
};
