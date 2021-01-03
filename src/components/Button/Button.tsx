import React from "react";
import { Button as AntdButton } from "antd";
import { ButtonProps as AntdButtonProps } from "antd/es/button";
import classNames from "classnames";
import "antd/es/button/style/index.css";

import styles from "./Button.module.scss";
import { ButtonProps } from "../../types/Components";

export const Button: React.FC<ButtonProps & AntdButtonProps> = ({
  prefixIcon,
  suffixIcon,
  className,
  children,
  ...antdButtonProps
}) => (
  <AntdButton
    className={classNames(styles.button, className)}
    {...antdButtonProps}
  >
    {prefixIcon && !antdButtonProps.loading && (
      <span className={styles.prefixIcon}>{prefixIcon}</span>
    )}
    {children}
    {suffixIcon && <span className={styles.suffixIcon}>{suffixIcon}</span>}
  </AntdButton>
);
