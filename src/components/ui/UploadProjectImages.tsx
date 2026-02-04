import React from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Dragger } = Upload;

interface UploadProjectImagesProps {
  innerProps?: UploadProps;
}

const UploadProjectImages: React.FC<UploadProjectImagesProps> = ({
  innerProps,
}) => {
  const defaultProps: UploadProps = {
    name: "file",
    multiple: true,
    listType: "picture-card",
    accept: "image/*",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        console.error("You can only upload image files!");
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        console.error("Image must be smaller than 5MB!");
      }
      return (isImage && isLt5M) || Upload.LIST_IGNORE;
    },
    ...innerProps,
  };

  return (
    <Dragger {...defaultProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag files to this area to upload</p>
      <p className="ant-upload-hint">
        Support for single or bulk upload. Upload project images here.
      </p>
    </Dragger>
  );
};

export default UploadProjectImages;
