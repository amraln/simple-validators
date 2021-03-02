import { validators, defaultMessages } from '../src';

test('compose can process without validators', () => {
    const schema = validators.compose();
    expect(schema.validate({})).toBeUndefined();
    expect(schema.validate({ x: 1 })).toBeUndefined();
});

test('compose properly dispatch for multiple validators', () => {
    const schema = validators.compose(validators.requiredValue('x'), validators.requiredValue('y'));
    expect(schema.validate({ x: 1, y: 2 })).toBeUndefined();
    expect(schema.validate({ x: 1 })).toEqual({ y: defaultMessages.requiredValue });
});

test('compose can be nested', () => {
    const schema = validators.compose(validators.requiredValue('x'), validators.compose(validators.requiredValue('y')));
    expect(schema.validate({ x: 1, y: 2 })).toBeUndefined();
    expect(schema.validate({ x: 1 })).toEqual({ y: defaultMessages.requiredValue });
});
