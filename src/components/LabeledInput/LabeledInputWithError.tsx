import React from "react";
import classNames from "classnames";
import { Field } from "formik";

import styles from "./LabeledInput.module.scss";
import { PopOver } from "../PopOver";

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
  tipPlacement?: string;
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
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
