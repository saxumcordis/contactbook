import React, { useCallback, useState } from "react";

import styles from "./PopConfirm.module.scss";
import classNames from "classnames";

import { BaseModal } from "../BaseModal";
import { Button } from "../Button";

type Props = {
  title?: string;
  okText?: string;
  cancelText?: string;
  className?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const PopConfirm: React.FC<Props> = (props) => {
  const { title, okText, cancelText, className, children, onConfirm, onCancel } = props;

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
      <>
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
      </>
    );
  else return <div onClick={() => !isOpen && handleOpen()}>{children}</div>;
};
