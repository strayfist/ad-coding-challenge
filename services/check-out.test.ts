import { Checkout } from "./check-out"

describe("Checkout", () => {
	describe("total", () => {
		test("no items in cart should be zero total", () => {
			const checkout = new Checkout();
			expect(checkout.total()).toEqual(0);
		})
	})
})