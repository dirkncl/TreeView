/**
 * Renders the tree view in the DOM
 */
import { TreeStyle } from './TreeStyle.js';
import { isDOMElement } from './isDOMElement.js';
import { emit } from './emit.js';
import { forEach } from './forEach.js';
 
function render(self) {
  var container = isDOMElement(self.node) ? self.node : document.getElementById(self.node);
  var leaves = [], click;
  new TreeStyle();
  var renderLeaf = function (item) {
    var leaf = document.createElement('div');
    var content = document.createElement('div');
    var text = document.createElement('div');
    var expando = document.createElement('div');

    leaf.setAttribute('class', 'tree-leaf');
    content.setAttribute('class', 'tree-leaf-content');
    content.setAttribute('data-item', JSON.stringify(item));
    text.setAttribute('class', 'tree-leaf-text');
    text.textContent = item.name;
    expando.setAttribute('class', 'tree-expando ' + (item.expanded ? 'expanded' : ''));
    expando.textContent = item.expanded ? '-' : '+';
    content.appendChild(expando);
    content.appendChild(text);
    leaf.appendChild(content);
    if (item.children && item.children.length > 0) {
      var children = document.createElement('div');
      children.setAttribute('class', 'tree-child-leaves');
      forEach(item.children, function (child) {
        var childLeaf = renderLeaf(child);
        children.appendChild(childLeaf);
      });
      if (!item.expanded) {
        children.classList.add('hidden');
      }
      leaf.appendChild(children);
    } else {
      expando.classList.add('hidden');
    }
    return leaf;
  };

  forEach(self.data, function (item) {
    leaves.push(renderLeaf.call(self, item));
  });
  container.innerHTML = leaves.map(function (leaf) {
    return leaf.outerHTML;
  }).join('');

  click = function (e) {
    var parent = (e.target || e.currentTarget).parentNode;
    var data = JSON.parse(parent.getAttribute('data-item'));
    var leaves = parent.parentNode.querySelector('.tree-child-leaves');
    if (leaves) {
      if (leaves.classList.contains('hidden')) {
        self.expand(parent, leaves);
      } else {
        self.collapse(parent, leaves);
      }
    } else {
      emit(self, 'select', {
        target: e,
        data: data
      });
    }
  };

  forEach(container.querySelectorAll('.tree-leaf-text'), function (node) {
    node.onclick = click;
  });
  forEach(container.querySelectorAll('.tree-expando'), function (node) {
    node.onclick = click;
  });
}

export { render }