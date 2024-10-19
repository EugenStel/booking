import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './fixed-button.module.css';
import { AddClientModal } from '../add-client-modal.tsx/add-client-modal';

export const FixedButton: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddClientClick = () => {
    setModalVisible(true);
  };

  return (
    <>
        <Button
            className={styles.floating_button}
            shape="circle"
            icon={<PlusOutlined />}
            onClick={handleAddClientClick} 
        />
        <AddClientModal open={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};
