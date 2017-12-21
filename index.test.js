const validate = require('./');

it('checks $and properly', () => {
  const rule = { $and: ['a', 'b'] };

  expect(validate(rule, { a: 1, b: 1 })).toEqual(true);
  expect(validate(rule, { b: 1 })).toEqual(false);
});

it('checks $or properly', () => {
  const rule = { $or: ['a', 'b'] };

  expect(validate(rule, { b: 1 })).toEqual(true);
  expect(validate(rule, { a: 1, b: 1 })).toEqual(true);
  expect(validate(rule, { c: 1 })).toEqual(false);
});

it('checks nested $and properly', () => {
  const rule = { $and: [{ $and: ['a', 'b'] }, 'c'] };

  expect(validate(rule, { a: 1, b: 1, c: 1 })).toEqual(true);
  expect(validate(rule, { a: 1, c: 1 })).toEqual(false);
});

it('checks nested $or properly', () => {
  const rule = { $or: [{ $or: ['a', 'b'] }, 'c'] };

  expect(validate(rule, { c: 1 })).toEqual(true);
  expect(validate(rule, { b: 1 })).toEqual(true);
  expect(validate(rule, { d: 1 })).toEqual(false);
});

it('checks mixed nested rules properly', () => {
  const rule1 = { $and: [{ $or: ['a', 'b'] }, 'c'] };

  expect(validate(rule1, { a: 1, c: 1 })).toEqual(true);
  expect(validate(rule1, { b: 1, c: 1 })).toEqual(true);
  expect(validate(rule1, { d: 1 })).toEqual(false);

  const rule2 = { $or: [{ $and: ['a', 'b'] }, 'c'] };

  expect(validate(rule2, { a: 1, b: 1 })).toEqual(true);
  expect(validate(rule2, { c: 1 })).toEqual(true);
  expect(validate(rule2, { a: 1 })).toEqual(false);
});
