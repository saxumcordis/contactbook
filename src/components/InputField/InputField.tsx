import React from "react";
import "antd/es/input/style/index.css";

import { Input } from "antd";
import { InputProps } from "antd/lib/input";

export const InputField: React.FC<InputProps> = ({
  className,
  suffix,
  prefix,
  placeholder,
  onChange,
}) => {
  return (
    <Input
      className={className}
      suffix={suffix}
      prefix={prefix}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
