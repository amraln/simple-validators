# @amille/simple-validators

![CircleCI](https://img.shields.io/circleci/build/github/amille44420/simple-validators?style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/amille44420/simple-validators?style=for-the-badge)
![npm (scoped with tag)](https://img.shields.io/npm/v/amille/simple-validators/latest?style=for-the-badge)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/amille/simple-validators?label=minified%20size&style=for-the-badge)

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
