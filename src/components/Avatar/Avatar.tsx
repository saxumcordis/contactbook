import React from "react";

import styles from "./Avatar.module.scss";

import { Avatar as AntdAvatar } from "antd";

import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { defaultAvatars } from "../../assets/defaultAvatars";
import { AvatarProps } from "../../types/Components";

export const Avatar: React.FC<AvatarProps> = ({
  avatar,
  className,
  size,
  fillColor,
  onClick,
}) => {
  const defaultAvatar = <UserOutlined style={{ color: fillColor }} />;

  return (
    <div onClick={onClick}>
      <AntdAvatar
        className={classNames(
          { [styles.defaultAvatar]: avatar === "default" },
          className,
          { [styles[size + "Size"]]: avatar === "default" },
          { [styles[size + "CustomSize"]]: avatar !== "default" }
        )}
        icon={
          (avatar === "default" && defaultAvatar) ||
          defaultAvatars(avatar, fillColor)?.icon
        }
      />
    </div>
  );
};
