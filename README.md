# map-many
![logo](https://avatars1.githubusercontent.com/u/31987273?v=4&s=100)

map each item of an iterable sequence to many items 

[![NPM version][npm-image]][npm-url]
[![Travis Status][travis-image]][travis-url]
[![Travis Status][codecov-image]][codecov-url]

## Usage

_package requires a system that supports async-iteration, either natively or via down-compiling_

### Install
```
npm install @async-generators/map-many --save
yarn add @async-generators/map-many
```

This package's `main` entry points to a `commonjs` distribution. 

Additionally, the `module` entry points to a `es2015` distribution, which can be used by build systems, such as webpack, to directly use es2015 modules. 

## Api

### mapMany(source, selector)

<code>mapMany()</code> iterates the source and yields each item of  iterable sequence returned by `await selector(item, index)`  

`source` must have a `[Symbol.asyncIterator]` or `[Symbol.iterator]` property. If both are present only `[Symbol.asyncIterator]` is used. 

`selector(item, index)` should return an iterable sequence. The second parameter is the `index` of the item as it appeared in the source sequence. 

## Example

example.js
```js
const mapMany = require('@async-generators/map-many').default;

async function main() {
  async function* source() {
    yield "John";
  }
  async function* greet(name) {
    yield "Hello"; yield name; 
  }
  for await (let item of mapMany(source(), (x)=>greet(x))) {
    console.log(item);
  }
}

main();

```

Execute with the latest node.js: 

```
node --harmony-async-iteration example.js
```


output:
```
Hello 
John
```
## Typescript

This library is fully typed and can be imported using: 

```ts
import mapMany from '@async-generators/map-many');
```

It is also possible to directly execute your [properly configured](https://stackoverflow.com/a/43694282/1657476) typescript with [ts-node](https://www.npmjs.com/package/ts-node):

```
ts-node --harmony_async_iteration foo.ts
```

[npm-url]: https://npmjs.org/package/@async-generators/map-many
[npm-image]: https://img.shields.io/npm/v/@async-generators/map-many.svg
[npm-downloads]: https://img.shields.io/npm/dm/@async-generators/map-many.svg
[travis-url]: https://travis-ci.org/async-generators/map-many
[travis-image]: https://img.shields.io/travis/async-generators/map-many/master.svg
[codecov-url]: https://codecov.io/gh/async-generators/map-many
[codecov-image]: https://codecov.io/gh/async-generators/map-many/branch/master/graph/badge.svg
