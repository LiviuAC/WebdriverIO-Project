const ProductsPage = require("../pageobjects/ProductsPage");
const LoginPage = require("../pageobjects/LoginPage");
const ProductDetailsPage = require("../pageobjects/ProductDetailsPage");
const {CREDENTIALS} = require("../helper/credentials");
const {ImageSource, ProductNames, ProductDescriptions} = require("../helper/inventoryData");

describe(" Product Details Page Tests", () => {

    describe("Products Details Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.allItemsImages[0].click()
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it(`should contain '${ProductsPage.url}' in url`, async () => {

            expect(await browser.getUrl()).toContain(ProductDetailsPage.url);
        });

        it('check Header UI elements', async () => {

            expect(await ProductDetailsPage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await ProductDetailsPage.appLogo.isDisplayed()).toBe(true);
            expect(await ProductDetailsPage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await ProductDetailsPage.btnBackToProducts.isDisplayed()).toBe(true);
        })

        it("should display only the 'ADD TO CART' button when accessing the page", async () => {

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(true);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
        })

        it("should display only the 'Sauce Labs Backpack' details upon clicking on its image", async () => {

            expect(await ProductDetailsPage.detailsImage.getAttribute('src')).toEqual(ImageSource.backpack);
            expect(await ProductDetailsPage.detailsImage.getAttribute('src')).not.toEqual(ImageSource.bikeLight);
            expect(await ProductDetailsPage.detailsName.getText()).toEqual(ProductNames.backpack);
            expect(await ProductDetailsPage.detailsName.getText()).not.toEqual(ProductNames.bikeLight);
            expect(await ProductDetailsPage.detailsDescription.getText()).toEqual(ProductDescriptions.backpack);
            expect(await ProductDetailsPage.detailsDescription.getText()).not.toEqual(ProductDescriptions.bikeLight);
        });

        it("check Footer UI elements", async () => {

            expect(await ProductsPage.twitterIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.facebookIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.linkedInIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.copyright.isDisplayed()).toBe(true);
            expect(await ProductsPage.copyright.getText()).toContain("© 2022 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
            expect(await ProductsPage.robotFooter.isDisplayed()).toBe(true);
            expect(await ProductsPage.robotFooter.getAttribute('src')).toEqual(ImageSource.footerRobot);
        });
    })

    describe("Access the Products Details page directly without login Test", () => {
        it(`should not be able to access the page directly without login`, async () => {
            await ProductDetailsPage.open();

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: You can only access '/inventory-item.html' when you are logged in."
            );
        })
    })

    describe('Products Details Tests', () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("the user should be able to add to cart and remove the product", async () => {
            await ProductsPage.allItemsImages[0].click()
            await ProductsPage.btnAddBackpack.click();

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(false);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(true);
            expect(await ProductsPage.shoppingCartLabel.getText()).toEqual("1");

            await ProductsPage.btnRemoveBackpack.click();

            expect(await ProductsPage.shoppingCartLabel.isDisplayed()).toBe(false);
            });

        it("the 'Remove' button should be able displayed in Products page after add", async () => {
            await ProductsPage.allItemsImages[0].click()
            await ProductsPage.btnAddBackpack.click();
            await ProductDetailsPage.btnBackToProducts.click()

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(false);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(true);
            expect(await ProductsPage.shoppingCartLabel.getText()).toEqual("1");
            await ProductsPage.btnRemoveBackpack.click()
        });

        it("the user should be able to remove the product in Products page after add", async () => {
            await ProductsPage.allItemsImages[0].click()
            await ProductsPage.btnAddBackpack.click();
            await ProductDetailsPage.btnBackToProducts.click()
            await ProductsPage.btnRemoveBackpack.click()

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(true);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
            expect(await ProductsPage.shoppingCartLabel.isDisplayed()).toBe(false);
        });

        it("the user should be able to remove the product in Product Details page after add in Products", async () => {
            await ProductsPage.btnAddBackpack.click();
            await ProductsPage.allItemsImages[0].click()
            await ProductsPage.btnRemoveBackpack.click()

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(true);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
            expect(await ProductsPage.shoppingCartLabel.isDisplayed()).toBe(false);
        });
    })
})
