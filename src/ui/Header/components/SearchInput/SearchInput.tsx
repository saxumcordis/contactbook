import React from "react";
import styles from "./SearchInput.module.scss";

import { SearchOutlined } from "@ant-design/icons";
import { InputField } from "../../../../components/InputField";
import { useContactBook } from "../../../../service/contexts";

export const SearchInput = () => {
  const suffix = <SearchOutlined />;

  const { setSearchValue } = useContactBook();

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setSearchValue?.(e.target.value.split(" "));
    else setSearchValue?.([]);
  };

  return (
    <div className={styles.searchInputWrapper}>
      <InputField
        className={styles.searchInput}
        suffix={suffix}
        placeholder="Start input contact name..."
        onChange={handleSearchValue}
      />
    </div>
  );
};
