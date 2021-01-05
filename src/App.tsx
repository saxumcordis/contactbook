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

export default function App() {
  return (
    <div className="App">
      <ContactBookProvider>
        <NewContactModalProvider>
          <GroupsContextProvider>
            <Header />
            <ContactsPlace />
            <NewContactModal />
            <PersistContactBook />
            <PersistGroups />
          </GroupsContextProvider>
        </NewContactModalProvider>
      </ContactBookProvider>
    </div>
  );
}
