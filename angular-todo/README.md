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

     $ make serve

To build the production version of the assets:

     $ make release

All the production assets will appear in the `./dist` directory.

Contents
========

    ├── Makefile
    ├── modules
    │   └── todo-vanilla
    │       ├── index.js
    │       ├── todo-vanilla.css
    │       └── todo-vanilla.js
    ├── package.json
    ├── pages
    │   ├── index.html
    │   └── index.js
    ├── README.md
    └── webpack.config.js

The `pages` directory contains the starting code for the application, with
`index.js` being the entry point for webpack.

```javascript
import '../modules/todo-vanilla'
```

We break this down into components, in this case custom elements. Note that
each element is included via `../modules/{element-name}` directory. This is
just a convention where each such file contains all the includes needed for
that element. For example, the `elements/todo-vanilla/index.js` file contains
both the CSS and the JS needed to use the `<todo-vanilla>` element. All
custom elements must have a '-' in their name, and I've adopted the convention
of appending '-vanilla'.

There is only one element and that's the `<todo-vanilla>` element:

```javascript
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

1. This code works w/o polyfils in Chrome. To get it to run in a wider range
   of browsers you will need to add polyfills and, depending on the target
   browser version, compile the JS back to an older version of ES, and run a
   prefixer on the CSS. The wider the target set of browsers and the older the
   versions you are targeting the more processing you will need to do via
   webpack, but since the original code doesn't need to change, those extra
   processing steps are out of scope for this example.
