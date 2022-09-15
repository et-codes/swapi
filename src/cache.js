const isCacheStale = () => {
  const cacheDate = new Date(localStorage.getItem('cacheDate'));
  return new Date() - cacheDate > 259200000;
}

const clearCache = () => {
  localStorage.removeItem('AppCache');
  localStorage.removeItem('CharacterTableCache');
}

const updateCache = (newCache) => {
  const cacheJSON = JSON.stringify(Array.from(newCache.entries()));
  localStorage.setItem('AppCache', cacheJSON);
  localStorage.setItem('cacheDate', new Date());
}

const getCache = () => {
  return JSON.parse(localStorage.getItem('AppCache')) || [];
}

const exports = { isCacheStale, clearCache, updateCache, getCache };

export default exports;