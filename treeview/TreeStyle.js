class TreeStyle {
  constructor(){
    var Style = `
      .tree-leaf { position: relative; }
      .tree-leaf .tree-child-leaves { display: block; margin-left: 15px; }
      .tree-leaf .hidden { display: none; }
      .tree-leaf .tree-expando { background: #ddd; border-radius: 3px; cursor: pointer; float: left; height: 10px; line-height: 10px; position: relative; text-align: center; top: 5px; width: 10px; }
      .tree-leaf .hidden { visibility: hidden; }
      .tree-leaf .tree-expando:hover { background: #aaa; }
      .tree-leaf .tree-leaf-text { cursor: pointer; float: left; margin-left: 5px; }
      .tree-leaf .tree-leaf-text:hover { color: blue; }
      .tree-leaf .tree-leaf-content:before, .tree-leaf .tree-leaf-content:after { content: " "; display: table; }
      .tree-leaf .tree-leaf-content:after { clear: both; }
    `;
    
    return (this.sty = document.createElement("style")).textContent = Style,document.head.appendChild(this.sty)
  }
}

export { TreeStyle }