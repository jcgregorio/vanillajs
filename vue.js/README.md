Vue.js
======

This is a rewrite of the Vue.js sample app from [tutorialzine](https://tutorialzine.com/2016/08/building-your-first-app-with-vue-js).

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
    │   ├── images
    │   │   └── placeholder.png
    │   ├── post-van.css
    │   ├── post-van.js
    │   ├── post-van.webpack.js
    │   ├── subreddit-van.css
    │   ├── subreddit-van.js
    │   └── subreddit-van.webpack.js
    ├── Makefile
    ├── package.json
    ├── src
    │   ├── index.css
    │   ├── index.html
    │   └── index.js
    └── webpack.config.js


The `src` directory contains the starting code for the application, with
`index.js` being the entry point for webpack.

```javascript
import '../elements/subreddit-van.webpack.js'
import '../elements/post-van.webpack.js'
import './index.css'
```

Just like in the tutorialzine application the functionality is broken down
into two components, in this case we make them custom elements. Note that each
element is included via `*.webpack.js` file. This is just a convention where
each such file contains all the includes needed for that element. For example,
the `elements/post-van.webpack.js` file contains both the CSS and the JS
needed to use the `<post-van>` element. All custom elements must have
a '-' in their name, and I've adopted the convention of appending '-van' for
vanilla.


```javascript
import './post-van.css'
import './post-van.js'
```

The two elements also work in the same was as the tutorialize application, the
`<subreddit-van>` element takes a single attribute that controls which
subreddit it should query, and the `<post-van>` element has a single property
`item` that takes the parsed JSON description of a reddit post.

The CSS from the original article has remain mostly unchanged, outside of
breaking it into separate files so they can be logically associated with the
custom element they are styling.

Note that for both the implementations of post-van and subreddit-van could
have used a stand-alone templating library like
[lit-html](https://github.com/PolymerLabs/lit-html), but since the contents of
the elements don't change, there isn't much benefit.

The subreddit-van custom element registers for callbacks when its 'name'
attribute changes, and when it does change it uses the `fetch()` API to
retrieve the subreddit information and parcel it out to `post-van` child
elements.

```javascript
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
```

The implementation of `post-van` is even simpler, mostly being a single large
template literal.

```javascript
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

  // Used in the template literal for item().
  _getImageBackgroundCSS(img) {
    if (!img || img==='self' || img==='nsfw') {
      img = 'images/placeholder.png';
    }
    return `background-image: url(${ img })`;
  }

});
```


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
