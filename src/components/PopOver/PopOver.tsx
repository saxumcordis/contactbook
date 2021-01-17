import React, { useCallback, useState } from "react";

import styles from "./PopOver.module.scss";
import classNames from "classnames";
import { PopOverProps } from "../../types/Components";

export const PopOver: React.FC<PopOverProps> = (props) => {
  const {
    content,
    children,
    placement = "top",
    trigger = "hover",
    autoClosable = true,
    popOverClassName,
    objectClassName,
    status,
    container = {
      width: 100,
      height: 26,
    },
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

  const useStyle = useCallback(
    (triggerObject: HTMLElement | null, placement: string) => {
      if (!triggerObject || status === "CLOSE") return { display: "none" };

      const style: any = {
        top: {
          top: triggerObject.offsetTop - container.height - 10,
          left:
            triggerObject.offsetLeft +
            triggerObject.offsetWidth / 2 -
            container.width / 2,
        },
        left: {
          top: triggerObject.offsetTop - container.height / 2,
          left: triggerObject.offsetLeft - (container.width + 10),
        },
        right: {
          top: triggerObject.offsetTop - container.height / 2,
          left: triggerObject.offsetLeft + triggerObject.offsetWidth + 10,
        },
        bottom: {
          top: triggerObject.offsetTop + triggerObject.offsetHeight + 10,
          left:
            triggerObject.offsetLeft +
            triggerObject.offsetWidth / 2 -
            container.width / 2,
        },
        leftTop: {
          top: triggerObject.offsetTop - container.height - 10,
          left: triggerObject.offsetLeft - container.width - 10,
          borderBottomRightRadius: 1,
        },
        leftBottom: {
          top: triggerObject.offsetTop + triggerObject.offsetHeight + 10,
          left: triggerObject.offsetLeft - (container.width + 6),
          borderTopRightRadius: 1,
        },
        rightBottom: {
          top: triggerObject.offsetTop + triggerObject.offsetHeight + 10,
          left: triggerObject.offsetLeft + triggerObject.offsetWidth + 10,
          borderTopLeftRadius: 1,
        },
        rightTop: {
          top: triggerObject.offsetTop - container.height - 10,
          left: triggerObject.offsetLeft + triggerObject.offsetWidth + 10,
          borderBottomLeftRadius: 1,
        },
      };
      return { ...style[placement || "top"] };
    },
    [container, status]
  );

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
        onMouseLeave={() => autoClosable && handlePopoverClose()}
      >
        <span>{content}</span>
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
          className={classNames(
            styles.object,
            {
              [styles.active]: element && status !== "CLOSE",
            },
            objectClassName
          )}
          onClick={handlePopoverOpen}
        >
          {children}
        </div>
      )}
    </div>
  );
};
