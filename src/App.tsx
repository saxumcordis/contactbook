import React from "react";
import { Header } from "./ui/Header";
import { ContactsPlace } from "./ui/ContactsPlace";
import { ContactBookProvider, PersistContactBook } from "./service/contexts";
import { NewContactModalProvider } from "./service/contexts/useNewContactModal";
import { NewContactModal } from "./ui/NewContactModal";

export default function App() {
  return (
    <div className="App">
      <ContactBookProvider>
        <NewContactModalProvider>
          <Header />
          <ContactsPlace />
          <NewContactModal />
          <PersistContactBook />
        </NewContactModalProvider>
      </ContactBookProvider>
    </div>
  );
}
