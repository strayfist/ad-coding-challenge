import { defaultPricingRules } from "../config/pricing-config";
import { ProductType } from "../types/products";
import { Checkout } from "./check-out";
import { BuyXForYPricingRule } from "./pricing-rules/buy-x-for-y-pricing-rule";
import { FixedDiscountPricingRule } from "./pricing-rules/fixed-discount-pricing-rule";

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
      describe("Buy X for Y deal", () => {
        const pricingRules = [
          new BuyXForYPricingRule({
            applyToCustomers: ["SecondBite"],
            receiveQuantity: 3,
            payForQuantity: 2,
            productType: ProductType.Classic,
          }),
        ];

        test("Special customer gets a 3 for 2 deal on Classic Ads", () => {
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });

          expect(checkout.total({ customer: "SecondBite" })).toEqual(
            expectedPricingPerProduct[ProductType.Classic] * 2
          );
        });

        test("Special pricing can be applied for multiple groups of X quantity", () => {
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
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });

          expect(checkout.total({ customer: "SecondBite" })).toEqual(
            expectedPricingPerProduct[ProductType.Classic] * 2
          );
        });

        test("Special pricing doesn't get applied to other customers", () => {
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });
          checkout.add({ productType: ProductType.Classic });

          expect(checkout.total({ customer: "RecruiterX" })).toEqual(
            expectedPricingPerProduct[ProductType.Classic] * 3
          );
        });

        test("Special pricing doesn't get applied to other product types", () => {
          const checkout = new Checkout(pricingRules);

          // the productType in the rule doesn't match what's in the cart
          checkout.add({ productType: ProductType.Standout });
          checkout.add({ productType: ProductType.Standout });
          checkout.add({ productType: ProductType.Standout });

          expect(checkout.total({ customer: "RecruiterUnknown" })).toEqual(
            expectedPricingPerProduct[ProductType.Standout] * 3
          );
        });
      });

      describe("Fixed discount per product type", () => {
        const discountedPricePerAd = 299.99;

        const pricingRules = [
          new FixedDiscountPricingRule({
            applyToCustomers: ["AxilCoffeeRoasters"],
            productType: ProductType.Standout,
            discountedPricePerAd,
          }),
        ];

        test("Special customer gets a fixed discount on Stand out Ads where the price drops to $299.99 per ad", () => {
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Standout });

          expect(checkout.total({ customer: "AxilCoffeeRoasters" })).toEqual(
            discountedPricePerAd
          );
        });

        test("Special pricing can be applied for multiple quantities same product type", () => {
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Standout });
          checkout.add({ productType: ProductType.Standout });

          expect(checkout.total({ customer: "AxilCoffeeRoasters" })).toEqual(
            discountedPricePerAd * 2
          );
        });

        test("Special pricing doesn't get applied to other customers", () => {
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Standout });

          expect(checkout.total({ customer: "RecruiterUnknown" })).toEqual(
            expectedPricingPerProduct[ProductType.Standout]
          );
        });

        test("Special pricing doesn't get applied to other product types", () => {
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Premium });

          expect(checkout.total({ customer: "AxilCoffeeRoasters" })).toEqual(
            expectedPricingPerProduct[ProductType.Premium]
          );
        });
      });

      describe("Combined pricing rules (Buy X for Y deal together with Fixed discount per product type)", () => {
        const discountedPricePerAd = 389.99;

        const pricingRules = [
          new BuyXForYPricingRule({
            applyToCustomers: ["MYER"],
            receiveQuantity: 5,
            payForQuantity: 4,
            productType: ProductType.Standout,
          }),
          new FixedDiscountPricingRule({
            applyToCustomers: ["MYER"],
            productType: ProductType.Premium,
            discountedPricePerAd,
          }),
        ];

        test("Buy X for Y deal returns correct cart price", () => {
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Standout });
          checkout.add({ productType: ProductType.Standout });
          checkout.add({ productType: ProductType.Standout });
          checkout.add({ productType: ProductType.Standout });
          checkout.add({ productType: ProductType.Standout });

          expect(checkout.total({ customer: "MYER" })).toEqual(
            expectedPricingPerProduct[ProductType.Standout] * 4
          );
        });

        test("Fixed discount returns correct cart price", () => {
          const checkout = new Checkout(pricingRules);
          checkout.add({ productType: ProductType.Premium });
          checkout.add({ productType: ProductType.Premium });

          expect(checkout.total({ customer: "MYER" })).toEqual(
            discountedPricePerAd * 2
          );
        });
      });
    });

    describe("Default pricing rules work for specific customers", () => {
      test("Default customer with all different products", () => {
        const checkout = new Checkout(defaultPricingRules);
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Standout });
        checkout.add({ productType: ProductType.Premium });

        expect(checkout.total({ customer: "default" })).toEqual(987.97);
      });

      test("Customer SecondBite with discounted Classic and premium", () => {
        const checkout = new Checkout(defaultPricingRules);
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Classic });
        checkout.add({ productType: ProductType.Premium });

        expect(checkout.total({ customer: "SecondBite" })).toEqual(934.97);
      });

      test("Customer AxilCoffeeRoasters with discounted stand out ads and premium", () => {
        const checkout = new Checkout(defaultPricingRules);
        checkout.add({ productType: ProductType.Standout });
        checkout.add({ productType: ProductType.Standout });
        checkout.add({ productType: ProductType.Standout });
        checkout.add({ productType: ProductType.Premium });

        expect(checkout.total({ customer: "AxilCoffeeRoasters" })).toEqual(
          1294.96
        );
      });
    });
  });
});
