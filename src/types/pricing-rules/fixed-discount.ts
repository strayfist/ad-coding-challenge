import { ProductType } from "../products";
import { CustomerSpecificRuleConfig } from "./pricing-rule-config";

/**
 * Configuration of the DiscountedProductType pricing rule
 * eg. "Customer gets a discount on Stand out Ads where the price drops to $299.99 per ad"
 */
export type FixedDiscountPricingRuleConfig =
  CustomerSpecificRuleConfig & {
    /**
     * What product will this pricing rule apply to?
     */
    productType: ProductType;

    /**
     * What will we charge this customer for this product type?
     */
    discountedPricePerAd: number;
  };
