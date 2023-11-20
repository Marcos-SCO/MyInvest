'use client'

import dynamic from 'next/dynamic';
import React from 'react';

import { useEffect } from 'react';

const useRouter = dynamic(() => import('next/router'), { ssr: false });

import { useSearchParams } from 'next/navigation';

export default function ChangePageAttributes({ ...props }) {
  const { pageName = false } = props;

  const router = useRouter();
  const userSearchParams = useSearchParams();

  useEffect(() => {
    const dataPageAttribute =
      document.body.getAttribute('data-page');

    const isSameAtribute = dataPageAttribute == pageName;
    const updatePageName = pageName && !isSameAtribute;

    if (updatePageName) {
      document.body.classList
      .remove(`${dataPageAttribute}`);
      
      const pageValue = `page-${pageName}`;
      
      document.body.classList.add(pageValue);
      document.body.setAttribute('data-page', pageValue);
    }

  }, [userSearchParams, pageName]);

  return <></>
}
