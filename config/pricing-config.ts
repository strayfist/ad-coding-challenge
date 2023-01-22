import { BasePricingRule } from "../services/pricing-rules/base-pricing-rule";
import { BuyXForYPricingRule } from "../services/pricing-rules/buy-x-for-y-pricing-rule";
import { FixedDiscountPricingRule } from "../services/pricing-rules/fixed-discount-pricing-rule";
import { ProductType } from "../types/products";

export const standardProductPricing: Record<ProductType, number> = {
  [ProductType.Classic]: 269.99,
  [ProductType.Standout]: 322.99,
  [ProductType.Premium]: 394.99,
};

export const defaultPricingRules: BasePricingRule[] = [
  new BuyXForYPricingRule({
    applyToCustomers: ["SecondBite"],
    receiveQuantity: 3,
    payForQuantity: 2,
    productType: ProductType.Classic,
  }),
  new FixedDiscountPricingRule({
    applyToCustomers: ["AxilCoffeeRoasters"],
    productType: ProductType.Standout,
    discountedPricePerAd: 299.99,
  }),

  new BuyXForYPricingRule({
    applyToCustomers: ["MYER"],
    receiveQuantity: 5,
    payForQuantity: 4,
    productType: ProductType.Standout,
  }),
  new FixedDiscountPricingRule({
    applyToCustomers: ["MYER"],
    productType: ProductType.Premium,
    discountedPricePerAd: 389.99,
  }),
];
