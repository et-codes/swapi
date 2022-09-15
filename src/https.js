import axios from 'axios';


const getCharacters = async (url, cache, updateCache) => {
  if (cache.has(url)) {
    return cache.get(url);
  } else {
    const response = await axios.get(url);
    for (const character of response.data.results) {
      character.homeworldName = await getHomeworldName(
        character.homeworld,
        cache,
        updateCache
      );

      character.speciesName = await getSpeciesName(
        character.species,
        cache,
        updateCache
      );
    }
    updateCache(url, response);
    return response;
  }
}

const getHomeworldName = async (homeworldUrl, cache, updateCache) => {
  if (cache.has(homeworldUrl)) {
    return cache.get(homeworldUrl);
  } else {
    const homeworldName = (await axios.get(homeworldUrl)).data.name;
    updateCache(homeworldUrl, homeworldName);
    return homeworldName;
  }
}

const getSpeciesName = async (speciesArray, cache, updateCache) => {
  if (speciesArray.length === 0) {
    return "Human";
  } else if (cache.has(speciesArray[0])) {
    return cache.get(speciesArray[0]);
  } else {
    const speciesName = (await axios.get(speciesArray[0])).data.name;
    updateCache(speciesArray[0], speciesName);
    return speciesName;
  }
}

const exports = { getCharacters };

export default exports;