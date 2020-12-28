import React from "react";
import styles from "./SearchInput.module.scss";

import { SearchOutlined } from "@ant-design/icons";
import { InputField } from "../../../../components/InputField";

export const SearchInput = () => {
  const suffix = <SearchOutlined />;

  return (
    <div className={styles.searchInputWrapper}>
      <InputField
        className={styles.searchInput}
        suffix={suffix}
        placeholder="Start input contact name..."
      />
    </div>
  );
};
