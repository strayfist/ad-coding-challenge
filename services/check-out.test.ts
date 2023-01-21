import { Checkout, ProductType } from "./check-out";

describe("Checkout", () => {
  describe("total", () => {
    test("no items in cart should be $0", () => {
      const checkout = new Checkout();
      expect(checkout.total()).toEqual(0);
    });

    const expectedPricingPerProduct = {
      [ProductType.Classic]: 269.99,
      [ProductType.Standout]: 322.99,
      [ProductType.Premium]: 394.99,
    };
    describe("single product in cart has correct pricing", () => {
      Object.keys(expectedPricingPerProduct).forEach((key: string) => {
        const productType = key as ProductType;
        const expectedPrice = expectedPricingPerProduct[productType];
        test(`${productType} has correct price $${expectedPrice}`, () => {
          const checkout = new Checkout();
          checkout.add({ productType });
          expect(checkout.total()).toEqual(expectedPrice);
        });
      });
    });

    describe("multiple products", () => {
      test("multiple identical products in cart have correct pricing", () => {
        const checkout = new Checkout();
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Classic });

        expect(checkout.total()).toEqual(
          expectedPricingPerProduct[ProductType.Classic] * 2
        );
      });

      test("all different products in cart have correct pricing", () => {
        const checkout = new Checkout();
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Standout });
        checkout.add({ productType: ProductType.Premium });

        expect(checkout.total()).toEqual(
          expectedPricingPerProduct[ProductType.Classic] +
            expectedPricingPerProduct[ProductType.Standout] +
            expectedPricingPerProduct[ProductType.Premium]
        );
      });
    });
  });
});
