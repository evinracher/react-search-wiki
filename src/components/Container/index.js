import React from 'react';
import { useSearch, useDebounce, useSearchForm } from '../../hooks';

const Container = ({children}) => {
  const { searchValue, onSearchChange } = useSearchForm();
  const { articles } = useSearch(useDebounce(searchValue, 500));

  return children({articles, searchValue, onSearchChange}); // Defining props for the children
};

export default Container;