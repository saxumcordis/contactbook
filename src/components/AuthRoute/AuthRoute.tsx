import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useUser } from "../../service/contexts/useUser";

export const AuthRoute: React.FC<RouteProps> = (props) => {
  const { user } = useUser();

  if (user) {
    return <Route {...props} />;
  }

  return <Redirect to="/authorization" />;
};
