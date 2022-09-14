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

  // Load cache from localStorage if it exists and is < 72 hours old
  useEffect(() => {
    const cacheDate = new Date(localStorage.getItem('cacheDate'));
    if (new Date() - cacheDate > 259200000) {
      localStorage.removeItem('AppCache');
      localStorage.removeItem('CharacterTableCache');
      return;
    }
    const storedData = localStorage.getItem('AppCache');
    if (storedData !== null && storedData !== '[]') {
      const storedCache = new Map(JSON.parse(storedData));
      setCache(storedCache);
    }
  }, []);

  // Fetch from and save to cache
  useEffect(() => {
    const getPeople = async (url) => {
      let response;
      if (cache.has(url)) {
        response = cache.get(url);
      } else {
        setLoading(true);
        response = await axios.get(url);
        for (const character of response.data.results) {
          // Get homeworld
          if (cache.has(character.homeworld)) {
            character.homeworldName = cache.get(character.homeworld);
          } else {
            const homeworldResponse = await axios.get(character.homeworld);
            const homeworldName = homeworldResponse.data.name;
            setCache((prevCache) => prevCache.set(character.homeworld, homeworldName));
            character.homeworldName = homeworldName;
          }
          // Get species
          if (character.species.length === 0) {
            character.speciesName = "Human";
          } else if (cache.has(character.species[0])) {
            character.speciesName = cache.get(character.species[0]);
          } else {
            const speciesResponse = await axios.get(character.species[0]);
            const speciesName = speciesResponse.data.name;
            setCache((prevCache) => prevCache.set(character.species[0], speciesName));
            character.speciesName = speciesName;
          }
        }
        setCache((prevCache) => prevCache.set(url, response));
        setLoading(false);

        const cacheJSON = JSON.stringify(Array.from(cache.entries()));
        localStorage.setItem('AppCache', cacheJSON);
        localStorage.setItem('cacheDate', new Date());
      }
      setCharacters(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setLastPage(Math.ceil(response.data.count / 10).toString());
    }
    getPeople(page);
  }, [page, cache]);

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
