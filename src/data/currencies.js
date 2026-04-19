export const exchangeRatesToUSD = {
  USD: 1,
  EUR: 1.09,
  SGD: 0.74,
  IDR: 0.000063,
  MYR: 0.21
};

export const formatCurrency = (amount, currencyCode) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: currencyCode === 'IDR' ? 0 : 2
  }).format(amount);
};

export const convertCurrency = (amount, fromCode, toCode) => {
  if (fromCode === toCode) return amount;
  const amountInUSD = amount * exchangeRatesToUSD[fromCode];
  return amountInUSD / exchangeRatesToUSD[toCode];
};
