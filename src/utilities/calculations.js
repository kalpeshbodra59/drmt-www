exports.getPercentage = (first, second) => {
  if (!first || first === 0 || !second || second === 0) return 0;
  return ((first / second) * 100).toFixed(2);
};