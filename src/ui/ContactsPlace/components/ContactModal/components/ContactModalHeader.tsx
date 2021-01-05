import React from "react";

import { DeleteOutlined } from "@ant-design/icons";

import styles from "./ContactModalHeader.module.scss";
import { PopConfirm } from "../../../../../components/PopConfirm";
import { useContactBook } from "../../../../../service/contexts";
import { handleLongStringWithTip } from "../../../../../service/stringHandlers";

type Props = {
  title: string;
  dirty: boolean;
  id: number;
  setOpen: (value: boolean) => void;
};

//TODO Изменение хедера: редактирование/просмотр контакта. Добавить контекст юзера

export const ContactModalHeader: React.FC<Props> = ({
  title,
  dirty,
  id,
  setOpen,
}) => {
  const { removeContact } = useContactBook();

  const handleRemove = () => {
    removeContact?.(id);
    setOpen(false);
  };

  return (
    <>
      {!dirty ? "Контакт" : "Редактирование контакта"}{" "}
      {handleLongStringWithTip(title, 18)}
    </>
  );
};
