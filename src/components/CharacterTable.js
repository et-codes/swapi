import { useState } from 'react';
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

  const getData = async (url) => {
    let response;
    if (cache.has(url)) {
      response = cache.get(url);
    } else {
      const apiResponse = await axios.get(url);
      response = apiResponse.data.name
      setCache((prevCache) => prevCache.set(url, response));
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