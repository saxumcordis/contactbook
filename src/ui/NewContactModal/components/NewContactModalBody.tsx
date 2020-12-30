import styles from "../../ContactsPlace/components/ContactModal/components/ContactModalBody.module.scss";
import { FieldGroup } from "../../../components/FieldGroup";
import classNames from "classnames";
import {
  LabeledInput,
  LabeledInputWithError,
} from "../../../components/LabeledInput";
import { Avatar } from "../../../components/Avatar";
import React from "react";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FormikErrors } from "formik";
import { ContactFormValues } from "../../../types/ContactForm";

type Props = {
  errors: FormikErrors<ContactFormValues>;
};

export const NewContactModalBody: React.FC<Props> = (props) => {
  const { errors } = props;

  return (
    <div className={styles.form}>
      <FieldGroup
        className={classNames(styles.headingGroup, styles.noPaddingSide)}
      >
        <FieldGroup
          layout="column"
          className={classNames(
            styles.noPadding,
            styles.inputStyle,
            styles.noBorderBottom
          )}
        >
          <LabeledInputWithError
            labelStyle={styles.labelStyle}
            id="name"
            name="name"
            placeholder="Нет данных"
            labelText="Имя"
            labelSuffix={<ExclamationCircleOutlined />}
            labelError={"Обязательное поле"}
          />
          <LabeledInput
            labelStyle={styles.labelStyle}
            id="surname"
            name="surname"
            placeholder="Нет данных"
            labelText="Фамилия"
          />
          <LabeledInput
            labelStyle={styles.labelStyle}
            id="fatherName"
            name="fatherName"
            placeholder="Нет данных"
            labelText="Отчество"
          />
        </FieldGroup>
        <FieldGroup
          layout="column"
          className={classNames(
            styles.noPadding,
            styles.shortWidth,
            styles.inputStyle,
            styles.noBorderBottom,
            styles.headingRight
          )}
        >
          <Avatar
            avatar={"default"}
            size={"default"}
            className={styles.avatar}
          />
          <LabeledInput
            labelStyle={styles.labelStyle}
            id="birth"
            name="birth"
            placeholder="Нет данных"
            labelText="Дата рождения"
          />
        </FieldGroup>
      </FieldGroup>
      <FieldGroup
        className={classNames(
          styles.noPaddingSide,
          styles.shortWidth,
          styles.inputStyle
        )}
      >
        <LabeledInputWithError
          labelStyle={styles.labelStyle}
          id="mobile"
          name="mobile"
          placeholder="Нет данных"
          labelText="Моб.телефон"
          labelError={errors?.mobile}
        />
        <LabeledInputWithError
          labelStyle={styles.labelStyle}
          id="home"
          name="home"
          placeholder="Нет данных"
          labelText="Дом.телефон"
          labelError={errors?.home}
        />
        <LabeledInputWithError
          labelStyle={styles.labelStyle}
          id="work"
          name="work"
          placeholder="Нет данных"
          labelText="Раб.телефон"
          labelError={errors?.work}
        />
      </FieldGroup>
      <FieldGroup
        className={classNames(
          styles.noPaddingSide,
          styles.inputStyle,
          styles.noBorderBottom,
          styles.shortWidth
        )}
      >
        <LabeledInput
          labelStyle={styles.labelStyle}
          id="country"
          name="country"
          placeholder="Нет данных"
          labelText="Страна"
        />
        <LabeledInput
          labelStyle={styles.labelStyle}
          id="city"
          name="city"
          placeholder="Нет данных"
          labelText="Город"
        />
        <LabeledInput
          labelStyle={styles.labelStyle}
          id="street"
          name="street"
          placeholder="Нет данных"
          labelText="Улица"
        />
      </FieldGroup>
      <FieldGroup
        className={classNames(
          styles.noPaddingSide,
          styles.inputStyle,
          styles.shortWidth
        )}
      >
        <LabeledInput
          labelStyle={styles.labelStyle}
          id="house"
          name="house"
          placeholder="Нет данных"
          labelText="№ Дома"
        />
        <LabeledInput
          labelStyle={styles.labelStyle}
          id="flat"
          name="flat"
          placeholder="Нет данных"
          labelText="№ Квартиры"
        />
        <LabeledInputWithError
          labelStyle={styles.labelStyle}
          id="postalCode"
          name="postalCode"
          placeholder="Нет данных"
          labelText="Почтовый индекс"
          labelError={errors?.postalCode}
        />
      </FieldGroup>
    </div>
  );
};
