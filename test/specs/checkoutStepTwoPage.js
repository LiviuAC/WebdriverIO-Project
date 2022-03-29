const LoginPage = require("../pageobjects/LoginPage");
const {CREDENTIALS, checkoutURL} = require("../helper/testData");
const ProductsPage = require("../pageobjects/ProductsPage");
const CartPage = require("../pageobjects/CartPage");
const CheckoutPage = require("../pageobjects/CheckoutPage");
const {ImageSource} = require("../helper/inventoryData");

describe(" Checkout Step Two Page Tests", () => {

    describe("Checkout Step Two Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.addProductAndProceedToCheckout()
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
        });

        afterEach(async function () {
            await CheckoutPage.logout();
        });

        it(`should contain '${checkoutURL.stepTwo}' in url`, async () => {

            expect(await browser.getUrl()).toContain(checkoutURL.stepTwo);
        });

        it('check Header UI elements', async () => {

            expect(await CheckoutPage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await CheckoutPage.appLogo.isDisplayed()).toBe(true);
            expect(await CheckoutPage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.header.getText()).toEqual("CHECKOUT: OVERVIEW");
            expect(await CheckoutPage.quantityLabelText.getText()).toEqual("QTY");
            expect(await CheckoutPage.descriptionLabelText.getText()).toEqual("DESCRIPTION");
        })

        it("check Payment Information UI elements", async () => {

            expect(await CheckoutPage.summaryInfoText.getText()).toContain("Payment Information:");
            expect(await CheckoutPage.summaryInfoText.getText()).toContain("SauceCard #31337");
        })

        it("check Shipping Information UI elements", async () => {

            expect(await CheckoutPage.summaryInfoText.getText()).toContain("Shipping Information:");
            expect(await CheckoutPage.summaryInfoText.getText()).toContain("FREE PONY EXPRESS DELIVERY!");
        })

        it("check Item total, Tax and Total Information UI elements", async () => {

            expect(await CheckoutPage.summaryInfoText.getText()).toContain("Item total: $");
            expect(await CheckoutPage.summaryInfoText.getText()).toContain("Tax: $0.00");
            expect(await CheckoutPage.summaryInfoText.getText()).toContain("Total: $0.00");
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

        it("check 'CANCEL' and 'FINISH' buttons", async () => {

            expect(await CheckoutPage.btnCancel.isDisplayed()).toBe(true);
            expect(await CheckoutPage.btnFinish.isDisplayed()).toBe(true);
        });
    })

    describe("Checkout Step Two Page Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await CheckoutPage.logout();
        });

        it("should be able to return to the 'Products' page via the 'Cancel' button", async () => {
            await ProductsPage.addProductAndProceedToCheckout("oneItem");
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
            await CheckoutPage.btnCancel.click()

            expect(await browser.getUrl()).toContain(ProductsPage.url);
            await ProductsPage.btnRemoveBackpack.click()
        })

        it("should be able to return to the 'Carts' page via 'Shopping Cart' icon", async () => {
            await ProductsPage.addProductAndProceedToCheckout("oneItem");
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
            await CheckoutPage.shoppingCartIcon.click()

            expect(await browser.getUrl()).toContain(CartPage.url);
            await ProductsPage.btnRemoveBackpack.click()
        })

        it("summary info should update upon adding the 'Sauce Labs Backpack' product", async () => {
            await ProductsPage.addProductAndProceedToCheckout("oneItem");
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")

            let productsPrices = await ProductsPage.extractTextData(ProductsPage.allItemsPrices)
            let productsNames = await ProductsPage.extractTextData(ProductsPage.allItemsName)
            let productsDescriptions = await ProductsPage.extractTextData(ProductsPage.allItemsDescriptions)

            let checkoutProductsPrices = await CheckoutPage.extractTextData(CheckoutPage.allItemsPrices)
            let checkoutProductsNames = await CheckoutPage.extractTextData(CheckoutPage.allItemsName)
            let checkoutProductsDescriptions = await CheckoutPage.extractTextData(CheckoutPage.allItemsDescriptions)

            const backpackPrice = Number(checkoutProductsPrices[0])
            const taxPrice = Number((backpackPrice * 0.08).toFixed(2))

            expect(checkoutProductsNames).toContain(productsNames[0]);
            expect(checkoutProductsDescriptions).toContain(productsDescriptions[0]);
            expect(await CheckoutPage.productQuantityText.getText()).toContain("1");
            expect(checkoutProductsPrices).toContain(productsPrices[0]);
            expect(await CheckoutPage.itemTotalPriceText.getText()).toContain(backpackPrice);
            expect(await CheckoutPage.taxPriceText.getText()).toContain(taxPrice);
            expect(await CheckoutPage.totalPriceText.getText()).toContain(backpackPrice + taxPrice);

            await CheckoutPage.btnCancel.click()
            await ProductsPage.btnRemoveBackpack.click()
        });

        it("summary info should update upon adding multiple products", async () => {
            await ProductsPage.addProductAndProceedToCheckout("multipleItems");
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
            let productsPrices = await ProductsPage.extractTextData(ProductsPage.allItemsPrices)
            let productsNames = await ProductsPage.extractTextData(ProductsPage.allItemsName)
            let productsDescriptions = await ProductsPage.extractTextData(ProductsPage.allItemsDescriptions)

            const backpackPrice = Number(productsPrices[0])
            const bikeLightPrice = Number(productsPrices[1])
            const taxPrice = ((backpackPrice + bikeLightPrice)* 0.08).toFixed(2)

            let checkoutProductsPrices = await CheckoutPage.extractTextData(CheckoutPage.allItemsPrices)
            let checkoutProductsNames = await CheckoutPage.extractTextData(CheckoutPage.allItemsName)
            let checkoutProductsDescriptions = await CheckoutPage.extractTextData(CheckoutPage.allItemsDescriptions)

            expect(checkoutProductsNames).toContain(productsNames[0]);
            expect(checkoutProductsDescriptions).toContain(productsDescriptions[0]);
            expect(await CheckoutPage.productQuantityText.getText()).toContain("1");
            expect(checkoutProductsPrices).toContain(productsPrices[0]);

            expect(checkoutProductsNames).toContain(productsNames[1]);
            expect(checkoutProductsDescriptions).toContain(productsDescriptions[1]);
            expect(await CheckoutPage.productQuantityText.getText()).toContain("1");
            expect(checkoutProductsPrices).toContain(productsPrices[1]);

            expect(await CheckoutPage.itemTotalPriceText.getText()).toContain(Number(backpackPrice + bikeLightPrice));
            expect(await CheckoutPage.taxPriceText.getText()).toContain(taxPrice);
            expect(await CheckoutPage.totalPriceText.getText()).toContain(backpackPrice + bikeLightPrice + Number(taxPrice));

            await CheckoutPage.btnCancel.click()
            await ProductsPage.btnRemoveBackpack.click()
            await ProductsPage.btnRemoveBikeLight.click()
        });

        it("should be able to reach the 'Checkout: Complete' page via the 'Finish' button upon adding a product", async () => {
            await ProductsPage.addProductAndProceedToCheckout("oneItem");
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
            await CheckoutPage.btnFinish.click()

            expect(await browser.getUrl()).toContain(checkoutURL.complete);
            expect(await CheckoutPage.shoppingCartLabel.isDisplayed()).toBe(false);
        })

        it("should not be able to reach the 'Checkout: Complete' page via the 'Finish' button without adding a product", async () => {
            await ProductsPage.addProductAndProceedToCheckout();
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
            await CheckoutPage.btnFinish.click()

            expect(await browser.getUrl()).not.toContain(checkoutURL.complete);
        })
    })
})
