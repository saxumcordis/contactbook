import React, { useCallback } from "react";
import { ReactComponent as CloseIcon } from "./assets/close.svg";
import classNames from "classnames";
import styles from "./BaseModal.module.scss";
import { BaseModalProps } from "../../types/Components";

type Props = BaseModalProps;

export const BaseModal: React.FC<Props> = (props) => {
  const {
    closable,
    isOpen,
    setOpen,
    className,
    title,
    body,
    footer,
    control,
    controlClass,
  } = props;

  const classes = classNames(styles.modal, className);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const closeIcon = (
    <CloseIcon
      fill={"#feacef"}
      className={styles.close}
      onClick={handleClose}
    />
  );

  return isOpen ? (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.content}>
        <div className={classes}>
          <div className={styles.header}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {closable && !control && closeIcon}
            {control && (
              <div className={controlClass}>
                {control} {closeIcon}
              </div>
            )}
          </div>
          <div className={styles.body}>{body}</div>
          <div className={styles.footer}>{footer}</div>
        </div>
      </div>
    </div>
  ) : null;
};
