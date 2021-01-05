import React from "react";

import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
import { ReactComponent as FavoriteIcon } from "./assets/favorite.svg";

import styles from "./ContactModalHeader.module.scss";
import { useContactBook } from "../../../../../service/contexts";
import { PopConfirm } from "../../../../../components/PopConfirm";

type Props = {
  id: number;
  setOpen: (value: boolean) => void;
};

export const ContactModalHeaderControl: React.FC<Props> = (props) => {
  const { id, setOpen } = props;

  const { removeContact } = useContactBook();

  const handleRemove = () => {
    removeContact?.(id);
    setOpen(false);
  };

  return (
    <div className={styles.control}>
      <FavoriteIcon fill={"#feacef"} />
      <PopConfirm
        title="Удалить контакт?"
        okText="Да"
        cancelText="Нет"
        onConfirm={handleRemove}
        childrenClass={styles.control}
      >
        <DeleteIcon fill={"#feacef"} />
      </PopConfirm>
    </div>
  );
};
