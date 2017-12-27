function getImageBackgroundCSS(img) {
  if (img && img!='self' && img!='nsfw') {
    return 'background-image: url(' + img + ')';
  } else {
    return 'background-image: url(images/placeholder.png)';
  }
}

window.customElements.define('post-van', class extends HTMLElement {
  set item(it) {
    this.innerHTML = `
      <a  href="${it.data.url}" style="${getImageBackgroundCSS(it.data.thumbnail)}"
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
});
