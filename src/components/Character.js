const Character = ({ character }) => {
  return (
    <tr>
      <td>{character.name}</td>
      <td>{character.birth_year}</td>
      <td>{character.height}cm</td>
      <td>{character.mass}{character.mass === 'unknown' || 'kg'}</td>
      <td>{character.homeworldName}</td>
      <td>{character.speciesName}</td>
    </tr>
  );
};

export default Character;