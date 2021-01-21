import { TreeView } from '../treeview/TreeView.js';
//
// Tree Structure
//

var treeStructure = [{
  name: 'Vegetables',
  children: []
}, {
  name: 'Fruits',
  children: [{
    name: 'Apple',
    children: []
  }, {
    name: 'Orange',
    children: []
  }, {
    name: 'Lemon',
    children: []
  }]
}, {
  name: 'Candy',
  children: [{
    name: 'Gummies',
    children: []
  }, {
    name: 'Chocolate',
    children: [{
      name: 'M & M\'s',
      children: []
    }, {
      name: 'Hershey Bar',
      children: []
    }]
  }, ]
}, {
  name: 'Bread',
  children: []
}];

var docId = 'tree';
//
// Grab expand/collapse buttons
//
var tview = new TreeView();
var expandAll = document.getElementById('expandAll');
var collapseAll = document.getElementById('collapseAll');



//
// Create tree
//

tview.build(treeStructure, docId);

//
// Attach events
//

expandAll.onclick = function () { tview.expandAll(); };
collapseAll.onclick = function () { tview.collapseAll(); };

tview.on('select', function () { alert('select'); });
tview.on('expand', function () { alert('expand'); });
tview.on('collapse', function () { alert('collapse'); });
tview.on('expandAll', function () { alert('expand all'); });
tview.on('collapseAll', function () { alert('collapse all'); });