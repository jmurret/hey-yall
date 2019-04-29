const defaultMaxListeners = 10;

const makeEmitter = () => {
  const listenerMap = new Map();
  let maxListeners = defaultMaxListeners;

  const addListener = (key, fn) => {
    const existing = listeners(key);
    existing.push(fn)
    listenerMap.set(key, existing);
  };
  const on = addListener;

  const emit = (key, ...rest) => {
    listeners(key).forEach(fn => fn(...rest));
  };

  const eventNames = () => {
      return [...listenerMap.keys()];
  };

  const getMaxListeners = ()=> maxListeners;

  const listeners = key => listenerMap.has(key) ? listenerMap.get(key) : [];

  const listenerCount = key => listeners(key).length;

  const removeListener = (key, fn) => listenerMap.set(key, listeners(key).filter(x => x !== fn));

  const setMaxListeners = (numberOfListeners = defaultMaxListeners) => {
    maxListeners = numberOfListeners;
  };

  return {
    addListener,
    defaultMaxListeners,
    emit,
    eventNames,
    getMaxListeners,
    listenerCount,
    listeners,
    on,
    removeListener,
    setMaxListeners,
  };
};

export default makeEmitter;
