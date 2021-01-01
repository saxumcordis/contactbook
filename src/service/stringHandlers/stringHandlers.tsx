import React from "react";

export const handleLongString = (str: string | null) => {
  if (str && str.length > 12) return str[0] + str.slice(1, 9) + "...";
  return str;
};

export const handleLongStringWithTip = (str: string | null) => {
  if (str && str.length > 12)
    return <span title={str}>{str[0] + str.slice(1, 9) + "..."}</span>;
  return str;
};

export const isHavingSubstring = (str: string, substr: string) => {
  const regExp = new RegExp(substr, "gi");

  return regExp.test(str);
};
