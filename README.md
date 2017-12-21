# object-key-validator

check objects for the existence of certain keys

## Example

```
import validateKeys from 'object-key-validator';

const rule = { $or: ['a', 'b'] };
validate(rule, { b: 1 }); // true
```
