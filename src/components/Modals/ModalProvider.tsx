import React, { useCallback } from "react";

import { cn } from "@/lib/utils";

import { AddPetModal } from "./AddPetModal";

import styles from "./style.module.scss";

const modals = {
  addPet: AddPetModal,
};

type ModalsType = keyof typeof modals;

type OpenModal = <T extends ModalsType>(type: T) => void;

type ModalProviderState<T extends ModalsType | null> = {
  type: T;
  isOpen: boolean;
};

// Todo уточнить тип
export const ModalContext = React.createContext<{
  modalType: ModalsType | null;
  openModal: OpenModal;
}>({
  modalType: null,
  openModal: () => undefined,
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState<ModalProviderState<ModalsType | null>>({
    type: null,
    isOpen: false,
  });

  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  const Component = state.type ? (modals as Record<string, React.ElementType>)[state.type] : null;

  const openModal: OpenModal = React.useCallback(
    type => {
      setState({
        type,
        isOpen: true,
      });
    },
    [setState],
  );

  const closeModal = useCallback(() => {
    setState({ type: null, isOpen: false });
  }, [setState]);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    document.addEventListener("resize", handleResize);

    return () => document.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (windowWidth <= 640) {
      return setIsMobile(true);
    }

    setIsMobile(false);
  }, [windowWidth]);

  return (
    <ModalContext.Provider value={{ modalType: state.type, openModal }}>
      {state.isOpen && Component && (
        <Component
          closeModal={closeModal}
          className={cn(styles.modal, isMobile && styles.mobile)}
        />
      )}
      {state.isOpen && !isMobile && (
        <div className={styles.global__wrapper} onClick={() => closeModal()}></div>
      )}
      {!(isMobile && state.isOpen) && <main>{children}</main>}
    </ModalContext.Provider>
  );
};
