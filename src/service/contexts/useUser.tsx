// import { useQuery } from "@apollo/react-hooks";
import React, { createContext, useCallback, useContext, useState } from "react";
// import { ApolloQueryResult, NetworkStatus } from "apollo-client";

type TUser = {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  login: string;
  phoneNumber: string | null;
};

type TUserContext = {
  user: TUser | null;
  clearUser: () => void;
  reloadUser: /*() => Promise<ApolloQueryResult<any>> */ () => string;
};

export const UserContext = createContext<TUserContext>({
  user: null,
  clearUser: () => {
    return;
  },
  reloadUser: /*() => {
        return Promise.resolve({
            data: {},
            loading: true,
            networkStatus: NetworkStatus.ready,
            stale: false,
        });},*/ () =>
    "",
});

export const defaultUser = {
  userId: "0",
  firstName: "testUser",
  lastName: null,
  email: null,
  login: "admin",
  phoneNumber: null,
};

export const UserProvider: React.FC = ({ children }) => {
  const authorizedUser = JSON.parse(
    localStorage.getItem("AUTHORIZED_USER_CONTACT_BOOK")!
  );

  const [user, setUser] = useState<TUser | null>(authorizedUser);

  //const { data, loading, refetch } = useQuery();

  const clearUser = () => "";

  const reloadUser = useCallback(
    () => {
      const authorizedUser = JSON.parse(
        localStorage.getItem("AUTHORIZED_USER_CONTACT_BOOK")!
      );
      setUser(authorizedUser);
      return "";
    },
    [
      /*refetch*/
    ]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        clearUser,
        reloadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext<TUserContext>(UserContext);
