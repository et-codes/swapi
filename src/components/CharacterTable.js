import { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';
import PageNav from './PageNav';
import Table from 'react-bootstrap/Table';
import { ThreeDots } from 'react-loader-spinner';

const CharacterTable = (props) => {
  const {
    chars,
    page,
    isLoading,
    nextPage,
    prevPage,
    lastPage,
    gotoFirstPage,
    gotoLastPage
  } = { ...props };

  const [cache, setCache] = useState(new Map());

  // Load cache from localStorage if it exists and is < 72 hours old
  useEffect(() => {
    const cacheDate = new Date(localStorage.getItem('cacheDate'));
    if (new Date() - cacheDate > 259200000) {
      localStorage.removeItem('AppCache');
      localStorage.removeItem('CharacterTableCache');
      return;
    }
    const storedData = localStorage.getItem('CharacterTableCache');
    if (storedData !== null && storedData !== '[]') {
      const storedCache = new Map(JSON.parse(storedData));
      setCache(storedCache);
    }
  }, []);

  // Fetch from and save to cache
  const getData = async (url) => {
    let response;
    if (cache.has(url)) {
      response = cache.get(url);
    } else {
      const apiResponse = await axios.get(url);
      response = apiResponse.data.name
      setCache((prevCache) => prevCache.set(url, response));

      const cacheJSON = JSON.stringify(Array.from(cache.entries()));
      localStorage.setItem('CharacterTableCache', cacheJSON);
      localStorage.setItem('cacheDate', new Date());
    }
    return response;
  };

  const charsToDisplay = chars.map(char =>
    <Character key={char.name} character={char} getData={getData} />
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <ThreeDots color="#888" />
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive="xs" caption={`Page: ${page}`}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Birth Date</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Homeworld</th>
          <th>Species</th>
        </tr>
      </thead>
      <tbody>
        {charsToDisplay}
      </tbody>
      <PageNav
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        lastPage={lastPage}
        gotoFirstPage={gotoFirstPage}
        gotoLastPage={gotoLastPage}
      />
    </Table>
  );
};

export default CharacterTable;