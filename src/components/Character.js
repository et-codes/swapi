import { useState } from 'react';
import axios from 'axios';

const Character = ({ character }) => {
  const [homeworld, setHomeworld] = useState('');
  const [species, setSpecies] = useState('');

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
      <td>{character.mass}kg</td>
      <td>{homeworld}</td>
      <td>{species}</td>
    </tr>
  );
};

export default Character;