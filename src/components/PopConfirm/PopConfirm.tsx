import React, { useCallback, useState } from "react";

import styles from "./PopConfirm.module.scss";
import classNames from "classnames";

import { BaseModal } from "../BaseModal";
import { Button } from "../Button";
import { PopConfirmProps } from "../../types/Components";

export const PopConfirm: React.FC<PopConfirmProps> = (props) => {
  const {
    title,
    okText,
    cancelText,
    className,
    children,
    onConfirm,
    onCancel,
    childrenClass,
  } = props;

  const [isOpen, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), [setOpen]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    onCancel?.();
  }, [onCancel]);

  const handleConfirm = useCallback(() => {
    setOpen(false);
    onConfirm?.();
  }, [onConfirm]);

  if (isOpen)
    return (
      <div className={childrenClass}>
        {children}
        <BaseModal
          title={title}
          isOpen={isOpen}
          footer={
            <div className={styles.footer}>
              <Button onClick={handleCancel}>{cancelText}</Button>
              <Button onClick={handleConfirm}>{okText}</Button>
            </div>
          }
          setOpen={setOpen}
          className={classNames(styles.popConfirm, className)}
        />
      </div>
    );
  else
    return (
      <div
        onClick={() => !isOpen && handleOpen()}
        className={classNames(styles.center, childrenClass)}
      >
        {children}
      </div>
    );
};
