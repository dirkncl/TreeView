/**
* js-treeview
* from  https://github.com/justinchmura/js-treeview
*/
/**
 * @constructor
 * @property {object} handlers The attached event handlers
 * @property {object} data The JSON object that represents the tree structure
 * @property {DOMElement} node The DOM element to render the tree in
 */
import { events } from './events.js';
import { forEach } from './forEach.js';
import { emit } from './emit.js';
import { render } from './render.js';
 
class TreeView {
  build(data, node){
    this.handlers = {};
    this.node = node;
    this.data = data;
    render(this);
  }
  
  /**
   * Expands a leaflet by the expando or the leaf text
   * @param {DOMElement} node The parent node that contains the leaves
   * @param {DOMElement} leaves The leaves wrapper element
   */
  expand(node, leaves, skipEmit) {
    var expando = node.querySelector('.tree-expando');
    expando.textContent = '-';
    leaves.classList.remove('hidden');
    if (skipEmit) { return; }
    emit(this, 'expand', {
      target: node,
      leaves: leaves
    });
  }
  
  expandAll() {
    var self = this;
    var nodes = document.getElementById(self.node).querySelectorAll('.tree-expando');
    forEach(nodes, function (node) {
      var parent = node.parentNode;
      var leaves = parent.parentNode.querySelector('.tree-child-leaves');
      if (parent && leaves && parent.hasAttribute('data-item')) {
        self.expand(parent, leaves, true);
      }
    });
    emit(this, 'expandAll', {});
  }
  
  /**
   * Collapses a leaflet by the expando or the leaf text
   * @param {DOMElement} node The parent node that contains the leaves
   * @param {DOMElement} leaves The leaves wrapper element
   */
  collapse(node, leaves, skipEmit) {
    var expando = node.querySelector('.tree-expando');
    expando.textContent = '+';
    leaves.classList.add('hidden');
    if (skipEmit) { return; }
    emit(this, 'collapse', {
      target: node,
      leaves: leaves
    });
  }
  
  /**
   */
  collapseAll() {
    var self = this;
    var nodes = document.getElementById(self.node).querySelectorAll('.tree-expando');
    forEach(nodes, function (node) {
      var parent = node.parentNode;
      var leaves = parent.parentNode.querySelector('.tree-child-leaves');
      if (parent && leaves && parent.hasAttribute('data-item')) {
        self.collapse(parent, leaves, true);
      }
    });
    emit(this, 'collapseAll', {});
  };
  
  /**
   * Attach an event handler to the tree view
   * @param {string} name Name of the event to attach
   * @param {function} callback The callback to execute on the event
   * @param {object} scope The context to call the callback with
   */
  on(name, callback, scope) {
    if (events.indexOf(name) > -1) {
      if (!this.handlers[name]) {
        this.handlers[name] = [];
      }
      this.handlers[name].push({
        callback: callback,
        context: scope
      });
    } else {
      throw new Error(name + ' is not supported by TreeView.');
    }
  }
  
  /**
   * Deattach an event handler from the tree view
   * @param {string} name Name of the event to deattach
   * @param {function} callback The function to deattach
   */
  off(name, callback) {
    var index, found = false;
    if (this.handlers[name] instanceof Array) {
      this.handlers[name].forEach(function (handle, i) {
        index = i;
        if (handle.callback === callback && !found) {
          found = true;
        }
      });
      if (found) {
        this.handlers[name].splice(index, 1);
      }
    }
  }
}
export { TreeView }