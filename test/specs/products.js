const LoginPage = require("../pageobjects/LoginPage");
const ProductsPage = require("../pageobjects/ProductsPage");
const CartPage = require("../pageobjects/YourCartPage");
const { CREDENTIALS } = require("../helper/credentials");
const { ImageSource, ProductPrices, filterOptions, ProductDescriptions, BurgerMenuText} = require("../helper/inventoryData");
const { ProductNames } = require("../helper/inventoryData");
const {titleContains} = require("wdio-wait-for");

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
            expect(await ProductsPage.productsHeader.getText()).toEqual("PRODUCTS");
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

        it("should display all the 6 products prices", async () => {
            const productsPricesText = await ProductsPage.productData('prices');

            expect(productsPricesText).toContain(ProductPrices.backpack);
            expect(productsPricesText).toContain(ProductPrices.bikeLight);
            expect(productsPricesText).toContain(ProductPrices.boltShirt);
            expect(productsPricesText).toContain(ProductPrices.fleeceJacket);
            expect(productsPricesText).toContain(ProductPrices.onesie);
            expect(productsPricesText).toContain(ProductPrices.redShirt);
            expect(productsPricesText.length).toEqual(6)
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
    })

    describe("Access the Products page directly without login Test", () => {
        it(`should not be able to access the page directly without login`, async () => {
            await ProductsPage.open();

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: You can only access '/inventory.html' when you are logged in."
            );
        })
    })

    describe("Products Test", () => {

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

    describe("Burger Menu Tests", () => {

        it("check Burger Menu UI elements", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            const bmItemsText = await ProductsPage.burgerMenuItemsText()

            expect(bmItemsText).toContain(BurgerMenuText.allItems.toUpperCase());
            expect(bmItemsText).toContain(BurgerMenuText.about.toUpperCase());
            expect(bmItemsText).toContain(BurgerMenuText.logout.toUpperCase());
            expect(bmItemsText).toContain(BurgerMenuText.resetAppState.toUpperCase());

            await ProductsPage.btnLogout.click();
        })

        it("the 'About' button should redirect to the 'https://saucelabs.com/' url", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.btnBurgerMenu.click();
            await ProductsPage.btnAbout.waitForClickable();
            await ProductsPage.btnAbout.click();

            expect(await browser.getUrl()).toEqual("https://saucelabs.com/");
        })

        it("the 'Logout' button should redirect to the Login page", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.btnBurgerMenu.click();
            await ProductsPage.btnLogout.waitForClickable();
            await ProductsPage.btnLogout.click();

            expect(await browser.getUrl()).toContain(LoginPage.url);
        })
    })

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
            await ProductsPage.filterData('priceDescending')
            let descendingExpectedProductsPrices = await ProductsPage.productsPricesNumberArray('expectedPrices');
            let descendingProductsPrices = await ProductsPage.productsPricesNumberArray('pagePrices');

            descendingExpectedProductsPrices.sort((a, b) => b - a);

            expect(descendingProductsPrices).toEqual(descendingExpectedProductsPrices);
        });

        it("should display all the 6 products prices sorted in ascending order", async () => {
            await ProductsPage.filterData('priceAscending')
            let ascendingExpectedProductsPrices = await ProductsPage.productsPricesNumberArray('expectedPrices');
            let ascendingProductsPrices = await ProductsPage.productsPricesNumberArray('pagePrices');

            ascendingExpectedProductsPrices.sort((a, b) => a - b);

            expect(ascendingProductsPrices).toEqual(ascendingExpectedProductsPrices);
        });
    })

    describe('Footer Tests', () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
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

        it("the 'Twitter' icon should redirect to the Sauce Labs Twitter url", async () => {
            await ProductsPage.twitterIcon.waitForClickable()
            await ProductsPage.twitterIcon.click()
            await browser.switchWindow("https://twitter.com/saucelabs")

            expect(await browser.getUrl()).toEqual("https://twitter.com/saucelabs");
            await ProductsPage.closeWindowAndSwitchBack()
        })

        it("the 'Facebook' icon should redirect to the Sauce Labs Facebook url", async () => {
            await ProductsPage.facebookIcon.waitForClickable()
            await ProductsPage.facebookIcon.click()
            await browser.switchWindow("https://www.facebook.com/saucelabs")

            expect(await browser.getUrl()).toEqual("https://www.facebook.com/saucelabs");
            await ProductsPage.closeWindowAndSwitchBack()
        })

        it("the 'LinkedIn' icon should redirect to the Sauce Labs LinkedIn url", async () => {
            await ProductsPage.linkedInIcon.waitForClickable()
            await ProductsPage.linkedInIcon.click()
            await browser.switchWindow("https://www.linkedin.com/company/sauce-labs/")

            expect(await browser.getUrl()).toEqual("https://www.linkedin.com/company/sauce-labs/");
            await ProductsPage.closeWindowAndSwitchBack()
        })
    })
})
