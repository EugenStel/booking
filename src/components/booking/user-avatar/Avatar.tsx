import React from 'react';
import { Avatar } from 'antd';

interface UserAvatarProps {
    src?: string | null;
    alt?: string | null;
    displayName?: string | null;
    className?: string;
  }

export const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, displayName,  className }) => (
    <>
    <Avatar src={src || undefined} alt={alt || undefined} className={className} />
    <span style={{ marginLeft: '10px', color: '#fff' }}>{displayName}</span>
    </>
);
