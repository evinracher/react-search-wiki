import React from 'react';
import Container from '../../components/Container';
import Autocomplete from '../../components/Autocomplete';
import './styles.scss';

const Home = () => {
  return (
    <div className="home-page-container">
      <img src="./logo.png" alt="logo"/>
      <Container>
        {({ articles, searchValue, onSearchChange }) => (
          <Autocomplete
            articles={articles}
            onSearchChange={onSearchChange}
            searchValue={searchValue}
          />
        )}
      </Container>
    </div>
  );
};

export default Home;