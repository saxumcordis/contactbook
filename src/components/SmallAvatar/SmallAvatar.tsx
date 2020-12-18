import React from "react";

import styles from "./SmallAvatar.module.scss";

import { Avatar } from "antd";

import { UserOutlined } from "@ant-design/icons";

type Props = {
  avatar: string;
};

export const SmallAvatar: React.FC<Props> = ({ avatar }) => {
  const defaultAvatar = <UserOutlined />;

  return (
    <Avatar
      className={styles.contactAvatar}
      icon={avatar === "default" && defaultAvatar}
    />
  );
};
