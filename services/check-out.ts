export type PricingRule = {};
export type Product = {
  productType: ProductType;
};
export enum ProductType {
  Classic = "Classic",
  Standout = "Standout",
  Premium = "Premium",
}

const productPricing: Record<ProductType, number> = {
  [ProductType.Classic]: 269.99,
  [ProductType.Standout]: 322.99,
  [ProductType.Premium]: 394.99,
};

export class Checkout {
  private cart: Product[] = [];

  constructor(private pricingRules: PricingRule[] = []) {}

  public add = (product: Product) => {
    this.cart.push(product);
  };

  public total = () => {
    if (this.cart.length === 0) {
      return 0;
		}
		
		return this.cart.reduce((currentTotal: number, currentItem: Product) => {
			const currentItemPrice = productPricing[currentItem.productType];
			return currentTotal + currentItemPrice;
		}, 0);
  };
}
