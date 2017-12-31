VanillaJS
=========

The repo contains sample projects that were originally implemented in
a JavaScript framework and have been reimplemented here using vanilla JS.
The point of this project is to show the native power of the browser and to
try to dispel the notion that building for the web requires a framework.

There are two ported projects so far:

Vue.js
------

The [Vue.js sample app rewrite](https://github.com/jcgregorio/vanillajs/tree/master/vue.js)
is the simplest port, using no external libraries at all, and using template
literals for templating.

React
-----

The [React sample app rewrite](https://github.com/jcgregorio/vanillajs/tree/master/react)
uses only one additional library,
[lit-html](https://github.com/PolymerLabs/lit-html) for templating.

Angular TODO
------------

The [Angular TODO app rewrite](https://github.com/jcgregorio/vanillajs/tree/master/angular-todo)
uses only one additional library,
[hyperHTML](https://github.com/WebReflection/hyperHTML) for templating.

Caveats
=======

This code works w/o polyfils in Chrome. To get it to run in a wider range of
browsers you will need to add polyfills and, depending on the target browser
version, compile the JS back to an older version of ES, and run a prefixer on
the CSS. The wider the target set of browsers and the older the versions you
are targeting the more processing you will need to do via webpack, but since
the original code doesn't need to change, those extra processing steps are out
of scope for these examples.
