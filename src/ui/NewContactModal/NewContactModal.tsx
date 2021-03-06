import React, { useMemo, useState } from "react";

import { Form, Formik } from "formik";
import styles from "../ContactModal/ContactModal.module.scss";
import { BaseModal } from "../../components/BaseModal";
import { NewContactModalBody, NewContactModalFooter } from "./components";
import { ContactFormValues } from "../../types/ContactForm";
import { useNewContactModal } from "../../service/contexts/useNewContactModal";
import { useContactBook } from "../../service/contexts";
import * as Yup from "yup";

export const NewContactModal: React.FC = () => {
  const { isOpen, close } = useNewContactModal();

  const [avatar, setAvatar] = useState<string>("default");

  const { addContact, lastId } = useContactBook();

  const initialValues = useMemo<ContactFormValues>(() => {
    return {
      name: "",
      surname: "",
      fatherName: "",
      avatar: "",
      birth: "",
      groups: "",
      country: "",
      city: "",
      street: "",
      house: "",
      flat: "",
      postalCode: "",
      mobile: "",
      work: "",
      home: "",
    };
  }, []);

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
  const handleSubmit = (values: ContactFormValues) => {
    const contact = {
      _id: lastId! + 1,
      name: values?.name,
      surname: values?.surname,
      fatherName: values?.fatherName,
      birth: values?.birth,
      avatar: values?.avatar || "default",
      groups: values?.groups,
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
    addContact?.(contact);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
        close();
      }}
    >
      {({
        dirty,
        resetForm,
        errors,
        setFieldTouched,
        setFieldValue,
        values,
      }) => (
        <Form className={styles.form}>
          <BaseModal
            isOpen={isOpen || false}
            setOpen={() => close()}
            className={styles.contactModal}
            title="Новый контакт"
            body={
              <NewContactModalBody
                errors={errors}
                avatar={avatar}
                setAvatar={setAvatar}
                changeAvatar={(avatar: string) => {
                  setFieldValue("avatar", avatar);
                  setFieldTouched("avatar");
                }}
                contactGroups={values.groups}
                changeGroups={(groups: string) => {
                  setFieldValue("groups", groups);
                  setFieldTouched("groups");
                }}
              />
            }
            footer={
              <NewContactModalFooter
                errors={errors}
                dirty={dirty}
                handleCancelButton={() => {
                  setAvatar("default");
                  resetForm();
                }}
              />
            }
            closable={true}
          />
        </Form>
      )}
    </Formik>
  );
};
