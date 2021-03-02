import { validators, defaultMessages } from '../src';

test('requiredString returns undefined on valid', () => {
    const schema = validators.requiredString('x');
    expect(schema.validate({ x: 'test', y: 21 })).toBeUndefined();
});

test('requiredString returns default message on error', () => {
    const schema = validators.requiredString('x');
    expect(schema.validate({ y: 42 })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredString returns custom message on error', () => {
    const schema = validators.requiredString('x', 'custom message');
    expect(schema.validate({ y: 42 })).toEqual({ x: 'custom message' });
});

test('requiredString takes undefined as errored value', () => {
    const schema = validators.requiredString('x');
    expect(schema.validate({ x: undefined })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredString takes an empty string as errored value', () => {
    const schema = validators.requiredString('x');
    expect(schema.validate({ x: '' })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredString takes null as errored value', () => {
    const schema = validators.requiredString('x');
    expect(schema.validate({ x: null })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredString takes 0 as errored value', () => {
    const schema = validators.requiredString('x');
    expect(schema.validate({ x: 0 })).toEqual({ x: defaultMessages.requiredValue });
    expect(schema.validate({ x: 0.0 })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredString takes false as errored value', () => {
    const schema = validators.requiredString('x');
    expect(schema.validate({ x: false })).toEqual({ x: defaultMessages.requiredValue });
});

test('requiredString does handle lodash paths', () => {
    const expectedError = { x: { y: defaultMessages.requiredValue } };

    let schema = validators.requiredString('x.y');
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: 'test' } })).toBeUndefined();

    schema = validators.requiredString(['x', 'y']);
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: 'test' } })).toBeUndefined();
});
