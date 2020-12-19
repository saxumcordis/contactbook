import classNames from "classnames";
import React, { HTMLProps } from "react";

import styles from "./FieldGroup.module.scss";

type FieldGroupProps = {
  heading?: string;
  layout?: "column" | "row";
};

export const FieldGroup: React.FC<
  FieldGroupProps & HTMLProps<HTMLDivElement>
> = ({ children, className, heading, layout = "row", ...restProps }) => (
  <div
    className={classNames(styles.fieldGroup, className, {
      [styles.fieldGroup_layoutColumn]: layout === "column",
    })}
    {...restProps}
  >
    {heading && <div className={styles.heading}>{heading}</div>}
    <div className={styles.body}>{children}</div>
  </div>
);
