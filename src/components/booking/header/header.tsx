import React, { useState } from 'react';
import { Layout, Dropdown, Button, MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../redux/hooks/useAppSelector';
import { CurrentDate } from '../current-date/CurrentDate';
import { DrawerMenu } from '../drawer/drawer';

import styles from './header.module.css';
import { UserAvatar } from '../user-avatar/Avatar';
import { useSignOutMutation } from '../../../redux/services/authApiSlice';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const user = useAppSelector((state: { auth: { user: any; }; }) => state.auth.user);

  const [signOut] = useSignOutMutation();

  const handleMenuClick = () => {
    setVisible(true);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: <Button onClick={handleLogout}>Выйти</Button>,
    },
  ];

  return (
    <Header className={styles.header}>
      <MenuOutlined onClick={handleMenuClick} className={styles.menuIcon} />
      <CurrentDate />
      <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>    
          <div>
            <UserAvatar src={user?.photoURL} alt={user?.displayName} className={styles.userAvatar} displayName={user?.displayName}/>
          </div>
      </Dropdown>
      <DrawerMenu visible={visible} onClose={() => setVisible(false)} />
    </Header>
  );
};
