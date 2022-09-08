import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CharacterTable from './components/CharacterTable';

const App = () => {
  const baseUrl = 'https://swapi.dev/api/people/';
  const [searchString, setSearchString] = useState('');
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(`${baseUrl}?page=1`);
  const [nextPage, setNextPage] = useState(`${baseUrl}?page=2`);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState('');
  const [cache, setCache] = useState(new Map());

  const getData = async (url) => {
    let response;
    if (cache.has(url)) {
      response = cache.get(url);
    } else {
      setLoading(true);
      response = await axios.get(url);
      const newCache = new Map(cache);
      newCache.set(url, response);
      setCache(newCache);
      setLoading(false);
    }
    setCharacters(response.data.results);
    setNextPage(response.data.next);
    setPrevPage(response.data.previous);
    setLastPage(Math.ceil(response.data.count / 10).toString());
  }

  const getPage = () => {
    getData(page);
  }

  useEffect(getPage, [page]);

  const searchCharacters = (e) => {
    if (!searchString) return;
    setPage(`${baseUrl}/?search=${searchString}`);
    e.preventDefault();
  }

  const updateSearchBar = (e) => {
    setSearchString(e.target.value);
  }

  const resetSearchBar = () => {
    setSearchString('');
    setPage(`${baseUrl}?page=1`);
  }

  const getNextPage = () => {
    if (nextPage) setPage(nextPage);
  }

  const getPrevPage = () => {
    if (prevPage) setPage(prevPage);
  }

  const getFirstPage = () => {
    setPage(`${baseUrl}?page=1`);
  }

  const getLastPage = () => {
    setPage(`${baseUrl}?page=${lastPage}`);
  }

  const match = page.match(/page=(\d*)/);
  const pageNumber = match ? match[1] : '1';

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
        page={pageNumber}
        isLoading={loading}
        nextPage={nextPage && getNextPage}
        prevPage={prevPage && getPrevPage}
        lastPage={lastPage}
        gotoFirstPage={getFirstPage}
        gotoLastPage={getLastPage}
      />
    </Container>
  );
}

export default App;
