import { useState } from 'react';
import axios from 'axios';

const Character = ({ character }) => {
  const loadingText =
    <span className="text-muted fst-italic">
      loading...
    </span>;
  const [homeworld, setHomeworld] = useState(loadingText);
  const [species, setSpecies] = useState(loadingText);

  if (character.homeworld) {
    axios.get(character.homeworld)
      .then(response => setHomeworld(response.data.name))
      .catch(err => console.error(err));
  }

  if (character.species) {
    axios.get(character.species)
      .then(response => setSpecies(response.data.name))
      .catch(err => console.error(err));
  }

  return (
    <tr>
      <td>{character.name}</td>
      <td>{character.birth_year}</td>
      <td>{character.height}cm</td>
      <td>{character.mass}{character.mass === 'unknown' || 'kg'}</td>
      <td>{homeworld}</td>
      <td>{species}</td>
    </tr>
  );
};

export default Character;