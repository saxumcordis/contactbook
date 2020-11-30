import React from "react";
import styles from "./SearchInput.module.scss";

import 'antd/es/input/style/index.css';

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const SearchInput = () => {
  const suffix = <SearchOutlined />;

  return (
    <div className={styles.searchInputWrapper}>
      <Input className={styles.searchInput} suffix={suffix} placeholder="Start input contact name..." />
    </div>
  );
};
