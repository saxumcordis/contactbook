import React from "react";
import { ReactComponent as RobotAvatar } from "./images/robotAvatar.svg";
import { ReactComponent as WomanAvatar } from "./images/womanAvatar.svg";
import { ReactComponent as Woman1Avatar } from "./images/woman1Avatar.svg";
import { ReactComponent as ManAvatar } from "./images/manAvatar.svg";
import { ReactComponent as Man1Avatar } from "./images/man1Avatar.svg";
import { ReactComponent as UserAvatar } from "./images/userAvatar.svg";
import { ReactComponent as User1Avatar } from "./images/user1Avatar.svg";
import { ReactComponent as User2Avatar } from "./images/user2Avatar.svg";
import { ReactComponent as GamerAvatar } from "./images/gamerAvatar.svg";
import { ReactComponent as UnicornAvatar } from "./images/unicornAvatar.svg";
import { UserOutlined } from "@ant-design/icons";

export const defaultAvatars = (avatarName: string, fill?: string) => {
  const avatarList: any = {
    default: {
      name: "default",
      icon: <UserOutlined style={{ color: fill }} />,
    },
    robotAvatar: {
      name: "robotAvatar",
      icon: <RobotAvatar fill={fill} />,
    },
    womanAvatar: {
      name: "womanAvatar",
      icon: <WomanAvatar fill={fill} />,
    },
    woman1Avatar: {
      name: "woman1Avatar",
      icon: <Woman1Avatar fill={fill} />,
    },
    manAvatar: {
      name: "manAvatar",
      icon: <ManAvatar fill={fill} />,
    },
    man1Avatar: {
      name: "man1Avatar",
      icon: <Man1Avatar fill={fill} />,
    },
    userAvatar: {
      name: "userAvatar",
      icon: <UserAvatar fill={fill} />,
    },
    user1Avatar: {
      name: "user1Avatar",
      icon: <User1Avatar fill={fill} />,
    },
    user2Avatar: {
      name: "user2Avatar",
      icon: <User2Avatar fill={fill} />,
    },
    gamerAvatar: {
      name: "gamerAvatar",
      icon: <GamerAvatar fill={fill} />,
    },
    unicornAvatar: {
      name: "unicornAvatar",
      icon: <UnicornAvatar fill={fill} />,
    },
  };

  return avatarList[avatarName];
};

export const defaultAvatarsNames = [
  "default",
  "robotAvatar",
  "womanAvatar",
  "woman1Avatar",
  "manAvatar",
  "man1Avatar",
  "userAvatar",
  "user1Avatar",
  "user2Avatar",
  "gamerAvatar",
  "unicornAvatar",
];
