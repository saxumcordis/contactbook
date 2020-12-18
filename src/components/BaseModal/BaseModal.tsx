import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { CloseOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./BaseModal.module.scss";

type Props = {
  title?: React.ReactNode;
  className?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const BaseModal: React.FC<Props> = ({
  title,
  className,
  body,
  footer,
  ...props
}) => {
  const { closable, isOpen, setOpen } = props;

  const containerRef = useRef<Element>();

  const classes = classNames(styles.modal, className);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }

      if (
        !containerRef!.current!.childNodes[0].contains(
          e.target as HTMLElement
        ) &&
        (e.target as HTMLElement)?.classList.contains(styles.overlay)
      )
        handleClose();
    },
    [isOpen, containerRef, handleClose]
  );

  useLayoutEffect(() => {
    if (isOpen) {
      containerRef.current = document.getElementsByClassName(styles.overlay)[0];
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return isOpen ? (
    <div className={styles.overlay}>
      <div className={classes}>
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {closable && (
            <CloseOutlined className={styles.close} onClick={handleClose} />
          )}
        </div>
        <div className={styles.body}>{body}</div>
        <div className={styles.footer}>{footer}</div>
      </div>
    </div>
  ) : null;
};
