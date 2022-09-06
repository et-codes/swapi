import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

import Header from './Header';
import SearchBar from './SearchBar';
import CharacterTable from './CharacterTable';
import Footer from './Footer';

const App = () => {
  const baseUrl = 'https://swapi.dev/api/people/';
  const [searchString, setSearchString] = useState('');
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(`${baseUrl}?page=1`);
  const [nextPage, setNextPage] = useState(`${baseUrl}?page=2`);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = (url) => {
    setLoading(true);
    axios.get(url)
      .then(response => {
        setCharacters(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .then(() => setLoading(false))
      .catch(err => console.error(err));
  }

  const getPage = () => {
    getData(page);
  }

  useEffect(getPage, [page]);

  const searchCharacters = (e) => {
    if (!searchString) return;
    getData(`${baseUrl}/?search=${searchString}`);
    e.preventDefault();
  }

  const updateSearchBar = (e) => {
    setSearchString(e.target.value);
  }

  const resetSearchBar = (e) => {
    setSearchString('');
    setPage(`${baseUrl}?page=1`);
  }

  const getNextPage = (e) => {
    if (nextPage) setPage(nextPage);
  }

  const getPrevPage = (e) => {
    if (prevPage) setPage(prevPage);
  }

  return (
    <Container>
      <Header />
      <SearchBar
        handleSubmit={searchCharacters}
        handleChange={updateSearchBar}
        handleReset={resetSearchBar}
        searchValue={searchString}
      />
      <CharacterTable
        chars={characters}
        page={page.match(/page=(\d*)/)[1]}
        isLoading={loading}
        nextPage={nextPage && getNextPage}
        prevPage={prevPage && getPrevPage}
      />
      <Footer />
    </Container>
  );
}

export default App;
