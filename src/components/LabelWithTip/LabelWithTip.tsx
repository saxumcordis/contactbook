import React from "react";
import { LabelWithTipProps } from "../../types/Components";

import styles from "./LabelWithTip.module.scss";
import classNames from "classnames";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { PopOver } from "../PopOver";

export const LabelWithTip: React.FC<LabelWithTipProps> = ({
  labelClassName,
  labelText,
  tipContent,
  tipIcon,
  tipContentClassName,
  tipContentSizes,
  tipPlacement,
}) => {
  return (
    <label className={classNames(styles.label, labelClassName)}>
      {labelText}{" "}
      <PopOver
        content={tipContent}
        popOverClassName={tipContentClassName}
        container={tipContentSizes}
        placement={tipPlacement}
      >
        <span className={styles.icon}>
          {tipIcon || <ExclamationCircleOutlined />}
        </span>
      </PopOver>
    </label>
  );
};
