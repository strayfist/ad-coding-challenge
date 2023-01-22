export enum ProductType {
  Classic = "Classic",
  Standout = "Standout",
  Premium = "Premium",
}

export type Product = {
  productType: ProductType;
};
