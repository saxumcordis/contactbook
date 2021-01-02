import styles from "../../ContactsPlace/components/ContactModal/components/ContactModalBody.module.scss";
import { FieldGroup } from "../../../components/FieldGroup";
import classNames from "classnames";
import {
  LabeledInput,
  LabeledInputWithError,
} from "../../../components/LabeledInput";
import { Avatar } from "../../../components/Avatar";
import React, { useState } from "react";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FormikErrors } from "formik";
import { ContactFormValues } from "../../../types/ContactForm";
import { AvatarSelectorModal } from "../../../components/AvatarSelectorModal";

type Props = {
  errors: FormikErrors<ContactFormValues>;
  avatar: string;
  setAvatar: (value: string) => void;
  changeAvatar: (avatar: string) => void;
};

export const NewContactModalBody: React.FC<Props> = (props) => {
  const { errors, avatar, setAvatar, changeAvatar } = props;

  const [isOpen, setOpen] = useState<boolean>(false);

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
            avatar={avatar}
            size={"default"}
            className={classNames(styles.defaultAvatar, {
              [styles.customAvatar]: avatar !== "default",
            })}
            fillColor={"#55c3e8"}
            onClick={() => setOpen(true)}
          />
          <LabeledInputWithError
            labelStyle={styles.labelStyle}
            id="birth"
            name="birth"
            placeholder="Нет данных"
            labelText="Дата рождения"
            labelError={errors.birth}
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
          labelSuffix={<ExclamationCircleOutlined />}
          labelError={errors?.mobile}
        />
        <LabeledInputWithError
          labelStyle={styles.labelStyle}
          id="home"
          name="home"
          placeholder="Нет данных"
          labelText="Дом.телефон"
          labelSuffix={<ExclamationCircleOutlined />}
          labelError={errors?.home}
        />
        <LabeledInputWithError
          labelStyle={styles.labelStyle}
          id="work"
          name="work"
          placeholder="Нет данных"
          labelText="Раб.телефон"
          labelSuffix={<ExclamationCircleOutlined />}
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
          labelSuffix={<ExclamationCircleOutlined />}
          labelError={errors?.postalCode}
        />
      </FieldGroup>
      <FieldGroup
        className={classNames(
          styles.noPaddingSide,
          styles.inputStyle,
          styles.longWidth
        )}
      >
        <LabeledInput
          labelStyle={styles.labelStyle}
          id="group"
          name="group"
          placeholder="Нет данных"
          labelText="Группа"
        />
      </FieldGroup>
      <AvatarSelectorModal
        avatar={avatar}
        setAvatar={setAvatar}
        isOpen={isOpen}
        setOpen={setOpen}
        changeAvatar={changeAvatar}
      />
    </div>
  );
};
