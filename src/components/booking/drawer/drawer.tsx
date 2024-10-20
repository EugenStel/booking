import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { HomeOutlined, BookOutlined, BarChartOutlined } from '@ant-design/icons';
import { CustomModal } from '../../custom-modal/custom-modal';
import { BookingStatusModal } from '../booking-status-modal/booking-status-modal';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);

  const handleAddRoomClick = () => {
    setModalVisible(true);
  };

  const handleAddStatusClick = () => {
    setStatusModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleStatusModalCancel = () => {
    setStatusModalVisible(false);
  };

  const handleModalSubmit = (values: any) => {
    console.log('Form submitted:', values);
    setModalVisible(false);
  };

  const handleStatusModalSubmit = (values: any) => {
    console.log('Status submitted:', values);
    setStatusModalVisible(false);
  };

  return (
    <Drawer title="Выберите действие" placement="left" onClose={onClose} open={visible}>
      <Button
        type="text"
        icon={<HomeOutlined />}
        style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'start', margin: '10px 0' }}
        onClick={handleAddRoomClick}
      >
        Добавить номер
      </Button>
      <Button
        type="text"
        icon={<BookOutlined />}
        style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'start' }}
        onClick={handleAddStatusClick}
      >
        Статусы бронирования
      </Button>
      <Button
        type="text"
        icon={<BarChartOutlined />}
        style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'start', marginTop: '10px' }}
      >
        Статистика/Аналитика
      </Button>

      <CustomModal
        open={isModalVisible}
        title="Добавить номер"
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />

      <BookingStatusModal
        open={isStatusModalVisible}
        onCancel={handleStatusModalCancel}
        onSubmit={handleStatusModalSubmit}
      />
    </Drawer>
  );
};
