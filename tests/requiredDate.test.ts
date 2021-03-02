import { validators, defaultMessages } from '../src';

test('requiredDate returns undefined on valid', () => {
    const schema = validators.requiredDate('x');
    expect(schema.validate({ x: new Date(), y: 21 })).toBeUndefined();
    expect(schema.validate({ x: new Date().toDateString(), y: 21 })).toBeUndefined();
});

test('requiredDate returns default message on error', () => {
    const schema = validators.requiredDate('x');
    expect(schema.validate({ y: 'invalid' })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredDate returns custom message on error', () => {
    const schema = validators.requiredDate('x', 'custom message');
    expect(schema.validate({ y: 'invalid' })).toEqual({ x: 'custom message' });
});

test('requiredDate takes undefined as errored value', () => {
    const schema = validators.requiredDate('x');
    expect(schema.validate({ x: undefined })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredDate takes an empty string as errored value', () => {
    const schema = validators.requiredDate('x');
    expect(schema.validate({ x: '' })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredDate takes null as errored value', () => {
    const schema = validators.requiredDate('x');
    expect(schema.validate({ x: null })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredDate takes 0 as errored value', () => {
    const schema = validators.requiredDate('x');
    expect(schema.validate({ x: 0 })).toEqual({ x: defaultMessages.requiredValue });
    expect(schema.validate({ x: 0.0 })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredDate takes false as errored value', () => {
    const schema = validators.requiredDate('x');
    expect(schema.validate({ x: false })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredDate does handle lodash paths', () => {
    const expectedError = { x: { y: defaultMessages.requiredValue } };

    let schema = validators.requiredDate('x.y');
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: new Date() } })).toBeUndefined();

    schema = validators.requiredDate(['x', 'y']);
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: new Date() } })).toBeUndefined();
});
