import { useState, useEffect } from 'react';

const Character = ({ character, getData }) => {
  const loadingText =
    <span className="text-muted fst-italic">
      loading...
    </span>;
  const [homeworld, setHomeworld] = useState(loadingText);
  const [species, setSpecies] = useState(loadingText);

  useEffect(() => {
    const getCharData = async () => {
      if (character.homeworld) {
        const response = await getData(character.homeworld);
        setHomeworld(response);
      }

      if (character.species.length > 0) {
        const response = await getData(character.species);
        setSpecies(response);
      } else {
        setSpecies('Human');
      }
    }
    getCharData();
  }, []);

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