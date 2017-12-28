import { html, render } from '../node_modules/lit-html/lit-html.js'

function desc(move) {
	if (move !== 0) {
		return `Go to move #${move}`;
	}	else {
		return 'Go to game start';
	}
}

const template = (status, history) => html`
	<div>${status}</div>
	<ol>
    ${history.map((step, move) => html`<li><button data-id=${move}>${desc(move)}</button></li>`)}
	</ol>`;

window.customElements.define('game-vanilla', class extends HTMLElement {
	constructor() {
		super();
		this.state = {};
	}

  connectedCallback() {
    this.innerHTML = `<board-vanilla></board-vanilla>
			<div className="game-info">
			</div>`;
		this.board = this.getElementsByTagName('board-vanilla')[0];
		this.gameInfo = this.getElementsByTagName('div')[0];
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

	setState(newState) {
    for (const key in newState) {
			this.state[key] = newState[key];
		}
    this.render();
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = this.calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    this.board.squares = this.state.history[this.state.stepNumber].squares;
    render(template(status, history), this.gameInfo);
	}

  disconnectedCallback() {
    this.removeEventListener('square-click', this);
  }

	handleEvent(e) {
    console.log(e);
    if (e.type == 'click' && e.target.nodeName == 'BUTTON') {
			let step = +e.target.dataset.id;
			this.setState({
				stepNumber: step,
				xIsNext: (step % 2) === 0,
			});
		} else if (e.type == 'square-click') {
			const history = this.state.history.slice(0, this.state.stepNumber + 1);
			const current = history[history.length - 1];
			const squares = current.squares.slice();
			if (this.calculateWinner(squares) || squares[e.detail]) {
				return;
			}
			squares[e.detail] = this.state.xIsNext ? "X" : "O";
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
	}

	jumpTo(step) {
		this.setState({
      stepNumber: step,
		  xIsNext: (step % 2) === 0,
		});
	}

	calculateWinner(squares) {
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
});
