export type PricingRule = {};

export class Checkout {
	constructor(private pricingRules: PricingRule[] = []) { }
	
	public total = () => 0;
}
