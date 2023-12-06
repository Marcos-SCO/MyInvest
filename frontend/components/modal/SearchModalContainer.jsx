"use client";

import React, { useEffect } from 'react';

import { Button, Modal } from 'flowbite-react';

import { useModal } from 'app/providers/modalProviders';

export default function SearchModalContainer({ modalId, children }) {

  const { modalStates, closeModalHandler } = useModal();

  return (
    <Modal dismissible show={modalStates[modalId]} onClose={() => closeModalHandler(modalId)} className={`${modalId}-container modal-container`}>
      <Modal.Body className="p-0">
        <div className="modal-children-container">
          {children}
        </div>
      </Modal.Body>
    </Modal>

  );
}
