import { validators, defaultMessages } from '../src';

test('nest can process without values', () => {
    const schema = validators.compose(
        validators.requiredValue('x'),
        validators.nest('y', validators.requiredValue('x'))
    );

    expect(schema.validate({})).toEqual({
        x: defaultMessages.requiredValue,
        y: {
            x: defaultMessages.requiredValue,
        },
    });

    expect(schema.validate({ x: 1 })).toEqual({
        y: {
            x: defaultMessages.requiredValue,
        },
    });
});

test('nest can work with values', () => {
    const schema = validators.compose(validators.nest('y', validators.requiredNumber('x')));

    expect(schema.validate({ y: { x: 'string' } })).toEqual({
        y: {
            x: defaultMessages.requiredValue,
        },
    });
});

test('nest can work with valid values', () => {
    const schema = validators.compose(validators.nest('y', validators.requiredNumber('x')));

    expect(schema.validate({ y: { x: 42 } })).toBeUndefined();
});

test('nest does handle lodash paths', () => {
    const expectedError = { x: { y: { z: defaultMessages.requiredValue } } };

    let schema = validators.nest('x.y', validators.requiredNumber('z'));
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: { z: 42 } } })).toBeUndefined();

    schema = validators.nest(['x', 'y'], validators.requiredNumber('z'));
    expect(schema.validate({ x: false })).toEqual(expectedError);
    expect(schema.validate({ x: {} })).toEqual(expectedError);
    expect(schema.validate({ x: { y: { z: 42 } } })).toBeUndefined();
});
