import { standardProductPricing } from "../../config/pricing-config";
import { BuyXForYPricingRuleConfig } from "../../types/pricing-rules/buy-x-for-y";
import { Product } from "../../types/products";
import { BasePricingRule } from "./base-pricing-rule";

export class BuyXForYPricingRule extends BasePricingRule {
  constructor(private options: BuyXForYPricingRuleConfig) {
    super();
  }

  applyRuleToCart = (
    cart: Product[],
    currentCartPrice: number,
    customer?: string | undefined
  ): number => {
    if (customer === undefined) {
      return currentCartPrice;
    }
    // ensure this pricing rule only applies to the correct customers
    if (!this.options.applyToCustomers.includes(customer)) {
      return currentCartPrice;
    }

    // work out the number of free products by counting how many groups of X there are
    const countOfApplicableProducts = cart.filter(
      (product) => product.productType === this.options.productType
    ).length;
    const freeProductsCount = Math.floor(
      countOfApplicableProducts / this.options.receiveQuantity
    );
    const freeProductPrice = standardProductPricing[this.options.productType];
    return currentCartPrice - freeProductsCount * freeProductPrice;
  };
}
