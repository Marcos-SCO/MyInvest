'use client';

import { useState } from "react";

import SearchBarItem from "./SearchBarItem";
import SearchResultsList from "./SearchResultList";


function SearchBar() {
  const [results, setResults] = useState([]);

  return (
    <>
      <div className="search-bar-container">
        <SearchBarItem setResults={setResults} />

        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </>
  );
}

export default SearchBar;