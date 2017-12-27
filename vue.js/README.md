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
needed to use the `<post-van>` element.


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
