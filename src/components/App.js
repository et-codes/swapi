import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import SearchBar from './SearchBar';
import CharacterTable from './CharacterTable';
import Footer from './Footer';

function App() {
  const [searchString, setSearchString] = useState('');

  const searchCharacters = (e) => {
    e.preventDefault();

    setSearchString('');
  }

  const updateSearchBar = (e) => {
    setSearchString(e.target.value);
  }

  return (
    <Container>
      <Header />
      <SearchBar
        handleSubmit={searchCharacters}
        handleChange={updateSearchBar}
        searchValue={searchString}
      />
      <CharacterTable />
      <Footer />
    </Container>
  );
}

export default App;
