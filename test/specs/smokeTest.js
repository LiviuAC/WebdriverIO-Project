const CheckoutPage = require("../pageobjects/CheckoutPage");
const {checkoutURL, CREDENTIALS} = require("../helper/testData");
const LoginPage = require("../pageobjects/LoginPage");

describe("Smoke Test", () => {

    it("should be able to login, add product to cart and complete the checkout", async () => {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        await CheckoutPage.addProductAndProceedToCheckout("oneItem")
        await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
        await CheckoutPage.btnFinish.click()

        expect(await browser.getUrl()).toContain(checkoutURL.complete);
        await LoginPage.logout()
    })
})
