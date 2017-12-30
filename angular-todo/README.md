Angular TODO
============

This is a rewrite of the TODO sample app from
[Angular](https://angularjs.org/#add-some-control).


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

    ├── Makefile
    ├── package.json
    ├── src
    │   ├── index.css
    │   ├── index.html
    │   └── index.js
    └── webpack.config.js
