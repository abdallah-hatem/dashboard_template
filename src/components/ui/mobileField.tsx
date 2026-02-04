import React from "react";
import { Input } from "antd";
import type { InputProps } from "antd";

interface MobileFieldProps extends InputProps {
  countryCode?: string;
}

const MobileField: React.FC<MobileFieldProps> = ({
  countryCode = "+1",
  ...props
}) => {
  return (
    <Input
      addonBefore={countryCode}
      placeholder="Enter phone number"
      type="tel"
      {...props}
    />
  );
};

export default MobileField;
