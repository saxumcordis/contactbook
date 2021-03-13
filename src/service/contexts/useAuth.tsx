import React, { createContext, useCallback, useContext, useState } from "react";
import { defaultUser, useUser } from "./useUser";

export enum AuthMode {
  LOGIN = "login",
  REGISTRATION = "registration",
}

export enum AuthStatus {
  READYFORLOGIN = "readyForLogin",
  READYFORREGISTER = "readyForRegister",
  EMPTYDATA = "emptyData",
  WRONGFIELD = "wrongField",
  LOGGED = "logged",
}

export type TAuthData = {
  login: string | null;
  password: string | null;
  confirmPassword: string | null;
  email: string | null;
  phone: string | null;
};

type TAuthDataContext = {
  loginData: Partial<TAuthData> | null;
  registerData: TAuthData | null;
  clearData: () => void;
  confirmData: (data: TAuthData) => void; //@TODO;
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  authStatus: AuthStatus;
  setAuthStatus: (status: AuthStatus) => void;
};

export const AuthDataContext = createContext<Partial<TAuthDataContext>>({
  loginData: null,
  registerData: null,
  clearData: () => {
    return;
  },
  confirmData: () => {
    return;
  },
  authMode: AuthMode.LOGIN,
});

export const defaultAuthData = {
  login: "",
  password: "",
  confirmPassword: "",
  email: "",
  phone: "",
};

export const AuthDataProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<TAuthData>(defaultAuthData);
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(
    AuthStatus.EMPTYDATA
  );

  const { reloadUser } = useUser();

  const loginData = { login: authData.login, password: authData.password };
  const registerData = authData;

  const clearData = useCallback(() => setAuthData(defaultAuthData), [
    setAuthData,
  ]);
  const confirmData = useCallback(
    (data: TAuthData) => {
      if (authMode === AuthMode.LOGIN) {
        const { login, password } = data;

        if (login?.match(/^test$/) && password?.match(/^testUser1$/)) {
          localStorage.setItem(
            "AUTHORIZED_USER_CONTACT_BOOK",
            JSON.stringify(defaultUser)
          );
          setAuthStatus(AuthStatus.LOGGED);
          reloadUser();
        }
      }
    },
    [authMode, reloadUser]
  );

  const value = {
    loginData,
    registerData,
    clearData,
    confirmData,
    authMode,
    setAuthMode,
    authStatus,
    setAuthStatus,
  };
  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
};

export const useAuthData = () => useContext(AuthDataContext);
