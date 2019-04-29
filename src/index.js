const defaultMaxListeners = 10;

const makeEmitter = () => {
  const listenerMap = new Map();
  let maxListeners = defaultMaxListeners;

  const addListener = (key, fn) => {
    const existing = listeners(key);
    existing.push(fn)
    listenerMap.set(key, existing);
  }

  const eventNames = () => {
      return [...listenerMap.keys()];
  };

  const getMaxListeners = ()=> maxListeners;

  const listeners = key => listenerMap.has(key) ? listenerMap.get(key) : [];

  const listenerCount = key => listeners(key).length;

  const setMaxListeners = (numberOfListeners = defaultMaxListeners) => {
    maxListeners = numberOfListeners;
  };

  return {
    addListener,
    defaultMaxListeners,
    eventNames,
    getMaxListeners,
    listenerCount,
    listeners,
    setMaxListeners,
  };
};

export default makeEmitter;
