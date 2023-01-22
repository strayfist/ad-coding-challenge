import { ProductType } from "../types/products";

export const standardProductPricing: Record<ProductType, number> = {
  [ProductType.Classic]: 269.99,
  [ProductType.Standout]: 322.99,
  [ProductType.Premium]: 394.99,
};
