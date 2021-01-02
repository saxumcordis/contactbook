import React, { useCallback } from "react";
import { Button } from "../../Button";

import styles from "./AvatarSelectorModalFooter.module.scss";

type Props = {
  onSubmit: () => void;
  handleCancelButton: () => void;
};

export const AvatarSelectorModalFooter: React.FC<Props> = (props) => {
  const { handleCancelButton, onSubmit } = props;

  const handleCancel = useCallback(() => {
    handleCancelButton();
  }, [handleCancelButton]);

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className={styles.avatarSelectorFooter}>
      <Button onClick={handleCancel}>Отменить</Button>
      <Button onClick={handleSubmit}>Выбрать</Button>
    </div>
  );
};
