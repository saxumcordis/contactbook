import React from "react";
import { BaseModal } from "../BaseModal";

import styles from "./AvatarSelectorModal.module.scss";
import {
  AvatarSelectorModalBody,
  AvatarSelectorModalFooter,
} from "./components";
import { Formik, Form } from "formik";
import { AvatarSelectorProps } from "../../types/Components";

export const AvatarSelectorModal: React.FC<AvatarSelectorProps> = (props) => {
  const { avatar, setAvatar, isOpen, setOpen, changeAvatar } = props;

  const initialValues = { activeAvatar: avatar };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      render={({ values, resetForm }) => (
        <Form>
          <BaseModal
            className={styles.avatarSelectorModal}
            isOpen={isOpen}
            setOpen={setOpen}
            title="Выберите аватар"
            body={<AvatarSelectorModalBody />}
            footer={
              <AvatarSelectorModalFooter
                onSubmit={() => {
                  setAvatar(values.activeAvatar);
                  setOpen(false);
                  changeAvatar(values.activeAvatar);
                }}
                handleCancelButton={() => {
                  resetForm();
                  setOpen(false);
                }}
              />
            }
          />
        </Form>
      )}
    />
  );
};
