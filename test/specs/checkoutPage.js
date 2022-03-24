const LoginPage = require("../pageobjects/LoginPage");
const ProductsPage = require("../pageobjects/ProductsPage");
const CartPage = require("../pageobjects/CartPage");

const CheckoutPage = require("../pageobjects/CheckoutPage");
const {CREDENTIALS} = require("../helper/credentials");
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
            await CheckoutPage.logout();
        });

        it(`should contain '${CheckoutPage.url}' in url`, async () => {

            expect(await browser.getUrl()).toContain(CheckoutPage.url);
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
})
