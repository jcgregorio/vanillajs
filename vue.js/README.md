Vue.js
======

This is a rewrite of the Vue.js sample app from (tutorialzine)[https://tutorialzine.com/2016/08/building-your-first-app-with-vue-js].

Prereqs
=======

You should have the following installed:

1. Node - A version late enough to have npx.
2. Yarn.

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


Caveats
=======

1. The `webpack.config.js` builds a developement version of the code, no
   minimization or other optimizations are done to JS, HTML, CSS, or images.
2. This code works w/o polyfils in Chrome. To get it to run in a wider range
   of browsers you will need to add polyfills and, depending on the target
   browser version, compile the JS back to an older version of ES, and run a
   prefixer on the CSS. The wider the target set of browsers and the older the
   versions you are targeting the more processing you will need to do via
   WebPack, but since the original code doesn't need to change, those extra
   processing steps are out of scope for this example.
