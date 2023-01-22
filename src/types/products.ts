/**
 * Represents the product type (or type of advertisement)
 */
export enum ProductType {
  Classic = "Classic",
  Standout = "Standout",
  Premium = "Premium",
}

/**
 * A product can be added to a shopping cart and purchased by a recruiter.
 * Extremely simplified as we only require product type for this exercise.
 */
export type Product = {
  productType: ProductType;
};
