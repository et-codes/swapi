import Character from './Character';
import PageNav from './PageNav';
import Table from 'react-bootstrap/Table';
import { ThreeDots } from 'react-loader-spinner';

const CharacterTable = ({
  chars,
  page,
  isLoading,
  nextPage,
  prevPage,
  lastPage,
  gotoFirstPage,
  gotoLastPage
}) => {
  const charsToDisplay = [];
  chars.forEach(char => {
    charsToDisplay.push(<Character key={char.name} character={char} />);
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <ThreeDots />
      </div>
    );
  }

  return (
    <Table striped bordered hover caption={`Page: ${page}`}>
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