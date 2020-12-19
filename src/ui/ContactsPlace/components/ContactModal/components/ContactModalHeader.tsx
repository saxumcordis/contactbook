import React from "react";

type Props = {
  title: string,
  dirty: boolean,
};

//TODO Изменение хедера: редактирование/просмотр контакта. Добавить контекст юзера

export const ContactModalHeader: React.FC<Props> = ({ title, dirty }) => {

  return (
    <>
      {!dirty ? "Контакт" : "Редактирование контакта:"} {title}
    </>
  );
};
