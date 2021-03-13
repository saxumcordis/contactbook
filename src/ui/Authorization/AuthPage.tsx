import React from "react";
import { Redirect, Switch } from "react-router-dom";

import styles from "./AuthPage.module.scss";
import {
  AuthStatus,
  defaultAuthData,
  useAuthData,
} from "../../service/contexts/useAuth";
import { AuthPageFooter } from "./components";
import { AuthPageBody } from "./components/AuthPageBody";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../service/contexts/useUser";

export const AuthPage = () => {
  const { authMode, authStatus, confirmData } = useAuthData();
  const { user } = useUser();

  const validationSchema = Yup.object().shape({
    login: Yup.string().required("Обязательное поле"),
    phone: Yup.string().matches(/^[0-9]{9,12}$/, { message: "9-12 цифр" }),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: "Минимум 8 символов. Хотя бы 1 буква и цифра",
    }),
    email: Yup.string().email("Не корректный почтовый ящик"),
  });

  return (
    <div className={styles.container}>
      <Switch>
        <Redirect from="/authorization" to={"/authorization/" + authMode} />
        {user && authStatus === AuthStatus.LOGGED && (
          <Redirect from="/authorization" to={"/"} />
        )}
      </Switch>
      <div className={styles.form}>
        <Formik
          initialValues={defaultAuthData}
          onSubmit={(values) => confirmData!(values)}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className={styles.formWrapper}>
              <AuthPageBody />
              <AuthPageFooter />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
