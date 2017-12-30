Angular TODO
============

This is a rewrite of the TODO sample app from
[Angular](https://angularjs.org/#add-some-control).


Prereqs
=======

You should have the following installed:

1. node - A version recent enough to have npx.
2. yarn.

Running
=======

To install all dependencies and run the developement server:

     $ make dev

To build the production version of the assets:

     $ make

All the production assets will appear in the `./dist` directory.


Contents
========

    ├── Makefile
    ├── package.json
    ├── src
    │   ├── index.css
    │   ├── index.html
    │   └── index.js
    └── webpack.config.js

The `src` directory contains the starting code for the application, with
`index.js` being the entry point. Since this example only contains a single
element definition we just put it here, as opposed to the other sample apps
which had mulitple elements that were broken out under an `elements`
directory.

```javascript
import './index.css'
import { bind, wire } from  '../node_modules/hyperhtml/esm/index.js'

window.customElements.define('todo-vanilla', class extends HTMLElement {

  connectedCallback() {
    this.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}
    ];
    this.render();
  }

  archive(e) {
    e.preventDefault();
    this.todos = this.todos.filter(item => item.done == false);
    this.render();
  }

  done(e) {
    this.todos[+e.target.dataset.index].done = e.target.checked;
    this.render();
  }

  addToDo(e) {
    e.preventDefault();
    this.todos.push({text: this.querySelector('#text').value, done: false});
    this.render();
  }

  remaining() {
    return this.todos.reduce((acc, cur) => { return acc + (cur.done == false) ? 1 : 0 }, 0);
  }

  render() {
    bind(this)`
     <h2>Todo</h2>
     <div>
       <span>${this.remaining()} of ${this.todos.length} remaining</span>
       [ <a href="" onclick=${e => this.archive(e)} >archive</a> ]
     <ul class=unstyled>
      ${ this.todos.map( (item, index) => wire(item)`<li><label>
             <input data-index=${index} onchange=${e => this.done(e)} type=checkbox checked=${item.done}/>
             <span>${item.text}</span>
        </label></li>`)}
     </ul>
      <form onsubmit=${e => this.addToDo(e)}>
        <input type=text size=30 placeholder="add new todo here" id=text>
        <input type=submit value=add>
      </form>
    </div>`;
  }
});
```

The templating is handled by the
[hyper-html](https://github.com/WebReflection/hyperHTML) library.

Caveats
=======

1. The `webpack.config.js` builds a developement version of the code, no
   minimization or other optimizations are done to JS, HTML, CSS, or images.
2. This code works w/o polyfils in Chrome. To get it to run in a wider range
   of browsers you will need to add polyfills and, depending on the target
   browser version, compile the JS back to an older version of ES, and run a
   prefixer on the CSS. The wider the target set of browsers and the older the
   versions you are targeting the more processing you will need to do via
   webpack, but since the original code doesn't need to change, those extra
   processing steps are out of scope for this example.
