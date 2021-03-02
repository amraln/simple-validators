import { validators, defaultMessages } from '../src';

test('requiredValue returns undefined on valid', () => {
    const schema = validators.requiredValue('x');
    expect(schema.validate({ x: 42, y: 21 })).toBeUndefined();
});

test('requiredValue returns default message on error', () => {
    const schema = validators.requiredValue('x');
    expect(schema.validate({ y: 42 })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredValue returns custom message on error', () => {
    const schema = validators.requiredValue('x', 'custom message');
    expect(schema.validate({ y: 42 })).toEqual({ x: 'custom message' });
});

test('requiredValue takes undefined as errored value', () => {
    const schema = validators.requiredValue('x');
    expect(schema.validate({ x: undefined })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredValue takes null as errored value', () => {
    const schema = validators.requiredValue('x');
    expect(schema.validate({ x: null })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredValue does not takes an empty string as errored value', () => {
    const schema = validators.requiredValue('x');
    expect(schema.validate({ x: '' })).toBeUndefined();
});

test('requiredValue does not takes 0 as errored value', () => {
    const schema = validators.requiredValue('x');
    expect(schema.validate({ x: 0 })).toBeUndefined();
    expect(schema.validate({ x: 0.0 })).toBeUndefined();
});

test('requiredValue does not takes false as errored value', () => {
    const schema = validators.requiredValue('x');
    expect(schema.validate({ x: false })).toBeUndefined();
});

test('requiredValue does handle lodash paths', () => {
    const expectedError = { x: { y: defaultMessages.requiredValue } };

    let schema = validators.requiredValue('x.y');
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: 1 } })).toBeUndefined();

    schema = validators.requiredValue(['x', 'y']);
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: 1 } })).toBeUndefined();
});
