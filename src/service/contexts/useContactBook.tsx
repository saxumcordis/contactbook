import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Contact_person } from "../../types/Contact";

type TContactBookContext = {
  contactBook: Contact_person[];
  length: number;
  lastId: number;
  addContact: (contact: Contact_person) => void;
  removeContact: (id: number) => void;
  updateContact: (contact: Contact_person) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
} & Contact_person;

export const ContactBookContext = createContext<Partial<TContactBookContext>>(
  {}
);

export const useContactBook = () => {
  return useContext(ContactBookContext);
};
export const ContactBookProvider: React.FC = ({ children }) => {
  const [contactBook, setContactBook] = useState(
    JSON.parse(localStorage.getItem("contactBook") || "[]")
  );

  const [searchValue, setSearchValue] = useState<string>("");

  const addContact = useCallback(
    (contact) => setContactBook(contactBook.concat([contact])),
    [contactBook]
  );

  const removeContact = useCallback(
    (id) =>
      setContactBook(
        contactBook.filter((contact: { _id: number }) => contact._id !== id)
      ),
    [contactBook]
  );

  const updateContact = useCallback(
    (contact) =>
      setContactBook(
        contactBook.map((e: Contact_person) =>
          e._id === contact._id ? contact : e
        )
      ),
    [contactBook]
  );

  const length = contactBook.length || 0;

  const lastId = length && contactBook[length - 1]._id;

  const value = {
    contactBook,
    addContact,
    removeContact,
    updateContact,
    length,
    lastId,
    searchValue,
    setSearchValue,
  };

  return (
    <ContactBookContext.Provider value={value}>
      {children}
    </ContactBookContext.Provider>
  );
};

export const PersistContactBook = () => {
  const { contactBook } = useContactBook();

  useEffect(() => {
    localStorage.setItem("contactBook", JSON.stringify(contactBook));
  }, [contactBook]);

  return <></>;
};
