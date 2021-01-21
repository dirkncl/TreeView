/**
 * Emit an event from the tree view
 * @param {string} name The name of the event to emit
 */
 import { events } from './events.js';
 import { forEach } from './forEach.js';
 
function emit(instance, name) {
  var args = [].slice.call(arguments, 2);
  if (events.indexOf(name) > -1) {
    if (instance.handlers[name] && instance.handlers[name] instanceof Array) {
      forEach(instance.handlers[name], function (handle) {
        window.setTimeout(function () {
          handle.callback.apply(handle.context, args);
        }, 0);
      });
    }
  } else {
    throw new Error(name + ' event cannot be found on TreeView.');
  }
}

export { emit }
