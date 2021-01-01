import React from "react";

export const handleLongString = (str: string | null, limit: number) => {
  if (str && str.length > limit) return str.slice(0, limit - 3) + "...";
  return str;
};

export const handleLongStringWithTip = (str: string | null, limit: number) => {
  if (str && str.length > limit)
    return <span title={str}>{str.slice(0, limit - 1) + "..."}</span>;
  return str;
};

export const isHavingSubstring = (str: string, substr: string) => {
  const regExp = new RegExp(substr, "gi");

  return regExp.test(str);
};
