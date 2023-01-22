/**
 * Pricing rule config that applies only to a subset of customers
 */
export type CustomerSpecificRuleConfig = {
	/**
	 * Which customer's will this pricing rule apply to?
	 */
	applyToCustomers: string[]
}
