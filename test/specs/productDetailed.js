const ProductsPage = require("../pageobjects/ProductsPage");
const LoginPage = require("../pageobjects/LoginPage");
const ProductDetailedPage = require("../pageobjects/ProductDetailedPage");
const {CREDENTIALS} = require("../helper/credentials");
const {ImageSource} = require("../helper/inventoryData");


describe(" Product Detailed Page Tests", () => {

    describe("Access the 'Sauce Labs Backpack' details upon clicking on image", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("should display only the 'Sauce Labs Backpack' details upon clicking on its image", async () => {
            const sauceLabsBackpackImage = await ProductsPage.allItemsImages[0]
            sauceLabsBackpackImage.click()
            console.log('backpage img:', sauceLabsBackpackImage)
            expect(await ProductDetailedPage.detailsImage.isDisplayed()).toBe(false);
            expect(await ProductDetailedPage.detailsImage.getAttribute('src')).toEqual(ImageSource.footerRobot);
        });
    })
})
