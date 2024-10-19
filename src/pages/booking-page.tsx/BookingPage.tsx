import { Layout } from 'antd';
import { AppHeader } from '../../components/booking/header/header';
import { FixedButton } from '../../components/booking/fixed-button/fixed-button';

const { Content } = Layout;

export const BookingPage = () => {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: '24px' }}>
      </Content>
      <FixedButton />
    </Layout>
  );
};
