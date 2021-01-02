import React from "react";
import { ReactComponent as RobotAvatar } from "./images/robotAvatar.svg";
import { ReactComponent as WomanAvatar } from "./images/womanAvatar.svg";
import { ReactComponent as ManAvatar } from "./images/manAvatar.svg";
import { ReactComponent as UserAvatar } from "./images/userAvatar.svg";

export const defaultAvatars = (avatarName: string, fill?: string) => {
  const avatarList: any = {
    robotAvatar: {
      name: "robotAvatar",
      icon: <RobotAvatar fill={fill} />,
    },
    womanAvatar: {
      name: "womanAvatar",
      icon: <WomanAvatar fill={fill} />,
    },
    manAvatar: {
      name: "manAvatar",
      icon: <ManAvatar fill={fill} />,
    },
    userAvatar: {
      name: "userAvatar",
      icon: <UserAvatar fill={fill} />,
    },
  };

  return avatarList[avatarName];
};
