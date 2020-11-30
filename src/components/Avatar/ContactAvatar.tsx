import React from "react";

import styles from './ContactAvatar.module.scss';

import { Avatar } from 'antd';

import { UserOutlined } from "@ant-design/icons";

type Props = {
  avatar: string;
};

export const ContactAvatar: React.FC<Props> = ({ avatar }) => {

    const defaultAvatar = <UserOutlined />;

    return <Avatar className={styles.contactAvatar} icon={avatar === 'default' && defaultAvatar} />;
};
