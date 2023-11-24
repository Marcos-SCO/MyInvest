'use client';

import { useEffect } from 'react';

// import { useRouter } from 'next/router';
import { useRouter, useSearchParams } from 'next/navigation';
import { useModal } from '../providers/modalProviders';

export function UrlChangeListener() {
  const userSearchParams = useSearchParams();

  const { modalStates, closeModalHandler } = useModal();

  useEffect(() => {

    if (modalStates) {
      Object.keys(modalStates).forEach((modalId) => {
        closeModalHandler(modalId);
      });
    }

  }, [userSearchParams]);

  // 👇 You can put a progress bar or something here
  return <></>;
}