import { standardProductPricing } from "../../config/pricing-config";
import { DiscountedProductTypePricingRuleConfig } from "../../types/pricing-rules/discounted-product-type";
import { Product } from "../../types/products";
import { BasePricingRule } from "./base-pricing-rule";

export class DiscountedProductTypePricingRule extends BasePricingRule {
  constructor(private options: DiscountedProductTypePricingRuleConfig) {
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
