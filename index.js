const reducers = {
  $and: (acc, val) => acc && val,
  $or: (acc, val) => acc || val,
};

const validateKeys = (rule, obj) => {
  if (!obj || !Object.keys(obj).length) return false;
  const ruleType = Object.keys(rule)[0];
  if (!Array.isArray(rule[ruleType]) || !rule[ruleType].length)
    throw new Error('invalid rule');
  return rule[ruleType]
    .map(
      r =>
        typeof r === 'string' ? obj[r] !== undefined : validateKeys(r, obj),
    )
    .reduce(reducers[ruleType], ruleType === '$and');
};

module.exports = validateKeys;
