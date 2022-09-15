import axios from 'axios';

const getCharacters = (url, cache, updateCache) => {

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

export default {
  getCharacters,
  getHomeworldName,
  getSpeciesName
};