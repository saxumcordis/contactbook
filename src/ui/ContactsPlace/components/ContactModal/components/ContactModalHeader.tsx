import React from "react";
import { Contact_person } from "../../../../../types/Contact";

type Props = {
  contact: Contact_person;
};

//TODO Изменение хедера: редактирование/просмотр контакта. Добавить контекст юзера

export const ContactModalHeader: React.FC<Props> = ({ contact }) => {
  const { name, surname } = contact;

  return (
    <>
      Контакт: {name} {surname}
    </>
  );
};
