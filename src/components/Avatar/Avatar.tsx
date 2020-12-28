import React from "react";

import styles from "./Avatar.module.scss";

import { Avatar as AntdAvatar } from "antd";

import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames";

type Props = {
  avatar: string;
  className?: string;
  size: string;
};

export const Avatar: React.FC<Props> = ({ avatar, className, size }) => {
  const defaultAvatar = <UserOutlined />;

  return (
    <AntdAvatar
      className={classNames(
        { [styles.defaultAvatar]: avatar === "default" },
        className,
        styles[size + "Size"]
      )}
      icon={avatar === "default" && defaultAvatar}
    />
  );
};
