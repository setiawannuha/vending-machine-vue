export const formatCurrency = (
  value: number,
  currency: string = "IDR"
): string => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
  });
  return formatter.format(value).slice(0, -3);
};
