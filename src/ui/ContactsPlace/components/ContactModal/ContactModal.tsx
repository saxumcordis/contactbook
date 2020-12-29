import React, { useMemo } from "react";
import { Contact } from "../../../../types/Contact";
import { BaseModal } from "../../../../components/BaseModal";
import { BaseModalProps } from "../../../../types/Components";

import styles from "./ContactModal.module.scss";
import { ContactModalFooter, ContactModalHeader } from "./components";
import { ContactModalBody } from "./components";
import { Form, Formik } from "formik";
import { ContactFormValues } from "../../../../types/ContactForm";
import {useContactBook} from "../../../../service/contexts";

type Props = Contact & BaseModalProps;

export const ContactModal: React.FC<Props> = (props) => {
  const { isOpen, setOpen, contact } = props;

  const {contactBook} = useContactBook();

  const initialValues = useMemo<ContactFormValues>(() => {
    return {
      name: contact?.name,
      surname: contact?.surname || "",
      fatherName: contact?.fatherName || "",
      avatar: contact.avatar,
      birth: contact?.birth || "",
      group: contact?.group || "",
      country: contact?.data?.address?.country || "",
      city: contact?.data?.address?.city || "",
      street: contact?.data?.address?.street || "",
      house: contact?.data?.address?.house || "",
      flat: contact?.data?.address?.flat || "",
      postalCode: contact?.data?.address?.postalCode || "",
      mobile: contact?.data?.phone?.mobile || "",
      work: contact?.data?.phone?.work || "",
      home: contact?.data?.phone?.home || "",
    };
  }, [contact, isOpen, contactBook]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => console.log(contact)}
      render={({ dirty, resetForm }) => (
        <Form className={styles.form}>
          <BaseModal
            isOpen={isOpen}
            setOpen={setOpen}
            className={styles.contactModal}
            title={
              <ContactModalHeader
                title={contact.name + " " + (contact.surname || "")}
                dirty={dirty}
                id={contact._id}
                setOpen={setOpen}
              />
            }
            body={<ContactModalBody />}
            footer={
              <ContactModalFooter
                contact={contact}
                dirty={dirty}
                handleCancelButton={resetForm}
              />
            }
            closable={true}
          />
        </Form>
      )}
    />
  );
};
