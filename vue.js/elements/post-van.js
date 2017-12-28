window.customElements.define('post-van', class extends HTMLElement {
  // Called when our 'item' property is set.
  set item(it) {
    this.innerHTML = `
      <a  href="${it.data.url}" style="${this._getImageBackgroundCSS(it.data.thumbnail)}"
    target="_blank" class="thumbnail"></a>

      <div class="details">
        <a href="${it.data.url}" title="${it.data.title}" target="_blank" class="title">
        ${ it.data.title.substring(0, 60) }
        </a>

        <div class="action-buttons">
          <a href="http://reddit.com${ it.data.permalink }" title="Vote">
            <i class="material-icons">thumbs_up_down</i>
            ${it.data.score}
          </a>

          <a href="http://reddit.com${ it.data.permalink }" title="Go to discussion">
            <i class="material-icons">forum</i>
            ${it.data.num_comments}
          </a>
        </div>
      </div>
    `;
  }

  // Used in the template literal.
  _getImageBackgroundCSS(img) {
    if (!img || img==='self' || img==='nsfw') {
      img = 'images/placeholder.png';
    }
    return `background-image: url(${ img })`;
  }

});
