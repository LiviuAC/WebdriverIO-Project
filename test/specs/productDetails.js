const ProductsPage = require("../pageobjects/ProductsPage");
const LoginPage = require("../pageobjects/LoginPage");
const ProductDetailedPage = require("../pageobjects/ProductDetailedPage");
const {CREDENTIALS} = require("../helper/credentials");
const {ImageSource} = require("../helper/inventoryData");


describe(" Product Detailed Page Tests", () => {
    //TODO: sa continui cu aceast fisier pt backpack si restul itemelor dupa ce termin cu products

    describe("Access the 'Sauce Labs Backpack' details upon clicking on image", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("should display only the 'Sauce Labs Backpack' details upon clicking on its image", async () => {
            await ProductsPage.allItemsImages[0].click()

            expect(await ProductDetailedPage.detailsImage.isDisplayed()).toBe(true);
            expect(await ProductDetailedPage.detailsImage.getAttribute('src')).toEqual(ImageSource.backpack);
        });
    })
})
