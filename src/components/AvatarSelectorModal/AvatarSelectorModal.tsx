import React from "react";
import { BaseModal } from "../BaseModal";

import styles from "./AvatarSelectorModal.module.scss";
import {
  AvatarSelectorModalBody,
  AvatarSelectorModalFooter,
} from "./components";
import { Formik, Form } from "formik";

type Props = {
  avatar: string;
  setAvatar: (value: string) => void;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  changeAvatar: (avatar: string) => void;
};

export const AvatarSelectorModal: React.FC<Props> = (props) => {
  const { avatar, setAvatar, isOpen, setOpen, changeAvatar } = props;

  const initialValues = { activeAvatar: avatar };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      render={({ dirty, values, resetForm }) => (
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
