const numberHelper = {
  round: (decimal, digits = 2) => {
    return parseFloat(decimal.toFixed(2));
  }
};

module.exports = numberHelper;
