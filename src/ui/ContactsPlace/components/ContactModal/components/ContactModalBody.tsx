import React from "react";
import { Field } from "formik";

import styles from "./ContactModalBody.module.scss";
import { FieldGroup } from "../../../../../components/FieldGroup";
import classNames from "classnames";
import {Avatar} from "../../../../../components/Avatar";

export const ContactModalBody = () => {
  return (
    <div className={styles.form}>
      <FieldGroup
        className={classNames(styles.headingGroup, styles.noPaddingSide)}
      >
        <FieldGroup
          layout="column"
          className={classNames(
            styles.shortWidth,
            styles.noPadding,
            styles.inputStyle,
            styles.noBorderBottom
          )}
        >
          <Field id="name" name="name" placeholder="Имя" />
          <Field id="surname" name="surname" placeholder="Фамилия" />
          <Field id="fatherName" name="fatherName" placeholder="Отчество" />
        </FieldGroup>
          <Avatar avatar={"default"} size={"default"} className={styles.avatar}/>
      </FieldGroup>
      <FieldGroup
        className={classNames(
          styles.noPaddingSide,
          styles.shortWidth,
          styles.inputStyle
        )}
      >
        <Field id="mobile" name="mobile" placeholder="Моб.телефон" />
        <Field id="home" name="home" placeholder="Дом.телефон" />
        <Field id="work" name="work" placeholder="Моб.телефон" />
      </FieldGroup>
    </div>
  );
};
