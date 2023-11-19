"use client";

import React, { useEffect } from 'react';
import MicroModal from 'micromodal';

export default function Modal({ children }) {

  useEffect(() => {
    // Initialize micromodal
    MicroModal.init({
      awaitCloseAnimation: true,
      onShow: (modal) => console.log(`${modal.id} is shown`),
      onClose: (modal) => console.log(`${modal.id} is hidden`),
    });

    // Clean up the modal when the component is unmounted
    return () => {
      // MicroModal.closeAll();
    };
  }, []);

  return (
    <div className="modal micromodal-slide" id="modal-1" aria-hidden="true">

      <div className="modal__overlay" tabindex="-1" data-micromodal-close>

        <main className="modal-main-content modal__content" id="modal-1-content">

          <header className="modal__header">
            <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
          </header>

          <div className="modal-children-container">
            {children}
          </div>

        </main>

      </div>

    </div>

  );
}
