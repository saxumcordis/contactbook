import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import styles from "./DropZone.module.scss";

export const DropZone: React.FC = ({ children }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsText(acceptedFiles[0]);
    reader.addEventListener("load", ({ target }) =>
      console.log(target?.result)
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={styles.container} {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
