/**
 * A forEach that will work with a NodeList and generic Arrays
 * @param {array|NodeList} arr The array to iterate over
 * @param {function} callback Function that executes for each element. First parameter is element, second is index
 * @param {object} The context to execute callback with
 */
function forEach(arr, callback, scope) {
  //var i, len = arr.length;
  //var i, len = arr.length;
  for (var i = 0; i < arr.length; i += 1) {
    callback.call(scope, arr[i], i);
  }
}
export { forEach }