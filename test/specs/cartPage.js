const LoginPage = require("../pageobjects/LoginPage");
const {CREDENTIALS} = require("../helper/testData");
const ProductsPage = require("../pageobjects/ProductsPage");
const Checkout = require("../pageobjects/CheckoutPage");
const CartPage = require("../pageobjects/CartPage");
const {ImageSource, ProductNames, ProductDescriptions} = require("../helper/inventoryData");

describe(" Cart Page Tests", () => {

    describe("Cart Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await CartPage.shoppingCartIcon.click();
        });

        afterEach(async function () {
            await CartPage.logout();
        });

        it(`should contain '${CartPage.url}' in url`, async () => {

            expect(await browser.getUrl()).toContain(CartPage.url);
        });

        it('check Header UI elements', async () => {

            expect(await CartPage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await CartPage.appLogo.isDisplayed()).toBe(true);
            expect(await CartPage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await CartPage.header.getText()).toEqual("YOUR CART");
        })

        it("check cart contents container UI elements", async () => {

            expect(await CartPage.cartQuantityLabelText.getText()).toEqual("QTY");
            expect(await CartPage.cartDescriptionLabelText.getText()).toEqual("DESCRIPTION");
            expect(await CartPage.btnContinueShopping.isDisplayed()).toBe(true);
            expect(await CartPage.btnCheckout.isDisplayed()).toBe(true);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
        })

        it("should not display the product's data and the 'Remove' button without add", async () => {
            expect(await CartPage.productQuantityText.isDisplayed()).toBe(false);
            expect(await CartPage.productNameText.isDisplayed()).toBe(false);
            expect(await CartPage.productDescriptionText.isDisplayed()).toBe(false);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
        })

        it("check Footer UI elements", async () => {

            expect(await CartPage.twitterIcon.isDisplayed()).toBe(true);
            expect(await CartPage.facebookIcon.isDisplayed()).toBe(true);
            expect(await CartPage.linkedInIcon.isDisplayed()).toBe(true);
            expect(await CartPage.copyright.isDisplayed()).toBe(true);
            expect(await CartPage.copyright.getText()).toContain("© 2022 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
            expect(await CartPage.robotFooter.isDisplayed()).toBe(true);
            expect(await CartPage.robotFooter.getAttribute('src')).toEqual(ImageSource.footerRobot);
        });
    })

    describe("Access the Cart page directly without login Test", () => {

        it("should not be able to access the page directly without login", async () => {
            await CartPage.open();

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: You can only access '/cart.html' when you are logged in."
            );
        })
    })

    describe("Cart Page Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.btnAddBackpack.click()
            await CartPage.shoppingCartIcon.click();
        });

        afterEach(async function () {
            await CartPage.logout();
        });

        it("should be able to return to the Products page via 'CONTINUE SHOPPING' button", async () => {
            await CartPage.btnContinueShopping.click()

            expect(await browser.getUrl()).toContain(ProductsPage.url);
            await ProductsPage.btnRemoveBackpack.click()
        })

        it("should display the product's data and the 'Remove' button after add", async () => {

            expect(await CartPage.productQuantityText.getText()).toEqual('1');
            expect(await CartPage.productNameText.getText()).toEqual(ProductNames.backpack);
            expect(await CartPage.productDescriptionText.getText()).toEqual(ProductDescriptions.backpack);
            expect(await ProductsPage.shoppingCartLabel.getText()).toEqual("1");
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(true);
            await ProductsPage.btnRemoveBackpack.click()
        })

        it("should be able to remove the product after after add", async () => {
            await ProductsPage.btnRemoveBackpack.click()

            expect(await CartPage.productQuantityText.isDisplayed()).toBe(false);
            expect(await CartPage.productNameText.isDisplayed()).toBe(false);
            expect(await CartPage.productDescriptionText.isDisplayed()).toBe(false);
            expect(await ProductsPage.shoppingCartLabel.isDisplayed()).toBe(false);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
        })

        it("the user should be able to add to cart again the same product upon remove", async () => {
            await ProductsPage.btnRemoveBackpack.click();
            await CartPage.btnContinueShopping.click()

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(true);
            await ProductsPage.btnAddBackpack.click();

            expect(await ProductsPage.shoppingCartLabel.getText()).toEqual("1");
            await ProductsPage.btnRemoveBackpack.click();
        })

        it("should be able to reach the Checkout page after after add", async () => {
            await CartPage.btnCheckout.waitForClickable()
            await CartPage.btnCheckout.click()

            expect(await browser.getUrl()).toContain(Checkout.url);
        })
    })
})
