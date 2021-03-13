import React from "react";
import classNames from "classnames";
import { Field } from "formik";

import styles from "./LabeledInput.module.scss";
import { PopOver } from "../PopOver";
import {
  LabeledInputProps,
  LabeledInputWithErrorProps,
} from "../../types/Components";
import { InputProps } from "antd/lib/input";

export const LabeledInputWithError: React.FC<
  LabeledInputProps & LabeledInputWithErrorProps & InputProps
> = (props) => {
  const {
    className,
    labelStyle,
    placeholder,
    labelText,
    labelSuffix,
    labelError,
    hiddenTip,
    tipPlacement,
  } = props;

  return (
    <div className={classNames(className, styles.inputWrapper)}>
      <div className={styles.labelBox}>
        <label className={labelStyle}>{labelText}</label>
        <label className={classNames(labelStyle, styles.labelError)}>
          {!hiddenTip && labelError && <span>{!hiddenTip && labelError}</span>}
          {hiddenTip && labelError ? (
            <PopOver content={labelError} placement={tipPlacement}>
              <span className={styles.labelSuffix}>
                {labelError && labelSuffix}
              </span>
            </PopOver>
          ) : (
            <span className={styles.labelSuffix}>
              {labelError && labelSuffix}
            </span>
          )}
        </label>
      </div>
      <Field
        className={styles.input}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};
