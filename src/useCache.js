import { useState, useEffect } from "react";
import cacheModule from './cache';

const useCache = () => {
  const [cache, setCache] = useState(new Map(cacheModule.getCache()));

  const updateCache = (key, value) => {
    setCache((prevCache) => prevCache.set(key, value));
  };

  useEffect(() => {
    if (cacheModule.isCacheStale()) {
      cacheModule.clearCache();
      return;
    }

    const storedData = cacheModule.getCache();
    if (storedData !== null && storedData.legnth !== 0) {
      const storedCache = new Map(storedData);
      setCache(storedCache);
    }
  }, []);

  useEffect(() => {
    cacheModule.updateCache(cache);
    console.log('cache (LS) has been updated');
  });

  return [cache, updateCache];
}

export default useCache;