import React from "react";

import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
import { ReactComponent as FavoriteIcon } from "./assets/favorite.svg";
import { ReactComponent as FilledFavoriteIcon } from "./assets/filledFavorite.svg";

import styles from "./ContactModalHeader.module.scss";
import { useContactBook } from "../../../../../service/contexts";
import { PopConfirm } from "../../../../../components/PopConfirm";
import { Contact_person } from "../../../../../types/Contact";
import { useGroups } from "../../../../../service/contexts/useGroups";

type Props = {
  contact: Contact_person;
  setOpen: (value: boolean) => void;
};

export const ContactModalHeaderControl: React.FC<Props> = (props) => {
  const { contact, setOpen } = props;

  const { removeContact, updateContact } = useContactBook();

  const { isInGroup, handleContactGroups } = useGroups();

  const handleRemove = () => {
    removeContact?.(contact._id);
    setOpen(false);
  };

  const handleFavGroup = () => {
    const groups = handleContactGroups?.(contact.groups || "", "Избранное");
    updateContact?.({ ...contact, groups: groups || null });
  };

  return (
    <div className={styles.control}>
      {isInGroup?.(contact.groups || "", "Избранное") ? (
        <FilledFavoriteIcon
          onClick={() => handleFavGroup()}
          fill={"#ff0011"}
          title="Убрать из избранного"
        />
      ) : (
        <FavoriteIcon
          onClick={() => handleFavGroup()}
          fill={"#feacef"}
          title="Добавить в избранное"
        />
      )}
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
