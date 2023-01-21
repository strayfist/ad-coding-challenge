import { Checkout, ProductType } from "./check-out";

describe("Checkout", () => {
  describe("total", () => {
    test("no items in cart should be $0", () => {
      const checkout = new Checkout();
      expect(checkout.total()).toEqual(0);
    });

    const expectedPricings = [
      { productType: ProductType.ClassicAd, expectedPrice: 269.99 },
      { productType: ProductType.StandoutAd, expectedPrice: 322.99 },
      { productType: ProductType.PremiumAd, expectedPrice: 394.99 },
    ];
    describe("single product in cart has correct pricing", () => {
      expectedPricings.forEach(({ productType, expectedPrice }) => {
        test(`${productType} has correct price $${expectedPrice}`, () => {
          const checkout = new Checkout();
          checkout.add({ productType });
          expect(checkout.total()).toEqual(expectedPrice);
        });
      });
    });
  });
});
