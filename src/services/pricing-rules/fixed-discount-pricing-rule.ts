import { standardProductPricing } from "../../config/pricing-config";
import { FixedDiscountPricingRuleConfig } from "../../types/pricing-rules/fixed-discount";
import { Product } from "../../types/products";
import { BasePricingRule } from "./base-pricing-rule";

/**
 * DiscountedProductType pricing rule - allows a fixed price discount per ad for a specific customer & product type
 * eg. "Customer gets a discount on Stand out Ads where the price drops to $299.99 per ad"
 */
export class FixedDiscountPricingRule extends BasePricingRule {
  constructor(private options: FixedDiscountPricingRuleConfig) {
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
    if (!this.options.applyToCustomers.includes(customer)) {
      return currentCartPrice;
    }

    const countOfApplicableProducts = cart.filter(
      (product) => product.productType === this.options.productType
    ).length;
    const totalDiscount =
      (standardProductPricing[this.options.productType] -
        this.options.discountedPricePerAd) *
      countOfApplicableProducts;

    return currentCartPrice - totalDiscount;
  };
}
