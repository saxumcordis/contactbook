import React from "react";
import { Switch, Redirect } from "react-router-dom";

import styles from "./AuthPage.module.scss";
import {
  useAuthData,
} from "../../service/contexts/useAuth";
import { AuthPageFooter } from "./components";
import {AuthPageBody} from "./components/AuthPageBody";

export const AuthPage = () => {
  const { authMode } = useAuthData();

  return (
    <div className={styles.container}>
      <Switch>
        <Redirect from="/authorization" to={"/authorization/" + authMode} />
      </Switch>
      <div className={styles.form}>
        <AuthPageBody />
        <AuthPageFooter />
      </div>
    </div>
  );
};
