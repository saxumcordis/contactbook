import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import { Contact_person } from "../../types/Contact";

type ContactBookItem = {
  contact: Contact_person;
}

type ContactBookContext = {
  contactBook: ContactBookItem[];
  addContact: (contact: Contact_person) => void;
  removeContact: (id: number) => void;
} & Contact_person;

export const ContactBookContext = createContext<Partial<ContactBookContext>>(
  {}
);

export const useContactBook = () => {
  return useContext(ContactBookContext);
};
export const ContactBookProvider: React.FC = ({ children }) => {
  const [contactBook, setContactBook] = useState(
    JSON.parse(localStorage.getItem("contactBook") || "[]")
  );

  const addContact = useCallback(
    (contact) => setContactBook(contactBook.concat([contact])),
    contactBook
  );

  const removeContact = useCallback(
    (id) =>
      setContactBook(
        contactBook.filter((contact: { id: number }) => contact.id != id)
      ),
    [contactBook]
  );

  const value = { contactBook, addContact, removeContact };

  return (
    <ContactBookContext.Provider value={value}>
      {children}
    </ContactBookContext.Provider>
  );
};

export const PersistContactBook = () => {
  const { contactBook } = useContactBook();

  useEffect(() => {
    localStorage.setItem('contactBook', JSON.stringify(contactBook));
  }, [contactBook]);

  return <></>
}
