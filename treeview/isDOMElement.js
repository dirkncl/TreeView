/**
* A utilite function to check to see if something is a DOM object
* @param {object} Object to test
* @returns {boolean} If the object is a DOM object
*/
function isDOMElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    // Some browsers don't support using the HTMLElement so some extra
    // checks are needed.
      return typeof obj === 'object' && obj.nodeType === 1 && typeof obj.style === 'object' && typeof obj.ownerDocument === 'object';
  }
}

export { isDOMElement }