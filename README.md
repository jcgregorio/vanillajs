VanillaJS
=========

The repo contains sample projects that were originally implemented in
a JavaScript framework and have been reimplemented here using vanilla JS.
The point of this project is to show the native power of the browser and to
try to dispel the notion that building for the web requires a framework.


Caveats
=======

This code works w/o polyfils in Chrome. To get it to run in a wider range of
browsers you will need to add polyfills and, depending on the target browser
version, compile the JS back to an older version of ES, and run a prefixer on
the CSS. The wider the target set of browsers and the older the versions you
are targeting the more processing you will need to do via webpack, but since
the original code doesn't need to change, those extra processing steps are out
of scope for these examples.
