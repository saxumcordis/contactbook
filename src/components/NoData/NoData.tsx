import React from "react";
import { NoDataProps } from "../../types/Components";

import styles from "./NoData.module.scss";

export const NoData: React.FC<NoDataProps> = (props) => {
  const { content, className } = props;

  return (
    <div className={styles.noDataWrapper}>
      <span className={className}>{content}</span>
    </div>
  );
};
