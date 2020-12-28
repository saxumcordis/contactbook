import React from "react";
import {Header} from "./ui/Header";
import {ContactsPlace} from "./ui/ContactsPlace";
import {ContactBookProvider, PersistContactBook} from "./service/contexts";

export default function App() {
    return (
        <div className="App">
            <ContactBookProvider>
                <Header/>
                <ContactsPlace/>
                <PersistContactBook/>
            </ContactBookProvider>
        </div>
    );
}
