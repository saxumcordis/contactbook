import React from "react";
import { Button } from "../../../components/Button";
import classNames from "classnames";
import {
  AuthMode,
  AuthStatus,
  TAuthData,
  useAuthData,
} from "../../../service/contexts/useAuth";

import styles from "./AuthPageFooter.module.scss";
import { useFormikContext } from "formik";

export const AuthPageFooter = () => {
  const { authMode, setAuthMode, authStatus } = useAuthData();
  const isLogin = authMode === AuthMode.LOGIN;
  const isRegistration = authMode === AuthMode.REGISTRATION;

  const { errors, dirty, submitForm } = useFormikContext<TAuthData>();

  const isConfirmDisabled =
    !dirty ||
    !!Object.keys(errors).length ||
    ![AuthStatus.READYFORLOGIN, AuthStatus.READYFORREGISTER].includes(
      authStatus!
    );

  return (
    <div className={styles.footer}>
      <div className={styles.footerChoice}>
          {isLogin &&
          <Button
              className={classNames(styles.button, {
                  [styles.button_notActive]: isRegistration,
              })}
              disabled={isRegistration}
              onClick={() => setAuthMode?.(AuthMode.REGISTRATION)}
          >
              Регистрация
          </Button>
          }
          {isRegistration &&
          <Button
              className={classNames(styles.button, {
                  [styles.button_notActive]: isLogin,
              })}
              disabled={isLogin}
              onClick={() => setAuthMode?.(AuthMode.LOGIN)}
          >
              Вход в существующий аккаунт
          </Button>
          }
      </div>
      <div className={styles.footerConfirm}>
        <Button
          className={classNames(styles.button, {
            [styles.button_notActive]: isConfirmDisabled,
          })}
          disabled={isConfirmDisabled}
          onClick={submitForm}
        >
          ОК
        </Button>
      </div>
      <label>{isLogin ? 'login: test password: testUser1' : 'Temporary unavailable'} </label> {/*@TODO warnings*/}
    </div>
  );
};
