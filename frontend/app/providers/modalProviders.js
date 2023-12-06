'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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

    setTimeout(() => {
      body.classList.remove('modal-open');
    }, 200)
  };

  const isModalOpen = (modalId) => {
    return Boolean(modalStates[modalId]);
  };
 
  return (
    <ModalContext.Provider value={{ modalStates, openModalHandler, closeModalHandler, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};