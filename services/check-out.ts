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
  Classic: 269.99,
  Standout: 322.99,
  Premium: 394.99,
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

    const firstProduct = this.cart[0];
    const price = productPricing[firstProduct.productType];
    return price;
  };
}
