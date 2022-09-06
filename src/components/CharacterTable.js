import Character from './Character';
import Table from 'react-bootstrap/Table';
import { ThreeDots } from 'react-loader-spinner';

const CharacterTable = ({ chars, page, isLoading }) => {
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
      <caption>{`Page: ${page} >`}</caption>
    </Table>
  );
};

export default CharacterTable;