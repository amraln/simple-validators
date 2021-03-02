import { validators, defaultMessages } from '../src';

test('requiredNumber returns undefined on valid', () => {
    const schema = validators.requiredNumber('x');
    expect(schema.validate({ x: 42, y: 21 })).toBeUndefined();
    expect(schema.validate({ x: 42.42 })).toBeUndefined();
});

test('requiredNumber returns default message on error', () => {
    const schema = validators.requiredNumber('x');
    expect(schema.validate({ y: 42 })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredNumber returns custom message on error', () => {
    const schema = validators.requiredNumber('x', 'custom message');
    expect(schema.validate({ y: 42 })).toEqual({ x: 'custom message' });
});

test('requiredNumber takes undefined as errored value', () => {
    const schema = validators.requiredNumber('x');
    expect(schema.validate({ x: undefined })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredNumber takes null as errored value', () => {
    const schema = validators.requiredNumber('x');
    expect(schema.validate({ x: null })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredNumber takes string as errored value', () => {
    const schema = validators.requiredNumber('x');
    expect(schema.validate({ x: 'test' })).toEqual({ x: defaultMessages.requiredValue });
    expect(schema.validate({ x: '' })).toEqual({ x: defaultMessages.requiredValue });
    expect(schema.validate({ x: '42' })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredNumber does not takes 0 as errored value', () => {
    const schema = validators.requiredNumber('x');
    expect(schema.validate({ x: 0 })).toBeUndefined();
    expect(schema.validate({ x: 0.0 })).toBeUndefined();
});

test('requiredNumber takes false as errored value', () => {
    const schema = validators.requiredNumber('x');
    expect(schema.validate({ x: false })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredNumber does handle lodash paths', () => {
    const expectedError = { x: { y: defaultMessages.requiredValue } };

    let schema = validators.requiredNumber('x.y');
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: 1 } })).toBeUndefined();

    schema = validators.requiredNumber(['x', 'y']);
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: 1 } })).toBeUndefined();
});
