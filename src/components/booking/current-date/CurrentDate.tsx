import React from 'react';
import dayjs from 'dayjs';

export const CurrentDate: React.FC = () => {
  const today = dayjs().format('DD MMMM YYYY');

  return (
    <div style={{ color: '#fff', fontSize: '18px', textAlign: 'center', flex: 1 }}>
      {today}
    </div>
  );
};
