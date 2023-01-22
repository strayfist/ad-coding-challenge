import { ProductType } from "../types/products";
import { Checkout } from "./check-out";
import { BuyXForYPricingRule } from "./pricing-rules/buy-x-for-y-pricing-rule";

describe("Checkout", () => {
  describe("total", () => {
    test("no items should be $0", () => {
      const checkout = new Checkout();
      expect(checkout.total()).toEqual(0);
    });

    const expectedPricingPerProduct = {
      [ProductType.Classic]: 269.99,
      [ProductType.Standout]: 322.99,
      [ProductType.Premium]: 394.99,
    };
    describe("single product has correct pricing", () => {
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
      test("multiple identical products have correct pricing", () => {
        const checkout = new Checkout();
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Classic });

        expect(checkout.total()).toEqual(
          expectedPricingPerProduct[ProductType.Classic] * 2
        );
      });

      test("all different products have correct pricing", () => {
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

      test("all different products with multiple quantities have correct pricing", () => {
        const checkout = new Checkout();
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Premium });

        expect(checkout.total()).toEqual(
          expectedPricingPerProduct[ProductType.Classic] * 3 +
            expectedPricingPerProduct[ProductType.Premium]
        );
      });
    });

    describe("Special pricing rules for privileged customers", () => {
      describe("SecondBite", () => {
        test("SecondBite gets a 3 for 2 deal on Classic Ads", () => {
          const pricingRules = [
            new BuyXForYPricingRule({
              applyToCustomers: ["SecondBite"],
              receiveQuantity: 3,
              payForQuantity: 2,
              productType: ProductType.Classic,
            }),
          ];
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });

          expect(checkout.total({ customer: "SecondBite" })).toEqual(
            expectedPricingPerProduct[ProductType.Classic] * 2
          );
        });

        test("Special pricing can be applied for multiple groups of X quantity", () => {
          const pricingRules = [
            new BuyXForYPricingRule({
              applyToCustomers: ["SecondBite"],
              receiveQuantity: 3,
              payForQuantity: 2,
              productType: ProductType.Classic,
            }),
          ];
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });

          expect(checkout.total({ customer: "SecondBite" })).toEqual(
            expectedPricingPerProduct[ProductType.Classic] * 4
          );
        });

        test("Special pricing doesn't get applied if they didn't order enough of that product type", () => {
          const pricingRules = [
            new BuyXForYPricingRule({
              applyToCustomers: ["SecondBite"],
              receiveQuantity: 3,
              payForQuantity: 2,
              productType: ProductType.Classic,
            }),
          ];
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });

          expect(checkout.total({ customer: "SecondBite" })).toEqual(
            expectedPricingPerProduct[ProductType.Classic] * 2
          );
        });

        test("Special pricing doesn't get applied to other customers", () => {
          const pricingRules = [
            new BuyXForYPricingRule({
              applyToCustomers: ["SecondBite"],
              receiveQuantity: 3,
              payForQuantity: 2,
              productType: ProductType.Classic,
            }),
          ];
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });

          expect(checkout.total({ customer: "RecruiterX" })).toEqual(
            expectedPricingPerProduct[ProductType.Classic] * 3
          );
        });

        test("Special pricing doesn't get applied to other product types", () => {
          const pricingRules = [
            new BuyXForYPricingRule({
              applyToCustomers: ["SecondBite"],
              receiveQuantity: 3,
              payForQuantity: 2,
              productType: ProductType.Classic,
            }),
          ];
          const checkout = new Checkout(pricingRules);

          // the productType in the rule doesn't match what's in the cart
          checkout.add({ productType: ProductType.Standout });
          checkout.add({ productType: ProductType.Standout });
          checkout.add({ productType: ProductType.Standout });

          expect(checkout.total({ customer: "RecruiterX" })).toEqual(
            expectedPricingPerProduct[ProductType.Standout] * 3
          );
        });
      });
    });
  });
});
