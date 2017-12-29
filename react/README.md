React
=====

This is a rewrite if the React sample app developed in the [React Tutorial](https://reactjs.org/tutorial/tutorial.html).

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

		.
		├── elements
		│   ├── board-vanilla.css
		│   ├── board-vanilla.js
		│   ├── board-vanilla.webpack.js
		│   ├── game-vanilla.css
		│   ├── game-vanilla.js
		│   └── game-vanilla.webpack.js
		├── Makefile
		├── package.json
		├── src
		│   ├── index.css
		│   ├── index.html
		│   └── index.js
		└── webpack.config.js

The `src` directory contains the starting code for the application, with
`index.js` being the entry point for webpack.

```javascript
import '../elements/board-vanilla.webpack.js'
import '../elements/game-vanilla.webpack.js'
import './index.css'
```

Just like in the React tutorial we break this down into components, in this
case custom elements. Note that each element is included via `*.webpack.js`
file. This is just a convention where each such file contains all the
includes needed for that element. For example, the
`elements/board-vanilla.webpack.js` file contains both the CSS and the JS
needed to use the `<board-vanilla>` element. All custom elements must have
a '-' in their name, and I've adopted the convention of appending
'-vanilla'.

The `<square-vanilla>` element is the simplest custom element of all:

```javascript
window.customElements.define('square-vanilla', class extends HTMLElement {});
```

Defining such an element still has value as we can use it for styling,
and for detecting the source of events. For example, see `handleEvent()`
in the definition of the `board-vanilla` element:

```javascript
const template = (squares) => html`
<div class=boardRow>
  <square-vanilla index=0>${squares[0]}</square-vanilla>
  <square-vanilla index=1>${squares[1]}</square-vanilla>
  <square-vanilla index=2>${squares[2]}</square-vanilla>
</div>
<div class=boardRow>
  <square-vanilla index=3>${squares[3]}</square-vanilla>
  <square-vanilla index=4>${squares[4]}</square-vanilla>
  <square-vanilla index=5>${squares[5]}</square-vanilla>
</div>
<div class=boardRow>
  <square-vanilla index=6>${squares[6]}</square-vanilla>
  <square-vanilla index=7>${squares[7]}</square-vanilla>
  <square-vanilla index=8>${squares[8]}</square-vanilla>
</div>
`;

window.customElements.define('board-vanilla', class extends HTMLElement {
  set squares(s) {
    render(template(s), this);
  }

  connectedCallback() {
    this.addEventListener('click', this);
    this._upgradeProperty('squares');
  }

  disconnectedCallback() {
    this.removeEventListener('click', this);
  }

  handleEvent(e) {
    if (e.target.tagName != 'SQUARE-VANILLA') {
      return
    }
    if (e.target.textContent != '') {
      return
    }
    this.dispatchEvent(new CustomEvent('square-click', {bubbles: true, detail: +e.target.getAttribute('index')}));
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
});
```

The templating in both the `board-vanilla` and `game-vanilla` elements
is handled by the (lit-html)[https://github.com/PolymerLabs/lit-html] library.

The `game-vanilla` element only needs simple state management, so we just
define a simple `setState` function. If state management was more complex you
could always bring in a library such as (Redux)[https://redux.js.org/].

```javascript
window.customElements.define('game-vanilla', class extends HTMLElement {
  constructor() {
    super();
    this.state = {};
  }

  connectedCallback() {
    this.setState({
      history: [
        {
          squares: Array(9).fill('')
        }
      ],
      stepNumber: 0,
      xIsNext: true
      });
    this.addEventListener('square-click', this);
    this.addEventListener('click', this);
    }

  disconnectedCallback() {
    this.removeEventListener('square-click', this);
    this.removeEventListener('click', this);
  }

  setState(newState) {
    for (const key in newState) {
      this.state[key] = newState[key];
    }
    this.render();
  }

  render() {
    render(template(this.state), this);
  }

  handleEvent(e) {
    if (e.type == 'click' && e.target.nodeName == 'BUTTON') {
      this.jumpTo(+e.target.dataset.id);
    } else if (e.type == 'square-click') {
      this.clickSquare(e.detail);
    }
  }

  clickSquare(square) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[square]) {
      return;
    }
    squares[square] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

});
```

Compared to React code this is much more modular, the JS, CSS, and templates
for each component are all kept together.

The communication between components is slightly different than in the
original React code. In this rewrite, the `board-vanilla` element generates a
`square-click` event when a square has been clicked, and the index of the
square that's been clicked is passed along in the event detail. Events and DOM
position are two of the six surfaces you have at hand when stitching
applications together using custom elements. The full six are detailed in my
[Six Places](https://bitworking.org/news/2015/03/Six_Places) blog post.

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
