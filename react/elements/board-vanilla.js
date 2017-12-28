import { html, render } from '../node_modules/lit-html/lit-html.js'

window.customElements.define('square-vanilla', class extends HTMLElement {});

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
    console.log(s);
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
