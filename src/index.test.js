import makeEmitter from './index';

describe('defaultMaxListeners', () => {
  test('should equals 10', () => {
    const emitter = makeEmitter();
    expect(emitter.defaultMaxListeners).toEqual(10);
  });
});

describe('eventNames', () => {
  test('should return an empty object if no events or listeners added', () => {
    const emitter = makeEmitter();
    expect(emitter.eventNames()).toEqual([]);
  });

  test('should return an array of events', () => {
    const emitter = makeEmitter();
    emitter.addListener('key1', () => {});
    emitter.addListener('key2', () => {});
    emitter.addListener('key3', () => {});
    expect(emitter.eventNames()).toEqual(['key1', 'key2', 'key3']);
  });
});

describe('addListener', () => {
  test('should add an event with a listener when event is not in map', () => {
    const emitter = makeEmitter();
    const key = 'event1';
    emitter.addListener(key, () => {});
    expect(emitter.eventNames()).toEqual([key]);
  });

  test('should add an event with a listener when event is already in map', () => {
    const emitter = makeEmitter();
    const key = 'event1';
    const fn1 = () => {};
    const fn2 = () => {};
    emitter.addListener(key, fn1);
    emitter.addListener(key, fn2);
    expect(emitter.listeners(key)).toEqual([fn1, fn2]);
  });
});

describe('on', () => {
  test('should add an event with a listener when event is not in map', () => {
    const emitter = makeEmitter();
    const key = 'event1';
    emitter.on(key, () => {});
    expect(emitter.eventNames()).toEqual([key]);
  });

  test('should add an event with a listener when event is already in map', () => {
    const emitter = makeEmitter();
    const key = 'event1';
    const fn1 = () => {};
    const fn2 = () => {};
    emitter.on(key, fn1);
    emitter.on(key, fn2);
    expect(emitter.listeners(key)).toEqual([fn1, fn2]);
  });
});

describe('getMaxListeners', () => {
  test('should return maxListeners value', () => {
    const emitter = makeEmitter();
    expect(emitter.getMaxListeners()).toEqual(10);
  });
});

describe('setMaxListeners', () => {
  test('should set the value of maxListeners', () => {
    const emitter = makeEmitter();
    const newMax = 1;
    emitter.setMaxListeners(1);
    expect(emitter.getMaxListeners()).toEqual(1);
  });

  test('should set the value of maxListeners property to defaultMaxListeners when no arg', () => {
    const emitter = makeEmitter();
    emitter.setMaxListeners(1);
    emitter.setMaxListeners();
    expect(emitter.getMaxListeners()).toEqual(10);
  });
});

describe('listeners', () => {
  test('should return an array of listeners for given event key', ()  => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn = () => {};
    emitter.addListener(key, fn);
    expect(emitter.listeners(key)).toEqual([fn]);
  });

  test('should return an empty array if no listeners exist for given event key', () => {
    const emitter = makeEmitter();
    expect(emitter.listeners('doesNotExist')).toEqual([]);
  });
});

describe('listenerCount', () => {
  test('should return the count of listeners for given event key', ()  => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn = () => {};
    emitter.addListener(key, fn);
    expect(emitter.listenerCount(key)).toEqual(1);
  });
});

describe('emit', () => {
  test('should call all subscribed listeners for given key', () => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    emitter.addListener(key, fn1);
    emitter.addListener(key, fn2);
    emitter.emit(key, 'blah', 'badee', 'blah');
    expect(fn1).toHaveBeenCalledWith('blah', 'badee', 'blah');
    expect(fn2).toHaveBeenCalledWith('blah', 'badee', 'blah');
  });
});

describe('once', () => {
  test('should unsubscribe listener after one emit', () => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn = jest.fn();
    emitter.once(key, fn);
    emitter.emit(key);
    emitter.emit(key);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('rawListeners', () => {
  test('should return array of subscribed listeners for given event key', ()  => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn = () => {};
    emitter.addListener(key, fn);
    expect(emitter.rawListeners(key)).toEqual([fn]);
  });

  test('should return an empty array if no listeners exist for given event key', () => {
    const emitter = makeEmitter();
    expect(emitter.rawListeners('doesNotExist')).toEqual([]);
  });
});

describe('removeListener', () => {
  test('should remove the given function for the given event key', () => {
    const emitter = makeEmitter();
    const fn1 = () => {};
    const fn2 = () => {};
    const key = 'key1';
    emitter.addListener(key, fn1);
    emitter.addListener(key, fn2);
    emitter.removeListener(key, fn1);
    expect(emitter.listeners(key)).toEqual([fn2]);
  });
});

describe('off', () => {
  test('should remove the given function for the given event key', () => {
    const emitter = makeEmitter();
    const fn1 = () => {};
    const fn2 = () => {};
    const key = 'key1';
    emitter.addListener(key, fn1);
    emitter.addListener(key, fn2);
    emitter.off(key, fn1);
    expect(emitter.listeners(key)).toEqual([fn2]);
  });
});

describe('removeAllListeners', () => {
  test('should remove all listeners for given event key', () => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn = () => {};
    emitter.addListener(key, fn);
    emitter.removeAllListeners(key);
    expect(emitter.listenerCount(key)).toEqual(0);
  });

  test('should not fail if key does not exist', () => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn = () => {};
    emitter.addListener(key, fn);
    emitter.removeAllListeners('doesNotExist');
    expect(emitter.listenerCount(key)).toEqual(1);
  });

  test('should remove all listeners from all event keys if no event key given', () => {
    const emitter = makeEmitter();
    const key1 = 'key1', key2 = 'key2';
    const fn1 = () => {}, fn2 = jest.fn();
    emitter.addListener(key1, fn1);
    emitter.addListener(key2, fn2);
    emitter.removeAllListeners();
    expect(emitter.listenerCount(key1)).toEqual(0);
    expect(emitter.listenerCount(key2)).toEqual(0);
  });
});

describe('prependListener', () => {
  test('should add a listener to the front of the subscriber array for a given event key when key exists', () => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn1 = () => {};
    const fn2 = () => {};
    emitter.addListener(key, fn1);
    emitter.prependListener(key, fn2);
    expect(emitter.listeners(key)).toEqual([fn2, fn1]);
  });

  test('should add a listener for a given event key when key does exists', () => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn = () => {};
    emitter.prependListener(key, fn);
    expect(emitter.eventNames()).toEqual([key]);
  });
});

describe('prependOnceListener', () => {
  test('should adds a once subscriber to the front of the subscriber array for a given event key when key exists', () => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn1 = () => {};
    const fn2 = () => {};
    emitter.addListener(key, fn1);
    emitter.prependOnceListener(key, fn2);
    expect(emitter.listeners(key)).toEqual([fn2, fn1]);
    emitter.emit(key);
    expect(emitter.listeners(key)).toEqual([fn1]);
  });

  test('should add a once listener for a given event key when key does exists', () => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn = () => {};
    emitter.prependOnceListener(key, fn);
    expect(emitter.listeners(key)).toEqual([fn]);
    emitter.emit(key);
    expect(emitter.listeners(key)).toEqual([]);
  });
});
