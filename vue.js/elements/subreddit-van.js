window.customElements.define('subreddit-van', class extends HTMLElement {
  // Only get callbacks when our 'name' attribute changes.
  static get observedAttributes() { return ['name']; }

  // Called when our 'name' attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (newValue === '') {
      return
    }
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

  // Provide default content before the reddit content is loaded.
  connectedCallback() {
    this.textContent = 'Loading...';
  }
});
