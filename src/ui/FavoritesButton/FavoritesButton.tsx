import React, { useCallback, useEffect, useState } from "react";

import { ReactComponent as FavoriteIcon } from "../../assets/images/favorite.svg";
import { ReactComponent as FilledFavoriteIcon } from "../../assets/images/filledFavorite.svg";

import styles from "./FavoritesButton.module.scss";
import { useGroups } from "../../service/contexts/useGroups";
import classNames from "classnames";

export const FavoritesButton = React.memo(() => {
  const { activeGroups, setActiveGroups } = useGroups();

  const [isActive, setActive] = useState(
    activeGroups?.length && activeGroups[0] === "Избранное"
  );
  useEffect(() => {
    setActive(activeGroups?.length == 1 && activeGroups[0] === "Избранное");
  }, [setActive, activeGroups]);

  const handleClick = useCallback(() => {
    setActiveGroups?.(!isActive ? ["Избранное"] : []);
    setActive(!isActive);
  }, [isActive, setActiveGroups, setActive]);

  return (
    <div className={styles.wrapper}>
      {!isActive ? (
        <FavoriteIcon
          className={styles.button}
          onClick={handleClick}
          title={"Показать избранные контакты"}
        />
      ) : (
        <FilledFavoriteIcon
          className={classNames(styles.button, styles.button_active)}
          onClick={handleClick}
          title={"Показать все контакты"}
        />
      )}
    </div>
  );
});
