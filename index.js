const reducers = {
  $and: (acc, val) => acc && val,
  $or: (acc, val) => acc || val,
};

const validateKeys = (rule, obj) => {
  const [ruleType] = Object.keys(rule);
  if (
    ruleType !== '$not' &&
    (!Array.isArray(rule[ruleType]) || !rule[ruleType].length)
  )
    throw new Error('invalid rule');
  return ruleType === '$not'
    ? !validateKeys(rule['$not'], obj)
    : rule[ruleType]
        .map(
          r =>
            typeof r === 'string'
              ? obj[r] !== undefined && obj[r] !== null
              : validateKeys(r, obj),
        )
        .reduce(reducers[ruleType], ruleType === '$and');
};

module.exports = validateKeys;
