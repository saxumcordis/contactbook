import React, { useCallback } from "react";
import { Contact } from "../../../../types/Contact";
import { BaseModal } from "../../../../components/BaseModal";
import { BaseModalProps } from "../../../../types/Components";
import * as Yup from "yup";

import styles from "./ContactModal.module.scss";
import { ContactModalFooter, ContactModalHeader } from "./components";
import { ContactModalBody } from "./components";
import { Form, Formik } from "formik";
import { ContactFormValues } from "../../../../types/ContactForm";
import { useContactBook } from "../../../../service/contexts";

type Props = Contact & BaseModalProps;

export const ContactModal: React.FC<Props> = (props) => {
  const { isOpen, setOpen, contact } = props;

  const { updateContact } = useContactBook();

  const initialValues = useCallback(
    () => ({
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
    }),
    [contact]
  );

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
    mobile: Yup.string().matches(/^[0-9]{9,12}$/, { message: "9-12 цифр" }),
    work: Yup.string().matches(/^[0-9]{9,12}$/, { message: "9-12 цифр" }),
    home: Yup.string().matches(/^[0-9]{9,12}$/, { message: "9-12 цифр" }),
    postalCode: Yup.string().matches(/^[0-9]{6}$/, { message: "6 цифр" }),
    birth: Yup.string().matches(
      /^((?:0[0-9])|(?:[1-2][0-9])|(?:3[0-1]))\.((?:0[1-9])|(?:1[0-2]))\.(\d{4})$/,
      { message: "д.м.г" }
    ),
  });

  const handleUpdate = (values: ContactFormValues) => {
    const updatedContact = {
      _id: contact._id,
      name: values?.name,
      surname: values?.surname,
      fatherName: values?.fatherName,
      birth: values?.birth,
      avatar: values?.avatar,
      group: values?.group,
      data: {
        phone: {
          mobile: values.mobile,
          work: values.work,
          home: values.home,
        },
        address: {
          country: values.country,
          city: values.city,
          street: values.street,
          house: values.house,
          flat: values.flat,
          postalCode: values.postalCode,
        },
      },
    };

    updateContact?.(updatedContact);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues()}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        handleUpdate(values);
      }}
      render={({ dirty, resetForm, errors }) => (
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
            body={<ContactModalBody errors={errors} />}
            footer={
              <ContactModalFooter
                contact={contact}
                dirty={dirty}
                handleCancelButton={resetForm}
                errors={errors}
              />
            }
            closable={true}
          />
        </Form>
      )}
    />
  );
};
