import React from "react";
import { Header } from "./ui/Header";
import { ContactsPlace } from "./ui/ContactsPlace";
import { ContactBookProvider, PersistContactBook } from "./service/contexts";
import { NewContactModalProvider } from "./service/contexts/useNewContactModal";
import { NewContactModal } from "./ui/NewContactModal";
import {
  GroupsContextProvider,
  PersistGroups,
} from "./service/contexts/useGroups";
import { FavoritesButton } from "./ui/FavoritesButton";
import { GroupsModalContextProvider } from "./service/contexts/useGroupsModal";
import { GroupsModal } from "./ui/GroupsModal";

export default function App() {
  return (
    <div className="App">
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
    </div>
  );
}
