import type { ModalProps } from "antd";

import { Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
// import CloseIcon from "@/assets/svgs/close-icon.svg";
import { CloseOutlined } from "@ant-design/icons";
interface Props {
  onHide?: () => void;
  modalProps?: ModalProps;
}

const useModal = ({ onHide, modalProps: _modalProps }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalWidth, setModalWidth] = useState<number | string>("520px"); // Default modal width
  const [modalProps, setModalProps] = useState<ModalProps>(_modalProps ?? {});
  const [modalContentStyleTw, setModalContentStyleTw] = useState<string>("");

  useEffect(() => {
    if (_modalProps) {
      setModalProps(_modalProps);
    } else {
      setModalProps({});
    }
  }, []);

  const showModal = useCallback(
    ({
      content,
      width = "1200px",
      modalProps,
      modalContentStyleTw,
    }: {
      content: React.ReactNode;
      width?: number | string;
      modalProps?: ModalProps;
      modalContentStyleTw?: string;
    }) => {
      setModalContent(content);
      setModalWidth(width);
      setIsModalOpen(true);
      modalProps && setModalProps((prev) => ({ ...modalProps }));
      modalContentStyleTw && setModalContentStyleTw(modalContentStyleTw);
    },
    []
  );

  const hideModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
    onHide?.();
  }, []);

  const hideAllModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
    Modal.destroyAll();
  }, []);

  const renderModal = () => (
    <Modal
      open={isModalOpen}
      onCancel={hideModal}
      width={modalWidth}
      className={`m-auto pb-0 ${modalContentStyleTw}`}
      {...(modalProps ?? {})}
      destroyOnHidden
      closeIcon={<CloseOutlined />}
    >
      {modalContent}
    </Modal>
  );

  return { showModal, hideModal, renderModal, hideAllModal };
};

export default useModal;
