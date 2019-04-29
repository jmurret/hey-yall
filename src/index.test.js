import makeEmitter from './index';

describe('makeEmitter', () => {
  test('API contract', () => {
    const eventEmitter = makeEmitter();
    expect(eventEmitter.defaultMaxListeners).toBeDefined();
    expect(eventEmitter.addListener).toBeDefined();
    expect(eventEmitter.emit).toBeDefined();
    expect(eventEmitter.eventNames).toBeDefined();
    expect(eventEmitter.getMaxListeners).toBeDefined();
    expect(eventEmitter.listenerCount).toBeDefined();
    expect(eventEmitter.listeners).toBeDefined();
    // expect(eventEmitter.off).toBeDefined();
    // expect(eventEmitter.on).toBeDefined();
    // expect(eventEmitter.once).toBeDefined();
    // expect(eventEmitter.prependListener).toBeDefined();
    // expect(eventEmitter.removeListener).toBeDefined();
    // expect(eventEmitter.removeAllListeners).toBeDefined();
    // expect(eventEmitter.prependOnceListener).toBeDefined();
    expect(eventEmitter.setMaxListeners).toBeDefined();
    // expect(eventEmitter.rawListeners).toBeDefined();
  });
});

describe('defaultMaxListeners', () => {
  test('equals 10', () => {
    const emitter = makeEmitter();

    expect(emitter.defaultMaxListeners).toBe(10);
  });
});

describe('eventNames', () => {
  test('should be an empty object if no events/listeners added', () => {
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
  test('should add event with listener when event is not in map', () => {
    const emitter = makeEmitter();
    const key = 'event1';
    emitter.addListener(key, () => {});
    expect(emitter.eventNames()).toEqual([key]);
  });

  test('should add event with listener when event is already in map', () => {
    const emitter = makeEmitter();
    const key = 'event1';
    const fn1 = () => {};
    const fn2 = () => {};
    emitter.addListener(key, fn1);
    emitter.addListener(key, fn2);
    expect(emitter.listeners(key)).toEqual([fn1, fn2]);
  });
});

describe('getMaxListeners', () => {
  test('should returns maxListeners', () => {
    const emitter = makeEmitter();
    expect(emitter.getMaxListeners()).toBe(10);
  });
});

describe('setMaxListeners', () => {
  test('should set the value of maxListeners property when given an argument', () => {
    const emitter = makeEmitter();
    const newMax = 1;
    emitter.setMaxListeners(1);
    expect(emitter.getMaxListeners()).toBe(1);
  });

  test('should sets the value of maxListeners property to defaultMaxListeners when given // NOTE:  argument', () => {
    const emitter = makeEmitter();
    emitter.setMaxListeners(1);
    emitter.setMaxListeners();
    expect(emitter.getMaxListeners()).toEqual(10);
  });
});

describe('listeners', () => {
  test('should return array of listeners for given event key', ()  => {
    const emitter = makeEmitter();
    const key = 'key1';
    const fn = () => {};
    emitter.addListener(key, fn);
    expect(emitter.listeners(key)).toEqual([fn]);
  });

  test('should return an empty array if no listeners exist for given event key', () => {
    const emitter = makeEmitter();
    expect(emitter.listeners('n/a')).toEqual([]);
  })
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
  test('should call all subscribed functions for given key', () => {
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
//
// describe('on', () => {
//   test('alias for ee.addListener', () => {
//     const ee = makeEmitter();
//
//     expect(ee.on).toBe(ee.addListener);
//   });
// });
//
// describe('once', () => {
//   test('adds a listener to be called once', () => {
//     const ee = makeEmitter();
//     const event = 'my event';
//     const fn = jest.fn();
//
//     ee.once(event, fn);
//
//     ee.emit(event);
//     ee.emit(event);
//
//     expect(fn).toHaveBeenCalledTimes(1);
//   });
// })
//
// describe('removeListener', () => {
//   test('removes the passed fn from the event listeners', () => {
//     const ee = makeEmitter();
//     const fn = () => {};
//     const event = 'event';
//
//     ee.on(event, fn);
//
//     expect(ee.listenerCount(event)).toBe(1);
//
//     ee.removeListener(event, fn);
//
//     expect(ee.listenerCount(event)).toBe(0);
//   });
//
//   test('returns true if no event found', () => {
//     const ee = makeEmitter();
//     const fn = () => {};
//     const event = 'event';
//
//     expect(ee.removeListener(event, fn)).toBe(true);
//   });
// });
//
// describe('removeAllListeners', () => {
//   test('removes all listeners for passed event', () => {
//     const ee = makeEmitter();
//     const event = 'my event';
//     const fn = () => {};
//
//     ee.on(event, fn);
//
//     expect(ee.listenerCount(event)).toBe(1);
//
//     ee.removeAllListeners(event);
//
//     expect(ee.listenerCount(event)).toBe(0);
//   });
//
//   test('removes all listeners from all events if no event passed', () => {
//     const ee = makeEmitter();
//     const event = 'my event';
//     const fn = () => {};
//
//     ee.on(event, fn);
//
//     expect(ee.listenerCount(event)).toBe(1);
//
//     ee.removeAllListeners();
//
//     expect(ee.listenerCount(event)).toBe(0);
//   });
//
//   test('returns true if no event found', () => {
//     const ee = makeEmitter();
//     const fn = () => {};
//     const event = 'event';
//
//     expect(ee.removeAllListeners(event, fn)).toBe(true);
//   });
// });
//
// describe('prependListeners', () => {
//   test('adds a listener to the front of the event list', () => {
//     const ee = makeEmitter();
//     const event = 'my event';
//     const fn = () => {};
//     const fn2 = () => {};
//
//     ee.on(event, fn);
//
//     expect(ee.listeners(event)).toEqual([fn]);
//
//     ee.prependListener(event, fn2);
//
//     expect(ee.listeners(event)).toEqual([fn2, fn]);
//   });
//
//   test('adds an event to event map if event not found', () => {
//     const ee = makeEmitter();
//     const event = 'my event';
//     const fn = () => {};
//
//     expect(ee.eventNames()).toEqual([]);
//
//     ee.prependListener(event, fn);
//
//     expect(ee.eventNames()).toEqual([event]);
//   });
// });
//
// describe('prependOnceListeners', () => {
//   test('adds a once listener to the front of the event list', () => {
//     const ee = makeEmitter();
//     const event = 'my event';
//     const fn = () => {};
//     const fn2 = () => {};
//
//     ee.on(event, fn);
//
//     expect(ee.listeners(event)).toEqual([fn]);
//
//     ee.prependOnceListener(event, fn2);
//
//     expect(ee.listeners(event)).toEqual([fn2, fn]);
//
//     ee.emit(event);
//
//     expect(ee.listenerCount(event)).toBe(1);
//   });
//
//   test('adds an event to event map if event not found', () => {
//     const ee = makeEmitter();
//     const event = 'my event';
//     const fn = () => {};
//
//     expect(ee.eventNames()).toEqual([]);
//
//     ee.prependListener(event, fn);
//
//     expect(ee.eventNames()).toEqual([event]);
//   });
// });
