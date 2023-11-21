'use client';

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  if (typeof window == 'undefined') return;

  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export default function useWindowDimensions() {
  if (typeof window == 'undefined') return;

  const [windowDimensions, setWindowDimensions] =
    useState(getWindowDimensions());

  useEffect(() => {

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.document.addEventListener('resize', handleResize);

    return () => window.document.removeEventListener('resize', handleResize);

  }, []);

  return windowDimensions;
}