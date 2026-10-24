export const exchangeRatesToUSD = {
  USD: 1,
  EUR: 1.09,
  GBP: 1.30,
  CAD: 0.72,
  AUD: 0.65,
  SGD: 0.74,
  MYR: 0.22,
  PHP: 0.017,
  JPY: 0.0066,
  IDR: 0.000063
};

export const formatCurrency = (amount, currencyCode) => {
  const noDecimals = currencyCode === 'IDR' || currencyCode === 'JPY';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: noDecimals ? 0 : 2
  }).format(amount);
};

export const convertCurrency = (amount, fromCode, toCode) => {
  if (fromCode === toCode) return amount;
  const fromRate = exchangeRatesToUSD[fromCode] || 1;
  const toRate = exchangeRatesToUSD[toCode] || 1;
  const amountInUSD = amount * fromRate;
  return amountInUSD / toRate;
};
