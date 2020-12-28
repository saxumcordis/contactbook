import React, { useMemo } from "react";
import { Contact } from "../../../../types/Contact";
import { BaseModal } from "../../../../components/BaseModal";
import { BaseModalProps } from "../../../../types/Components";

import styles from "./ContactModal.module.scss";
import { ContactModalFooter, ContactModalHeader } from "./components";
import { ContactModalBody } from "./components";
import { Form, Formik } from "formik";
import { ContactFormValues } from "../../../../types/ContactForm";

type Props = Contact & BaseModalProps;

export const ContactModal: React.FC<Props> = (props) => {
  const { isOpen, setOpen, contact } = props;
  const initialValues = useMemo<ContactFormValues>(() => {
    return {
      name: contact?.name,
      surname: contact?.surname || null,
      fatherName: contact?.fatherName || null,
      avatar: contact.avatar,
      birth: contact?.birth || null,
      group: contact?.group || null,
      country: contact?.data?.address?.country || null,
      city: contact?.data?.address?.city || null,
      street: contact?.data?.address?.street || null,
      house: contact?.data?.address?.house || null,
      flat: contact?.data?.address?.flat || null,
      postalCode: contact?.data?.address?.postalCode || null,
      mobile: contact?.data?.phone?.mobile || null,
      work: contact?.data?.phone?.work || null,
      home: contact?.data?.phone?.home || null,
    };
  }, [contact]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => console.log("a")}
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
