import React from "react";
import classNames from "classnames";
import { Field } from "formik";

import styles from "./LabeledInput.module.scss";
import { LabeledInputProps } from "../../types/Components";

export const LabeledInput: React.FC<LabeledInputProps> = (props) => {
  const {
    className,
    id,
    labelStyle,
    name,
    placeholder,
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
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
