const LoginPage = require("../pageobjects/LoginPage");
const ProductsPage = require("../pageobjects/ProductsPage");
const { CREDENTIALS } = require("../helper/credentials");
const { ImageSource, filterOptions, ProductDescriptions} = require("../helper/inventoryData");
const { ProductNames } = require("../helper/inventoryData");

describe('Products Page Tests', () => {

    describe("Products Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it(`should contain '${ProductsPage.url}' in url`, async () => {

            expect(await browser.getUrl()).toContain(ProductsPage.url);
        });

        it('check Header UI elements', async () => {
            const filterOptionsText = await ProductsPage.filterDropdownMenu.getText()

            expect(await ProductsPage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await ProductsPage.appLogo.isDisplayed()).toBe(true);
            expect(await ProductsPage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.header.getText()).toEqual("PRODUCTS");
            expect(await ProductsPage.robotPeek.isDisplayed()).toBe(true);
            expect(await ProductsPage.filterDropdownMenu.isDisplayed()).toBe(true);
            expect(await ProductsPage.filterActiveOption.getText()).toEqual(filterOptions.nameAscending.toUpperCase());
            expect(filterOptionsText).toContain(filterOptions.nameAscending)
            expect(filterOptionsText).toContain(filterOptions.nameDescending)
            expect(filterOptionsText).toContain(filterOptions.priceAscending)
            expect(filterOptionsText).toContain(filterOptions.priceDescending)
        });

        it("should display all the 6 products names", async () => {
            const productsNamesText = await ProductsPage.productData('names');

            expect(productsNamesText).toContain(ProductNames.backpack);
            expect(productsNamesText).toContain(ProductNames.bikeLight);
            expect(productsNamesText).toContain(ProductNames.boltShirt);
            expect(productsNamesText).toContain(ProductNames.fleeceJacket);
            expect(productsNamesText).toContain(ProductNames.onesie);
            expect(productsNamesText).toContain(ProductNames.redShirt);
            expect(productsNamesText.length).toEqual(6)
        });

        it("should display all the 6 products images", async () => {
            const productsImagesSource = await ProductsPage.productData('images');

            expect(productsImagesSource).toContain(ImageSource.backpack);
            expect(productsImagesSource).toContain(ImageSource.bikeLight);
            expect(productsImagesSource).toContain(ImageSource.boltShirt);
            expect(productsImagesSource).toContain(ImageSource.fleeceJacket);
            expect(productsImagesSource).toContain(ImageSource.onesie);
            expect(productsImagesSource).toContain(ImageSource.redShirt);
            expect(productsImagesSource.length).toEqual(6)
        });

        it("should display all the 6 products descriptions", async () => {
            const productsDescriptionsText = await ProductsPage.productData('descriptions');

            expect(productsDescriptionsText).toContain(ProductDescriptions.backpack);
            expect(productsDescriptionsText).toContain(ProductDescriptions.bikeLight);
            expect(productsDescriptionsText).toContain(ProductDescriptions.boltShirt);
            expect(productsDescriptionsText).toContain(ProductDescriptions.fleeceJacket);
            expect(productsDescriptionsText).toContain(ProductDescriptions.onesie);
            expect(productsDescriptionsText).toContain(ProductDescriptions.redShirt);
            expect(productsDescriptionsText.length).toEqual(6)
        });

        it("should display all the 6 'ADD TO CART' buttons", async () => {
            const btnsAddToCart = await ProductsPage.addToCartButtons();

            expect(btnsAddToCart.every( (val) => val === "ADD TO CART" )).toBe(true);
            expect(btnsAddToCart.length).toEqual(6)
        });

        it("should not display the 'Remove' button", async () => {

            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
            expect(await ProductsPage.btnRemoveBikeLight.isDisplayed()).toBe(false);
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

    describe("Access the Products page directly without login Test", () => {
        it(`should not be able to access the page directly without login`, async () => {
            await ProductsPage.open();

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: You can only access '/inventory.html' when you are logged in."
            );
        })
    })

    describe("Products Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("the user should be able to add to cart and remove the 'Sauce Labs Backpack' product",
            async () => {
            await ProductsPage.btnAddBackpack.click();

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(false);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(true);
            expect(await ProductsPage.shoppingCartLabel.getText()).toEqual("1");

            await ProductsPage.btnRemoveBackpack.click();

            expect(await ProductsPage.shoppingCartLabel.isDisplayed()).toBe(false);
        });

        it("the shopping cart label number should decrease after removing a product", async () => {
            await ProductsPage.addMultipleItems();
            await ProductsPage.btnRemoveBackpack.click();

            expect(await ProductsPage.shoppingCartLabel.getText()).toEqual("1");
            await ProductsPage.btnRemoveBikeLight.click();
        });
    });

    describe('Filter functionality Tests', () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("should display all the 6 products names sorted in descending order", async () => {
            await ProductsPage.filterData('nameDescending')
            const descendingProductsNames = await ProductsPage.productData('names');
            const descendingExpectedProductsNames = Object.values(ProductNames)

            expect(descendingProductsNames).toEqual(descendingExpectedProductsNames.reverse());
        });

        it("should display all the 6 products names sorted in ascending order", async () => {
            await ProductsPage.filterData('nameDescending')
            await ProductsPage.filterData('nameAscending')
            const ascendingProductsNames = await ProductsPage.productData('names');
            const ascendingExpectedProductsNames = Object.values(ProductNames)

            expect(ascendingProductsNames).toEqual(ascendingExpectedProductsNames);
        });

        it("should display all the 6 products prices sorted in descending order", async () => {
            let ProductsPrices = await ProductsPage.productData('prices');
            await ProductsPage.filterData('priceDescending')
            let ProductsPricesDescendingOrder = await ProductsPage.productData('prices');
            ProductsPrices.sort((a, b) => b - a);

            expect(ProductsPrices).toEqual(ProductsPricesDescendingOrder);
        });

        it("should display all the 6 products prices sorted in ascending order", async () => {
            let ProductsPrices = await ProductsPage.productData('prices');
            await ProductsPage.filterData('priceAscending')
            let ProductsPricesAscendingOrder = await ProductsPage.productData('prices');

            ProductsPrices.sort((a, b) => a - b);

            expect(ProductsPrices).toEqual(ProductsPricesAscendingOrder);
        });
    })
})
