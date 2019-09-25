Typescript
==========

Typescript is a superset of javascript that includes strong types. The typesystem is quite powerful 
and allows us to add extensive compile-time error checking, code generation, IDE hinting, and
type inference capabilities which speed us up. Ideally, it also helps our code be easier to discover
and understand without digging into implementation details.

# Learning / Improving your Typescript

## Introduction

[Getting Started with Typescript](https://www.typescriptlang.org/docs/home.html) is a guide that has several 
paths to learning, inluding examples, walkthrus and overviews.

## Advanced Types

[Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) cover union, intersection,
mapped types, types involving key ranges, and more, built into the language as primitives!

## Very Advanced Types

[Typescript Toolbelt](https://www.typescriptlang.org/docs/handbook/advanced-types.html) is one of many
typescript libraries that offer user defined type primitives for combining types, generating new types
based off of known type shapes and function signatures, and generally allowing for more advanced type
concepts without needing to write the boilerplate ones self.

# Usage of Typescript in this Project

We use typescript to compile the backend and front end code into runnable javascript. Here are the main
pieces that you should be aware of:

- [tsconfig.json](../tsconfig.json) - the settings used by the typescript compiler
- [package.json](../package.json) - this contains our dependencies on several libraries related to ts:
    - typescript and the tsc compiler itself
    - @types/[some package] which often contain typescript definitions for an otherwise plain js package
    - ts-node - a way to run typescript with JIT compile, instead of an explicit filesystem compile up front
- [weboack.config.js](../webpack.config.js) - we specify how typescript is invoked during the webpack process
- [test/mocha.opts](../test/mocha.opts) - we configure the mocha unit test framework to invoke typescript
- [.nycrc](../.nycrc) - we tell our code coverage tools to leveral typescript and sourcemapping

For production, we compile typescript into a server app in the dist folder; and we webpack the client frontend
into the same folder, up front.

For development, we JIT compile the front end and the backend so that they can respond to change faster when
running `hp clientDev` and `hp serverDev` which auto recompile upon file change.