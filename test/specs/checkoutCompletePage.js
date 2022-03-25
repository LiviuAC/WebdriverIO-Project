const LoginPage = require("../pageobjects/LoginPage");
const {CREDENTIALS, checkoutURL} = require("../helper/testData");
const CheckoutPage = require("../pageobjects/CheckoutPage");
const {ImageSource} = require("../helper/inventoryData");
const CartPage = require("../pageobjects/CartPage");
const ProductsPage = require("../pageobjects/ProductsPage");

describe(" Checkout Complete Page Tests", () => {

    describe("Checkout Complete Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await CheckoutPage.addProductAndProceedToCheckout("oneItem")
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
            await CheckoutPage.btnFinish.click()
        });

        afterEach(async function () {
            await CheckoutPage.logout();
        });

        it(`should contain '${checkoutURL.complete}' in url`, async () => {

            expect(await browser.getUrl()).toContain(checkoutURL.complete);
        });

        it('check Header UI elements', async () => {

            expect(await CheckoutPage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await CheckoutPage.appLogo.isDisplayed()).toBe(true);
            expect(await CheckoutPage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.header.isDisplayed()).toBe(true);
            expect(await CheckoutPage.header.getText()).toEqual("CHECKOUT: COMPLETE!");
        })

        it("check checkout complete container UI elements", async () => {

            expect(await CheckoutPage.completeHeaderText.getText()).toEqual("THANK YOU FOR YOUR ORDER");
            expect(await CheckoutPage.completeText.getText()).toEqual("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
            expect(await CheckoutPage.ponyExpressImage.getAttribute('src')).toEqual(ImageSource.ponyExpress);
            expect(await CheckoutPage.btnBackHome.isDisplayed()).toBe(true);
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

    describe(" Checkout Complete Page Tests", () => {

        describe("Checkout Complete Page Tests", () => {

            beforeEach(async function () {
                await LoginPage.open();
                await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
                await CheckoutPage.addProductAndProceedToCheckout("oneItem")
                await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
                await CheckoutPage.btnFinish.click()
            });

            afterEach(async function () {
                await CheckoutPage.logout();
            });

            it("the 'Carts' page should not display any item", async () => {
                await CheckoutPage.shoppingCartIcon.click()

                expect(await browser.getUrl()).toContain(CartPage.url);
                expect(await CartPage.productQuantityText.isDisplayed()).toBe(false);
                expect(await CartPage.productNameText.isDisplayed()).toBe(false);
                expect(await CartPage.productDescriptionText.isDisplayed()).toBe(false);
                expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
            })

            it("should be able to return to the 'Products' page via the 'BACK HOME' button", async () => {
                await CheckoutPage.btnBackHome.click()

                expect(await browser.getUrl()).toContain(ProductsPage.url);
                expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
            })
        })
    })
})