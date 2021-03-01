import React, { createContext, useCallback, useContext, useState } from "react";

export enum AuthMode {
  LOGIN = "login",
  REGISTRATION = "registration",
}

export enum AuthStatus {
  READYFORLOGIN = "readyForLogin",
  READYFORREGISTER = "readyForRegister",
  EMPTYDATA = "emptyData",
  WRONGFIELD = "wrongField",
}

type TAuthData = {
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
  confirmData: () => void; //@TODO;
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

const defaultAuthData = {
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

  const loginData = { login: authData.login, password: authData.password };
  const registerData = authData;

  const clearData = useCallback(() => setAuthData(defaultAuthData), [
    setAuthData,
  ]);
  const confirmData = () => {};

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
