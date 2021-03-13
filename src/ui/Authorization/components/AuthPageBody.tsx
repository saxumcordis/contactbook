import React, { useEffect } from "react";
import {
  AuthMode,
  AuthStatus,
  TAuthData,
  useAuthData,
} from "../../../service/contexts/useAuth";
import { useFormikContext } from "formik";

import styles from "./AuthPageBody.module.scss";
import { LabeledInputWithError } from "../../../components/LabeledInput";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const AuthPageBody = () => {
  const { authMode, setAuthStatus } = useAuthData();

  const { errors, values } = useFormikContext<TAuthData>();

  const isRegistration = authMode === AuthMode.REGISTRATION;

  const isLogin = authMode === AuthMode.LOGIN;

  useEffect(() => {
    const isRegisterDataEmpty = !Object.keys(values).every(
      (value) => values[value as keyof TAuthData]
    );
    const isLoginDataEmpty = !(values.login && values.password);
    if (isLogin && isLoginDataEmpty) setAuthStatus?.(AuthStatus.EMPTYDATA);
    else if (isRegistration && isRegisterDataEmpty)
      setAuthStatus?.(AuthStatus.EMPTYDATA);
    else if (!Object.keys(errors).length)
      setAuthStatus?.(
        authMode === AuthMode.REGISTRATION
          ? AuthStatus.READYFORREGISTER
          : AuthStatus.READYFORLOGIN
      );
    else setAuthStatus?.(AuthStatus.WRONGFIELD);
  }, [authMode, errors, setAuthStatus, isRegistration, isLogin, values]);

  return (
    <div className={styles.form}>
      <LabeledInputWithError
        labelStyle={styles.labelStyle}
        id="login"
        name="login"
        labelText="Логин"
        labelError={errors.login}
        labelSuffix={<ExclamationCircleOutlined />}
        hiddenTip={true}
        tipPlacement="leftTop"
      />
      {isRegistration && (
        <LabeledInputWithError
          labelStyle={styles.labelStyle}
          id="email"
          name="email"
          labelText="Email"
          labelError={errors.email}
          labelSuffix={<ExclamationCircleOutlined />}
          hiddenTip={true}
          tipPlacement="leftTop"
        />
      )}
      <LabeledInputWithError
        labelStyle={styles.labelStyle}
        id="password"
        name="password"
        labelText="Пароль"
        labelError={errors.password}
        labelSuffix={<ExclamationCircleOutlined />}
        hiddenTip={true}
        tipPlacement="leftTop"
      />
      {isRegistration && (
        <>
          <LabeledInputWithError
            labelStyle={styles.labelStyle}
            id="confirmPassword"
            name="confirmPassword"
            labelText="Подтвердите пароль"
            labelError={errors.confirmPassword}
            labelSuffix={<ExclamationCircleOutlined />}
            hiddenTip={true}
            tipPlacement="leftTop"
          />
          <LabeledInputWithError
            labelStyle={styles.labelStyle}
            id="phone"
            name="phone"
            labelText="Мобильный телефон"
            labelError={errors.phone}
            labelSuffix={<ExclamationCircleOutlined />}
            hiddenTip={true}
            tipPlacement="leftTop"
          />
        </>
      )}
    </div>
  );
};
