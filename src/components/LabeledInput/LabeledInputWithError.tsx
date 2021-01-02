import React from "react";
import classNames from "classnames";
import { Field } from "formik";

import styles from "./LabeledInput.module.scss";

type Props = {
  className?: string;
  id: string;
  labelStyle?: string;
  name: string;
  placeholder?: string;
  labelText: string;
  labelSuffix?: React.ReactNode;
  labelError?: string;
  hiddenTip?: boolean;
};

export const LabeledInputWithError: React.FC<Props> = (props) => {
  const {
    className,
    id,
    labelStyle,
    name,
    placeholder,
    labelText,
    labelSuffix,
    labelError,
    hiddenTip,
  } = props;

  return (
    <div className={classNames(className, styles.inputWrapper)}>
      <div className={styles.labelBox}>
        <label className={labelStyle}>{labelText}</label>
        <label className={classNames(labelStyle, styles.labelError)}>
          <span>{!hiddenTip && labelError}</span>
          <span title={labelError}>{labelError && labelSuffix}</span>
        </label>
      </div>
      <Field
        className={styles.input}
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
