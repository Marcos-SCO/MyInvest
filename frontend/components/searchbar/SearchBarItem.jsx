'use client';

import fetchAssets from 'app/api/assets/fetchAssets';
import DisplaySvg from 'app/helpers/svg/DisplaySvg';
import useDebounce from 'app/hooks/useDebounce';

import React, { useEffect, useState } from 'react';

export default function SearchBarItem({ setResults }) {
  const [input, setInput] = useState("");

  const debounceValue = useDebounce(input, 500);

  async function fetchData(value) {
    setResults([{ feedback: `Carregando...` }]);

    const filteredResults = await fetchAssets(value);

    const haveFilteredResults = filteredResults?.length;

    if (!haveFilteredResults) {
      setResults([{ feedback: `Nenhum resultado para : ${value}` }]);
      return;
    }

    setResults(filteredResults);
  }

  useEffect(() => {
    if (!input) return setResults([]);

    fetchData(debounceValue);

  }, [debounceValue]);


  return (
    <div className='search-inputs-container input-wrapper flex justify-center'>
      <label htmlFor="searchInput" className='cursor-pointer'>
        <DisplaySvg name="magnifyingGlass" />
      </label>
      <input className='p-1' id="searchInput" autoComplete="off" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Procure ativos...' />
    </div>
  )
}

