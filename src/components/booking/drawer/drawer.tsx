import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { HomeOutlined, BookOutlined, BarChartOutlined } from '@ant-design/icons';
import { CustomModal } from '../../custom-modal/custom-modal';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  
  const handleAddRoomClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = (values: any) => {
    console.log('Form submitted:', values);
    setModalVisible(false);
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
    </Drawer>
  );
};
