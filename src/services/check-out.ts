import { standardProductPricing } from "../config/pricing-config";
import { Product } from "../types/products";
import { BasePricingRule } from "./pricing-rules/base-pricing-rule";

/**
 * Optional configuration when calculating total that is used in conjuction with
 * pricing rules to enable special pricing.
 */
type CheckoutTotalOptions = {
  customer?: string;
};

/**
 * Manages the shopping cart items and the calculation of the total price
 */
export class Checkout {
  private cart: Product[] = [];

  constructor(private pricingRules: BasePricingRule[] = []) {}

  public add = (product: Product) => {
    this.cart.push(product);
  };

  public total = ({ customer }: CheckoutTotalOptions = {}) => {
    if (this.cart.length === 0) {
      return 0;
    }

		// calculate the standard price without any discounting
    const cartPriceStandard = this.cart.reduce(
      (currentTotal: number, currentItem: Product) => {
        const currentItemPrice = standardProductPricing[currentItem.productType];
        return currentTotal + currentItemPrice;
      },
      0
    );

		// apply each pricing rule to the current price
    let currentCartPrice = cartPriceStandard;
    for (const pricingRule of this.pricingRules) {
      currentCartPrice = pricingRule.applyRuleToCart(
        this.cart,
        currentCartPrice,
        customer
      );
    }

    return currentCartPrice;
  };
}
