import { useState } from 'react';
import { Layout } from 'antd';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import 'moment/locale/ru';

import { AppHeader } from '../../components/booking/header/header';
import { FixedButton } from '../../components/booking/fixed-button/fixed-button';

const { Content } = Layout;

const groups = [
  { id: 1, title: 'Room 101' },
  { id: 2, title: 'Room 102' },
  { id: 3, title: 'Room 103' },
];

moment.locale('ru');

const items = [
  {
    id: 1,
    group: 1,
    title: 'Booking 1',
    start_time: moment().add(0, 'days'),
    end_time: moment().add(2, 'days'),
    itemProps: {
      style: { background: '#b0e57c', borderRadius: '4px' },
    },
  },
  {
    id: 2,
    group: 2,
    title: 'Booking 2',
    start_time: moment().add(1, 'days'),
    end_time: moment().add(3, 'days'),
    itemProps: {
      style: { background: '#f28e36', borderRadius: '4px' },
    },
  },
  {
    id: 3,
    group: 3,
    title: 'Booking 3',
    start_time: moment().add(3, 'days'),
    end_time: moment().add(5, 'days'),
    itemProps: {
      style: { background: '#f7cac9', borderRadius: '4px' },
    },
  },
];

export const BookingPage = () => {
  const [defaultTimeStart] = useState(moment().startOf('day'));
  const [defaultTimeEnd] = useState(moment().add(7, 'days').startOf('day'));

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2>Booking Calendar</h2>
        </div>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          canMove={false}
          canResize={false}
          lineHeight={60}
          itemHeightRatio={0.75}
        />
      </Content>
      <FixedButton />
    </Layout>
  );
};
