import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

import Header from './Header';
import SearchBar from './SearchBar';
import CharacterTable from './CharacterTable';
import Footer from './Footer';

function App() {
  const [searchString, setSearchString] = useState('');
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const baseUrl = 'https://swapi.dev/api/people';

  const getPage = (pageNum) => {
    setLoading(true);
    axios.get(`${baseUrl}?page=${pageNum}`)
      .then(response => {
        setCharacters(response.data.results);
      })
      .then(() => setLoading(false))
      .catch(err => console.error(err));
  }

  useEffect(() => getPage(page), [page]);

  const searchCharacters = (e) => {
    if (!searchString) return;
    setLoading(true);
    axios.get(`${baseUrl}/?search=${searchString}`)
      .then(response => {
        setCharacters(response.data.results);
      })
      .then(() => setLoading(false))
      .catch(err => console.error(err));
    e.preventDefault();
  }

  const updateSearchBar = (e) => {
    setSearchString(e.target.value);
  }

  const resetSearchBar = (e) => {
    setSearchString('');
    getPage(page);
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
        page={page}
        isLoading={loading}
      />
      <Footer />
    </Container>
  );
}

export default App;
