import React from "react";
import styles from "./Header.module.scss";

import { AddPersonButton } from "./components/AddPersonButton";
import { SearchInput } from "./components/SearchInput";

export const Header = () => {
  return (
    <nav className={styles.header}>
      <AddPersonButton />
      <SearchInput />
    </nav>
  );
};
