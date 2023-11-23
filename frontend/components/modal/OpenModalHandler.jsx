'use client';

import React, { useState } from 'react';

import { useModal } from 'app/providers/modalProviders';

export default function OpenModalContainer({ modalId, children, ...props }) {
  const { openModalHandler } = useModal();

  const className = ' ' + props?.className;

  return (
    <button className={`openModalContainer${className}`} onClick={() => openModalHandler(modalId)}>
      {children}
    </button>
  )
}
