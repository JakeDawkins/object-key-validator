# object-key-validator

check objects for the existence of certain keys

## API

### `validateKeys`

`(rule: Rule, obj: Object) => boolean`

Accepts a rule definition and a test object. If the rule definition is invalid, the validation function will throw.

## Rule Types

There are three rule types: `$and`, `$or`, and `$not`. Rules can be nested (as shown below).

### `$and`

Checks an array of rules. If _all_ of the rules pass, validation returns true.

**Examples**

```
// checks to make sure an object has BOTH `a` AND `b` keys
// logically: (a && b)
{ $and: ['a', 'b'] }

// checks to make sure an object has `a`, `b`, AND `c` keys
// logically: (a && (b && c))
{
  $and: [
    'a',
    { $and: ['b', 'c']}
  ]
}
```

### `$or`

Checks an array of rules. If _one or more_ of the rules pass, validation returns true.

**Examples**

```
// checks to make sure an object has EITHER `a` OR `b` keys
// logically: (a || b)
{ $or: ['a', 'b'] }

// checks to make sure an object has either an `a` key OR a `b` AND `c` key
// logically: (a || (b && c))
{
  $or: [
    'a',
    { $and: ['b', 'c']}
  ]
}
```

### `$not`

Inverts the response value of a _single_ rule. `$not` does **not** accept an array of conditions like `$and` and `$or`.

**Examples**

```
// checks to make sure an object doesn't have EITHER `a` OR `b` keys
// logically: !(a || b)
{ $not: { $or: ['a', 'b'] } }

// checks to make sure an object doesn't have either an `a` key OR a `b` AND `c` key
// logically: !(a || (b && c))
{
  $not: {
    $or: [
      'a',
      { $and: ['b', 'c']}
    ]
  }
}
```
