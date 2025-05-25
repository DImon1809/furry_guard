import React from "react";

import { ModalContext } from "@/components/Modals/ModalProvider";

export const useModal = () => {
  const { openModal } = React.useContext(ModalContext);

  return openModal;
};
