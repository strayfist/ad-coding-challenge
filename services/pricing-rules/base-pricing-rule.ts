import { Product } from "../../types/products";

export abstract class BasePricingRule {
  /**
   * Apply this pricing rule to the cart and return the new cart price
   */
  abstract applyRuleToCart(
    cart: Product[],
    currentCartPrice: number,
    customer?: string
  ): number;
}
