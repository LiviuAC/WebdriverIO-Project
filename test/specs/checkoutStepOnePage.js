const LoginPage = require("../pageobjects/LoginPage");
const ProductsPage = require("../pageobjects/ProductsPage");
const CartPage = require("../pageobjects/CartPage");
const CheckoutPage = require("../pageobjects/CheckoutPage");
const {CREDENTIALS, checkoutURL} = require("../helper/testData");
const {ImageSource} = require("../helper/inventoryData");

describe(" Checkout Step One Page Tests", () => {

    describe("Checkout Step One Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.shoppingCartIcon.click()
            await CartPage.btnCheckout.click()
        });

        afterEach(async function () {
            await CheckoutPage.logout();
        });

        it(`should contain '${checkoutURL.stepOne}' in url`, async () => {

            expect(await browser.getUrl()).toContain(checkoutURL.stepOne);
        });

        it('check Header UI elements', async () => {

            expect(await CheckoutPage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await CheckoutPage.appLogo.isDisplayed()).toBe(true);
            expect(await CheckoutPage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.header.getText()).toEqual("CHECKOUT: YOUR INFORMATION");
        })

        it("check checkout info form UI elements", async () => {

            expect(await CheckoutPage.firstNameText.getAttribute('placeholder')).toEqual("First Name");
            expect(await CheckoutPage.lastNameText.getAttribute('placeholder')).toEqual("Last Name");
            expect(await CheckoutPage.zipCodeText.getAttribute('placeholder')).toEqual("Zip/Postal Code");
            expect(await CheckoutPage.btnCancel.isDisplayed()).toBe(true);
            expect(await CheckoutPage.btnContinue.isDisplayed()).toBe(true);
        })

        it("check Footer UI elements", async () => {

            expect(await CheckoutPage.twitterIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.facebookIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.linkedInIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.copyright.isDisplayed()).toBe(true);
            expect(await CheckoutPage.copyright.getText()).toContain("© 2022 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
            expect(await CheckoutPage.robotFooter.isDisplayed()).toBe(true);
            expect(await CheckoutPage.robotFooter.getAttribute('src')).toEqual(ImageSource.footerRobot);
        });
    })

    describe("Confirm Positive Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.shoppingCartIcon.click()
            await CartPage.btnCheckout.click()
        });

        afterEach(async function () {
            await CheckoutPage.logout();
        });

        it("should be able to continue with valid form inputs", async () => {
            await CheckoutPage.completeCheckoutStepOne("testFirstName","testLastName", "000000" )

            expect(await browser.getUrl()).toContain(checkoutURL.stepTwo);
        });

        it("should be able to return to 'Cart' page via the 'Continue' button", async () => {
            await CheckoutPage.btnCancel.click()

            expect(await browser.getUrl()).toContain(CartPage.url);
        });

        it("should be able to return to 'Cart' page via the 'Shopping Cart' icon", async () => {
            await CheckoutPage.shoppingCartIcon.click()

            expect(await browser.getUrl()).toContain(CartPage.url);
        });
    })

    describe("Confirm Negative Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.shoppingCartIcon.click()
            await CartPage.btnCheckout.click()
        });

        afterEach(async function () {
            await CheckoutPage.logout();
        });

        it("should not be able to continue with empty form inputs", async () => {
            await CheckoutPage.completeCheckoutStepOne("", "", "")

            expect(await CheckoutPage.errorMessage.getText()).toEqual("Error: First Name is required");
            expect(await CheckoutPage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not display the error message upon clicking on the close error button", async () => {
            await CheckoutPage.completeCheckoutStepOne("", "", "")
            await CheckoutPage.errorButton.click()

            expect(await CheckoutPage.errorMessage.isDisplayed()).toBe(false);
            expect(await CheckoutPage.errorButton.isDisplayed()).toBe(false)
        });

        it("should not be able to continue with empty First Name field", async () => {
            await CheckoutPage.completeCheckoutStepOne("", "testLastName", "000000")

            expect(await CheckoutPage.errorMessage.getText()).toEqual("Error: First Name is required");
            expect(await CheckoutPage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not be able to continue with empty Last Name field", async () => {
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "", "000000")

            expect(await CheckoutPage.errorMessage.getText()).toEqual("Error: Last Name is required");
            expect(await CheckoutPage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not be able to continue with empty Zip/Postal Code field", async () => {
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "")

            expect(await CheckoutPage.errorMessage.getText()).toEqual("Error: Postal Code is required");
            expect(await CheckoutPage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not be able to continue 5 numbers in Zip/Postal Code field", async () => {
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "00000")

            expect(await CheckoutPage.errorMessage.isDisplayed()).toBe(true);
            expect(await CheckoutPage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not be able to continue with letters in Zip/Postal Code field", async () => {
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "testZipCode")

            expect(await CheckoutPage.errorMessage.isDisplayed()).toBe(true);
            expect(await CheckoutPage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });
    })
})
