const defaultMaxListeners = 10;

const makeEmitter = () => {
  const listenerMap = new Map();
  let maxListeners = defaultMaxListeners;

  const addListener = (key, fn) => {
    const existing = listeners(key);
    existing.push(fn)
    listenerMap.set(key, existing);
  };

  const emit = (key, ...rest) => {
    listeners(key).forEach(fn => {
      fn(...rest);
      if (fn.once) removeListener(key, fn);
    });
  };

  const eventNames = () => {
      return [...listenerMap.keys()];
  };

  const getMaxListeners = ()=> maxListeners;

  const listeners = key => listenerMap.has(key) ? listenerMap.get(key) : [];

  const listenerCount = key => listeners(key).length;

  const once = (key, fn) => {
    addListener(key, Object.assign(fn, {once: true}));
  };

  const prependListener = (key, fn) => {
    const existing = listeners(key);
    existing.unshift(fn);
    listenerMap.set(key, existing);
  };

  const prependOnceListener = (key, fn) => {
    const existing = listeners(key);
    existing.unshift(Object.assign(fn, {once: true}));
    listenerMap.set(key, existing);
  };

  const removeListener = (key, fn) => listenerMap.set(key, listeners(key).filter(x => x !== fn));

  const removeAllListeners = (key) => {
    if (!key) listenerMap.forEach((val, ky) => listenerMap.set(ky, []));
    else if (listenerMap.has(key)) listenerMap.set(key, []);
  };
  
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
    off: removeListener,
    on: addListener,
    once,
    prependListener,
    prependOnceListener,
    rawListeners: listeners,
    removeListener,
    removeAllListeners,
    setMaxListeners,
  };
};

export default makeEmitter;
