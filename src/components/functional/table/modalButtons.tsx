import React, { useRef, useState } from "react";
import ButtonComp from "../buttonComp";
import { FormInstance } from "antd";
import { useTranslations } from "next-intl";
import { generalStore } from "@/store/generalStore";

interface Props {
  formRef?: FormInstance;
  hideModal: () => void;
  loadingKey?: string;
}

export default function ModalButtons({
  formRef,
  hideModal,
  loadingKey,
}: Props) {
  const t = useTranslations();
  const loadingRef = useRef(false);
  const [, forceUpdate] = useState({});

  const storeLoadingKey = generalStore((state) => state.general?.loadingKey);
  const loading = Boolean(
    loadingRef.current || (loadingKey && storeLoadingKey === loadingKey)
  );

  const handleSubmit = async () => {
    try {
      await formRef?.validateFields();
      loadingRef.current = true;
      forceUpdate({}); // Force re-render
      formRef?.submit();

      // Reset when store clears
      if (loadingKey) {
        const unsubscribe = generalStore.subscribe((state) => {
          if (
            !state.general?.loadingKey ||
            state.general.loadingKey !== loadingKey
          ) {
            loadingRef.current = false;
            unsubscribe();
          }
        });
      }
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <div className="flex justify-start gap-2">
      <ButtonComp
        onClick={handleSubmit}
        className="w-[160px]"
        loading={loading}
        disabled={loading}
      >
        {t("submit")}
      </ButtonComp>
      <ButtonComp
        onClick={hideModal}
        types="ghost"
        className="!text-black !w-[160px]"
        disabled={loading}
      >
        {t("cancel")}
      </ButtonComp>
    </div>
  );
}
