import { ProductType } from "../products";
import { CustomerSpecificRuleConfig } from "./pricing-rule";

/**
 * Configuration of the BuyXForY pricing rule - "Customer gets a 3 for 2 deal on Classic Ads"
 */
export type BuyXForYPricingRuleConfig = CustomerSpecificRuleConfig & {
  /**
   * What product will this pricing rule apply to?
   */
  productType: ProductType;

  /**
   * What quantity of this product will be received by the customer?
   */
  receiveQuantity: number;

  /**
   * What quantity will the customer need to pay for?
   */
  payForQuantity: number;
};
