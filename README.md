# hey-yall

An event emitter with southern charm.

- Lightweight
- Supports standard event emitter functionality
- Browser and node.js support (browser support with Browserify or similar tool)
- Standard event emitter functionality (i.e. `on`, `off`, `emit`, `removeListener`, etc.)
- Single event listener registration with `once`

## Install
```bash
npm install hey-yall
```

## Creating emitters

```js
  const makeEmitter = require('hey-yall');

  // Create an emitter object
  const emitter = makeEmitter();
```

## Hey-Yall API
All emitter methods return the object on which they were called so that you can chain multiple method calls.

### `emitter.on(event, listener)`
Adds an event listener to the emitter.

Arguments:
- event: (String) key used to identify which events should trigger this listener
- listener: (Function) the function to call when a matching event is emitted

```js
  emitter.on('test', listener)  // Listen for 'test' events
  emitter.emit('test')     // listener function invoked
```


### `emitter.once(event, listener)`
Adds an event listener but immediately removes the listener the first time it is triggered.

Arguments:
- event: (String) key used to identify which events should trigger this listener
- listener: (Function) the function to call when a matching event is emitted

```js
  emitter.once('test', listener)  // Listen for one 'test' event
  emitter.emit('test')       // listener function invoked
  emitter.emit('test');   // listener function not invoked
```


### `emitter.off(event[, listener])`
Removes listeners for the given event, optionally specifying a specific listener to remove. If `listener` is not passed then all listeners are removed.

Arguments:
- event: (String) key used to identify which event's listeners to remove
- listener: (Optional: Function) if specified then only listeners with this function as a listener will be removed

```js
  emitter.on('test', listener1)  // Listen for 'test' events
  emitter.on('test', listener2)  // Listen for 'test' events
  emitter.emit('test')     // Listener1 and Listener2 are called for 'test' events
  emitter.off('test', listener1) // Remove the first listener
  emitter.emit('test')     // Listener2 for 'test' event is called  
  emitter.off('test')      // Remove the remaining listener
  emitter.emit('test');    // No listeners called
```

### `emitter.emit(event[, data...])`
Emits an event and calls the listeners on all matching listeners. Additional data can be passed as arguments and they will be forwarded to listeners.

Arguments:
- event: (String) key for which to emit to listeners

```js
  emitter.on('test', listener)              // Listen for 'test' events
  emitter.emit('test')               // Listener invoked for 'test' events with no args
  emitter.emit('test', 'blah', 'badee', 'blah') // Listener invoked for 'test' events with 3 args of 'blah', 'badee', 'blah'
```
