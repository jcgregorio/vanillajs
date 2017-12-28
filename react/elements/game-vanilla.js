import { html, render } from '../node_modules/lit-html/lib/lit-extended.js'

// Declare some functions that are used in the template.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function statusFrom(squares, xIsNext) {
  let winner = calculateWinner(squares);
  if (winner) {
    return `Winner: ${winner}`;
  } else {
    let player = xIsNext ? "X" : "O";
    return `Next player: ${player}`;
  }
}

function desc(move) {
	if (move !== 0) {
		return `Go to move #${move}`;
	}	else {
		return 'Go to game start';
	}
}

function squaresFrom(state) {
  return state.history[state.stepNumber].squares;
}

const template = (state) => html`
  <board-vanilla squares=${squaresFrom(state)}></board-vanilla>
  <div className="game-info"></div>
	<div>${statusFrom(squaresFrom(state), state.xIsNext)}</div>
	<ol>
    ${state.history.map((step, move) => html`<li><button data-id$=${move}>${desc(move)}</button></li>`)}
	</ol>`;

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
