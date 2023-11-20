'use client';

import React, { useState } from 'react';

import DisplaySvg from 'app/helpers/svg/DisplaySvg';

import { useModal } from 'app/providers/modalProviders';

export default function SearchModalButton() {
  const { openModalHandler } = useModal();

  return (
    <button className="search-button" onClick={() => openModalHandler('search-bar')}>

      <div className="button-inner-label">
        <DisplaySvg name="magnifyingGlass" width="23" height="23" />
        <label>Procurar ativos...</label>
      </div>

      <kbd>/</kbd>
    </button>
  )
}
