import { useMemo } from "react";

export const useDiscount = (cart, promo) => {
  return useMemo(
    () =>
      promo?.length > 0
        ? Math.floor(
            (cart
              ?.filter((val) => {
                if (
                  promo
                    .map(({ category_name }) => category_name)
                    .includes(val.category_name)
                )
                  return true;
                else return false;
              })
              ?.filter((val) => val.stock > 0)
              ?.map((val) => {
                return val.price * val.quantity * (1 - val.discount);
              })
              .reduce((a, b) => a + b, 0) *
              Number(promo[0]?.discount_rate)) /
              100
          )
        : 0,
    [cart, promo]
  );
};
export const useTotalBeforeDiscount = (cart) =>
  useMemo(
    () =>
      cart?.length > 0
        ? cart
            ?.filter((val) => val.stock > 0)
            ?.map((val) => {
              return val.price * val.quantity * (1 - val.discount);
            })
            ?.reduce((a, b) => a + b, 0)
        : 0,
    [cart]
  );
