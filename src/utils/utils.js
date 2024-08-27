export const formatRupiah = (number) => {
  return new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(number);
};
