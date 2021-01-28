import React, { useCallback } from "react";

import { ReactComponent as DeleteIcon } from "../../../assets/images/delete.svg";
import { ReactComponent as FavoriteIcon } from "../../../assets/images/favorite.svg";
import { ReactComponent as FilledFavoriteIcon } from "../../../assets/images/filledFavorite.svg";

import styles from "./ContactModalHeader.module.scss";
import { useContactBook } from "../../../service/contexts";
import { PopConfirm } from "../../../components/PopConfirm";
import { Contact_person } from "../../../types/Contact";
import { useGroups } from "../../../service/contexts/useGroups";
import { ContactFormValues } from "../../../types/ContactForm";

type Props = {
  contact: Contact_person;
  setOpen: (value: boolean) => void;
  formValues: ContactFormValues;
  changeGroups: (groups: string) => void;
  dirty: boolean;
};

export const ContactModalHeaderControl: React.FC<Props> = (props) => {
  const { contact, setOpen, formValues, changeGroups, dirty } = props;

  const { removeContact, updateContact } = useContactBook();

  const { isInGroup, addGroupToGroups, removeGroupFromGroups } = useGroups();

  const handleRemove = () => {
    removeContact?.(contact._id);
    setOpen(false);
  };

  const handleFavStatus = useCallback(() => {
    const formStatus = isInGroup?.(formValues.groups, "1");
    const contactStatus = isInGroup?.(contact.groups || "", "1");

    const isFormWaiting =
      (formStatus && !contactStatus) || (!formStatus && contactStatus);

    return isFormWaiting ? "WAIT" : contactStatus ? "RM" : "ADD";
  }, [contact, formValues, isInGroup]);

  const favStatus = handleFavStatus();

  const handleAddGroup = useCallback(() => {
    const groups = addGroupToGroups?.(contact.groups || "", "1");
    if (!dirty) {
      updateContact?.({ ...contact, groups: groups || null });
    } else {
      changeGroups(groups || "");
    }
  }, [addGroupToGroups, dirty, updateContact, changeGroups, contact]);

  const handleRemoveGroup = useCallback(() => {
    const groups = removeGroupFromGroups?.(contact.groups || "", "1");
    if (!dirty) {
      updateContact?.({ ...contact, groups: groups || null });
    } else {
      changeGroups(groups || "");
    }
  }, [removeGroupFromGroups, dirty, updateContact, changeGroups, contact]);

  const handleFavWaiting = useCallback(() => {
    const groups = addGroupToGroups?.(formValues.groups || "", "1");
    if (!dirty) {
      updateContact?.({ ...contact, groups: groups || null });
    }
    changeGroups(groups || "");
  }, [
    addGroupToGroups,
    formValues,
    dirty,
    changeGroups,
    contact,
    updateContact,
  ]);

  return (
    <div className={styles.control}>
      {favStatus === "RM" ? (
        <FilledFavoriteIcon
          onClick={handleRemoveGroup}
          fill={"#ff0011"}
          title="Убрать из избранного"
        />
      ) : favStatus === "ADD" ? (
        <FavoriteIcon
          onClick={handleAddGroup}
          fill={"#feacef"}
          title="Добавить в избранное"
        />
      ) : (
        <FavoriteIcon
          onClick={handleFavWaiting}
          fill={"white"}
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
