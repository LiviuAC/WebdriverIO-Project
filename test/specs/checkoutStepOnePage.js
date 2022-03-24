const LoginPage = require("../pageobjects/LoginPage");
const ProductsPage = require("../pageobjects/ProductsPage");
const CartPage = require("../pageobjects/CartPage");
const CheckoutStepOnePage = require("../pageobjects/CheckoutStepOnePage");
const {CREDENTIALS, checkoutURL} = require("../helper/testData");
const {ImageSource} = require("../helper/inventoryData");

describe(" Checkout Page Tests", () => {

    describe("Checkout Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.shoppingCartIcon.click()
            await CartPage.btnCheckout.click()
        });

        afterEach(async function () {
            await CheckoutStepOnePage.logout();
        });

        it(`should contain '${checkoutURL.stepOne}' in url`, async () => {

            expect(await browser.getUrl()).toContain(checkoutURL.stepOne);
        });

        it('check Header UI elements', async () => {

            expect(await CheckoutStepOnePage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.appLogo.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.header.getText()).toEqual("CHECKOUT: YOUR INFORMATION");
        })

        it("check checkout info form UI elements", async () => {

            expect(await CheckoutStepOnePage.firstNameText.getAttribute('placeholder')).toEqual("First Name");
            expect(await CheckoutStepOnePage.lastNameText.getAttribute('placeholder')).toEqual("Last Name");
            expect(await CheckoutStepOnePage.zipCodeText.getAttribute('placeholder')).toEqual("Zip/Postal Code");
            expect(await CheckoutStepOnePage.btnCancel.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.btnContinue.isDisplayed()).toBe(true);
        })

        it("check Footer UI elements", async () => {

            expect(await CheckoutStepOnePage.twitterIcon.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.facebookIcon.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.linkedInIcon.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.copyright.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.copyright.getText()).toContain("© 2022 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
            expect(await CheckoutStepOnePage.robotFooter.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.robotFooter.getAttribute('src')).toEqual(ImageSource.footerRobot);
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
            await CheckoutStepOnePage.logout();
        });

        it("should be able to continue with valid form inputs", async () => {
            await CheckoutStepOnePage.fillForm("validInputs")

            expect(await browser.getUrl()).toContain(checkoutURL.stepTwo);
        });

        it("should be able to return to 'Cart' page via the 'Continue' button", async () => {
            await CheckoutStepOnePage.btnCancel.click()

            expect(await browser.getUrl()).toContain(CartPage.url);
        });

        it("should be able to return to 'Cart' page via the 'Shopping Cart' icon", async () => {
            await CheckoutStepOnePage.shoppingCartIcon.click()

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
            await CheckoutStepOnePage.logout();
        });

        it("should not be able to continue with empty form inputs", async () => {
            await CheckoutStepOnePage.fillForm("emptyFormFields")

            expect(await CheckoutStepOnePage.errorMessage.getText()).toEqual("Error: First Name is required");
            expect(await CheckoutStepOnePage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not display the error message upon clicking on the close error button", async () => {
            await CheckoutStepOnePage.fillForm("emptyFormFields")
            await CheckoutStepOnePage.errorButton.click()

            expect(await CheckoutStepOnePage.errorMessage.isDisplayed()).toBe(false);
            expect(await CheckoutStepOnePage.errorButton.isDisplayed()).toBe(false)
        });

        it("should not be able to continue with empty First Name field", async () => {
            await CheckoutStepOnePage.fillForm("emptyFirstNameField")

            expect(await CheckoutStepOnePage.errorMessage.getText()).toEqual("Error: First Name is required");
            expect(await CheckoutStepOnePage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not be able to continue with empty Last Name field", async () => {
            await CheckoutStepOnePage.fillForm("emptyLastNameField")

            expect(await CheckoutStepOnePage.errorMessage.getText()).toEqual("Error: Last Name is required");
            expect(await CheckoutStepOnePage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not be able to continue with empty Zip/Postal Code field", async () => {
            await CheckoutStepOnePage.fillForm("emptyZipCodeField")

            expect(await CheckoutStepOnePage.errorMessage.getText()).toEqual("Error: Postal Code is required");
            expect(await CheckoutStepOnePage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not be able to continue 5 numbers in Zip/Postal Code field", async () => {
            await CheckoutStepOnePage.fillForm("fiveNumbersZipCodeField")

            expect(await CheckoutStepOnePage.errorMessage.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });

        it("should not be able to continue with letters in Zip/Postal Code field", async () => {
            await CheckoutStepOnePage.fillForm("lettersZipCodeField")

            expect(await CheckoutStepOnePage.errorMessage.isDisplayed()).toBe(true);
            expect(await CheckoutStepOnePage.errorButton.isDisplayed()).toBe(true)
            expect(await browser.getUrl()).not.toContain(checkoutURL.stepTwo);
        });
    })
})
