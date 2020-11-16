import React from 'react';
import Container from '../../components/Container';
import Autocomplete from '../../components/Autocomplete';

const Home = () => {
  return (
    <Container>
      {({ articles, searchValue, onSearchChange }) => (
        <Autocomplete
          articles={articles}
          onSearchChange={onSearchChange}
          searchValue={searchValue}
        />
      )}
    </Container>
  );
};

export default Home;