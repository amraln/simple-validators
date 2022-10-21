import { validators, defaultMessages } from '../src';

test('forEach returns undefined on valid for an array', () => {
    const schema = validators.forEach('x', validators.requiredNumber('y'));
    expect(schema.validate({ x: [] })).toBeUndefined();
    expect(schema.validate({ x: [{ y: 42 }] })).toBeUndefined();
    expect(schema.validate({ x: [{ y: 42 }, { y: 0 }] })).toBeUndefined();
});

test('forEach returns undefined on valid for an objet', () => {
    const schema = validators.forEach('x', validators.requiredNumber('y'));
    expect(schema.validate({ x: {} })).toBeUndefined();
    expect(schema.validate({ x: { z: { y: 42 } } })).toBeUndefined();
    expect(schema.validate({ x: { z: { y: 42 }, b: { y: 0 } } })).toBeUndefined();
});

test('forEach returns errors for each invalid item for an array', () => {
    const schema = validators.forEach('x', validators.requiredNumber('y'));
    const error = { y: defaultMessages.requiredValue };
    expect(schema.validate({ x: [{}] })).toEqual({ x: [error] });
    expect(schema.validate({ x: [{}, { y: 42 }] })).toEqual({ x: [error] });
    expect(schema.validate({ x: [{ y: 42 }, {}] })).toEqual({ x: [undefined, error] });
    expect(schema.validate({ x: [{}, { y: 42 }, {}] })).toEqual({ x: [error, undefined, error] });
});

test('forEach returns errors for each invalid item for an object', () => {
    const schema = validators.forEach('x', validators.requiredNumber('y'));
    const error = { y: defaultMessages.requiredValue };
    expect(schema.validate({ x: { z: {} } })).toEqual({ x: { z: error } });
    expect(schema.validate({ x: { z: {}, a: { y: 42 } } })).toEqual({ x: { z: error } });
});

test('forEach does handle lodash paths', () => {
    const expectedError = { x: { y: [{ z: defaultMessages.requiredValue }] } };

    let schema = validators.forEach('x.y', validators.requiredString('z'));
    expect(schema.validate({ x: { y: [{}] } })).toEqual(expectedError);
    expect(schema.validate({ x: { y: [{ z: 'string' }] } })).toBeUndefined();

    schema = validators.forEach(['x', 'y'], validators.requiredString('z'));
    expect(schema.validate({ x: { y: [{}] } })).toEqual(expectedError);
    expect(schema.validate({ x: { y: [{ z: 'string' }] } })).toBeUndefined();
});

test('forEach properly resolve relative paths when nested multiple time', () => {
    const schema = validators.compose(
        validators.forEach('array', validators.forEach('subArray', validators.requiredString('field')))
    );

    expect(schema.validate({ array: [] })).toBeUndefined();
    expect(schema.validate({ array: [{}] })).toBeUndefined();
    expect(schema.validate({ array: [{ subArray: [] }] })).toBeUndefined();
    expect(schema.validate({ array: [{ subArray: [{}] }] })).toEqual({
        array: [{ subArray: [{ field: defaultMessages.requiredValue }] }],
    });
    expect(schema.validate({ array: [{ subArray: [{ field: 'string' }] }] })).toBeUndefined();
});
