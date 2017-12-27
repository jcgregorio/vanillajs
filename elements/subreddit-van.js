window.customElements.define('subreddit-van', class extends HTMLElement {
  static get observedAttributes() { return ['name']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'name' && newValue != '') {
      fetch(`https://www.reddit.com/r/${ newValue }/top.json?limit=5`).then(resp => {
        resp.json().then(json => {
          this.innerHTML=`<h2>${ newValue.toUpperCase() }</h2>`;
          json.data.children.forEach(item => {
            let ele = document.createElement('post-van');
            ele.item = item;
            this.appendChild(ele);
          });
        });
      });
    }
  }

  connectedCallback() {
    this.textContent = 'Loading...';
  }
});
