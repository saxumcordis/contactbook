import React from "react";
import classNames from "classnames";
import { Field } from "formik";

import styles from "./LabeledInput.module.scss";
import { LabeledInputProps } from "../../types/Components";
import { InputProps } from "antd/lib/input";

export const LabeledInput: React.FC<LabeledInputProps & InputProps> = (
  props
) => {
  const {
    className,
    labelStyle,
    placeholder,
    disabled = false,
    labelText,
    labelSuffix,
  } = props;

  return (
    <div className={classNames(className, styles.inputWrapper)}>
      <label className={labelStyle}>
        {labelText} {labelSuffix}
      </label>
      <Field
        className={styles.input}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};
