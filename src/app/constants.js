export const ITEMS_PER_PAGE = 10;

export function discountedPrice(item) {
  return (
    Number(item?.price) *
    (1 - Number(item?.discountPercentage) / 100)
  ).toFixed(2);
}

export function subTotalPrice(items) {
  return items
    ?.reduce(
      (amount, item) =>
        item
          ? amount + (discountedPrice(item.product) * Number(item.quantity) || 0)
          : amount,
      0
    )
    .toFixed(2);
}
