import React, { useState } from "react";

import styles from "./PopOver.module.scss";
import classNames from "classnames";
import { PopOverProps } from "../../types/Components";

export const PopOver: React.FC<PopOverProps> = (props) => {
  const {
    content,
    children,
    placement = "top",
    trigger = "hover",
    popOverClassName,
    objectClassName,
  } = props;

  const [element, setElement] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setElement(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setElement(null);
  };

  const useStyle = (triggerObject: HTMLElement | null, placement: string) => {
    if (!triggerObject) return { display: "none" };
    const style: any = {
      top: {
        top: triggerObject.offsetTop - 2 * triggerObject.offsetHeight - 6,
        left: triggerObject.offsetLeft + triggerObject.offsetWidth / 2 - 50,
      },
      left: {
        top: triggerObject.offsetTop - 13,
        left: triggerObject.offsetLeft - 106,
      },
      right: {
        top: triggerObject.offsetTop - 13,
        left: triggerObject.offsetLeft + triggerObject.offsetWidth + 6,
      },
      bottom: {
        top: triggerObject.offsetTop + 2 * triggerObject.offsetHeight - 6,
        left: triggerObject.offsetLeft + triggerObject.offsetWidth / 2 - 50,
      },
      leftTop: {
        top: triggerObject.offsetTop - 2 * triggerObject.offsetHeight - 6,
        left: triggerObject.offsetLeft - 106,
        borderBottomRightRadius: 1,
      },
      leftBottom: {
        top: triggerObject.offsetTop + 2 * triggerObject.offsetHeight - 6,
        left: triggerObject.offsetLeft - 106,
        borderTopRightRadius: 1,
      },
      rightBottom: {
        top: triggerObject.offsetTop + 2 * triggerObject.offsetHeight - 6,
        left: triggerObject.offsetLeft + triggerObject.offsetWidth + 6,
        borderTopLeftRadius: 1,
      },
      rightTop: {
        top: triggerObject.offsetTop - 2 * triggerObject.offsetHeight - 6,
        left: triggerObject.offsetLeft + triggerObject.offsetWidth + 6,
        borderBottomLeftRadius: 1,
      },
    };
    return { ...style[placement || "top"] };
  };

  const popOverStyle = useStyle(element, placement);

  return (
    <div>
      <div
        className={classNames(
          { [styles.fadeIn]: element },
          styles.popOver,
          popOverClassName
        )}
        style={popOverStyle}
      >
        <span onMouseLeave={handlePopoverClose}>{content}</span>
      </div>
      {trigger === "hover" && (
        <div
          className={classNames(styles.object, objectClassName)}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {children}
        </div>
      )}
      {trigger === "click" && (
        <div
          className={classNames(styles.object, objectClassName)}
          onClick={handlePopoverOpen}
        >
          {children}
        </div>
      )}
    </div>
  );
};
