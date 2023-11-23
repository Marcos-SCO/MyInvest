"use client";

import React, { useEffect } from 'react';

import { Button, Modal } from 'flowbite-react';

import { useModal } from 'app/providers/modalProviders';

export default function ModalContainer({ modalId, modalTitle = false, className = '', children }) {

  const { modalStates, closeModalHandler } = useModal();

  return (
    <Modal dismissible show={modalStates[modalId]} onClose={() => closeModalHandler(modalId)} className={`${modalId}-container ${className} modal-container`}>

      {modalTitle && <Modal.Header>
        {modalTitle}
      </Modal.Header>}

      <Modal.Body className='modal-body'>
        <div className="space-y-6">
          <div className="modal-children-container">
            {children}
          </div>
        </div>
      </Modal.Body>

      {/* <Modal.Footer><Button onClick={() => closeModalHandler(modalId)}>I accept</Button><Button color="gray" onClick={() => closeModalHandler(modalId)}>Decline</Button></Modal.Footer> */}

    </Modal>

  );
}
