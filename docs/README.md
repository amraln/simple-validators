# @amille/simple-validators

[![circleci](https://img.shields.io/circleci/build/github/amille44420/simple-validators?style=for-the-badge)][circleci]
[![codecov](https://img.shields.io/codecov/c/github/amille44420/simple-validators?style=for-the-badge)][codecov]
[![npm](https://img.shields.io/npm/v/@amille/simple-validators/latest?style=for-the-badge)][npm]
[![npm-bundle](https://img.shields.io/bundlephobia/min/@amille/simple-validators?label=minified%20size&style=for-the-badge)][npm-bundle]

[circleci]: https://app.circleci.com/pipelines/github/amille44420/simple-validators
[codecov]: https://app.codecov.io/gh/amille44420/simple-validators
[npm]: https://www.npmjs.com/package/@amille/simple-validators
[npm-bundle]: https://www.npmjs.com/package/@amille/simple-validators

Simple synchronous data validation. This library requires  [Day.js] and [lodash] to work.

[Day.js]: https://day.js.org/
[lodash]: https://lodash.com/

## Installation

```bash
# using npm
npm install @amille/simple-validators

# or using yarn
yarn add @amille/simple-validators
```


## Usage

```js
// import the validators
const { validators } = require('@amille/simple-validators');
// or
import { validators } from '@amille/simple-validators';

// compose your schema validation
const schema = validators.compose(
    validators.requiredString('firstName'),
    validators.requiredNumber('age'),
);

// run the validation
const errors = schema.validate({ firstName: 'Henry' });

// errors here should be equals to { 'age': 'Required' }
```
