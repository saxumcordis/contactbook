import React from "react";
import { Header } from "./ui/Header";
import { ContactsPlace } from "./ui/ContactsPlace";
import { ContactBookProvider, PersistContactBook } from "./service/contexts";
import { NewContactModalProvider } from "./service/contexts/useNewContactModal";
import { NewContactModal } from "./ui/NewContactModal";
import { AuthPage } from "./ui/Authorization";
import {
  GroupsContextProvider,
  PersistGroups,
} from "./service/contexts/useGroups";
import { FavoritesButton } from "./ui/FavoritesButton";
import { GroupsModalContextProvider } from "./service/contexts/useGroupsModal";
import { GroupsModal } from "./ui/GroupsModal";
import { AuthRoute } from "./components/AuthRoute";
import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
import { useUser } from "./service/contexts/useUser";
import { AuthDataProvider } from "./service/contexts/useAuth";

export default function App() {
  const WrappedContactBook = (
    <ContactBookProvider>
      <NewContactModalProvider>
        <GroupsContextProvider>
          <GroupsModalContextProvider>
            <Header />
            <ContactsPlace />
            <NewContactModal />
            <GroupsModal />
            <FavoritesButton />
            <PersistContactBook />
            <PersistGroups />
          </GroupsModalContextProvider>
        </GroupsContextProvider>
      </NewContactModalProvider>
    </ContactBookProvider>
  );

  const AuthToContactBook = (
    <AuthDataProvider>
      <AuthPage />
    </AuthDataProvider>
  );

  const { user } = useUser();

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {user && <Redirect from="/authorization" to={"/"} />}
          <AuthRoute path="/" exact={true} children={WrappedContactBook} />
          <Route path="/authorization" children={AuthToContactBook} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
