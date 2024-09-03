import React, { useState } from 'react';
import Icon from '../../../../components/icon/Icon';

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  return (
    <div className="search-bar d-flex align-items-center">
      <Icon icon="CustomFilter" size={'2x'} />
      <input
        className="flex-grow-1"
        type="text"
        placeholder="Filter"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
