import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

interface UploadNationalIdProps {
  innerProps?: UploadProps;
}

const UploadNationalId: React.FC<UploadNationalIdProps> = ({ innerProps }) => {
  const defaultProps: UploadProps = {
    maxCount: 1,
    listType: "picture",
    accept: "image/*,.pdf",
    beforeUpload: (file) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        console.error("File must be smaller than 2MB!");
      }
      return isLt2M || Upload.LIST_IGNORE;
    },
    ...innerProps,
  };

  return (
    <Upload {...defaultProps}>
      <Button icon={<UploadOutlined />}>Upload National ID</Button>
    </Upload>
  );
};

export default UploadNationalId;
