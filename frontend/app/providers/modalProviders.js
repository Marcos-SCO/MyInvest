'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modalStates, setModalStates] = useState({});

  const router = useRouter();

  const openModalHandler = (modalId) => {
    const body = document.querySelector('body');

    setModalStates((prevStates) => ({
      ...prevStates,
      [modalId]: true,
    }));

    body.classList.add('modal-open');

  };

  const closeModalHandler = (modalId) => {
    const body = document.querySelector('body');
    setModalStates((prevStates) => ({
      ...prevStates,
      [modalId]: false,
    }));

    body.classList.remove('modal-open');
  };

  const isModalOpen = (modalId) => {
    return Boolean(modalStates[modalId]);
  };

  useEffect(() => {
    // Close all modals when the route changes
    Object.keys(modalStates).forEach((modalId) => {
      closeModalHandler(modalId);
    });
  }, [router.asPath]);

  return (
    <ModalContext.Provider value={{ modalStates, openModalHandler, closeModalHandler, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};