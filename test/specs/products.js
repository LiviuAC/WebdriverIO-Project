const LoginPage = require("../pageobjects/LoginPage");
const ProductsPage = require("../pageobjects/ProductsPage");
const { CREDENTIALS } = require("../helper/credentials");
const { ImageSource, ProductPrices, filterOptions, ProductDescriptions} = require("../helper/inventoryData");
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
            expect(await ProductsPage.ShoppingCartIcon.isDisplayed()).toBe(true);
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

    describe("Products Test", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });



        it("the shopping cart label number should increase after adding a product", async () => {
            await ProductsPage.btnAddBackpack.click();

            expect(await ProductsPage.ShoppingCartLabel.getText()).toEqual("1");
            await ProductsPage.btnRemoveBackpack.click();
        });

        it("the shopping cart label number should decrease after removing a product", async () => {
            await ProductsPage.addMultipleItems();
            await ProductsPage.btnRemoveBackpack.click();

            expect(await ProductsPage.ShoppingCartLabel.getText()).toEqual("1");
            await ProductsPage.btnRemoveBikeLight.click();
        });

        it("the shopping cart label should not be displayed upon removing the last item", async () => {
            await ProductsPage.btnAddBackpack.click();
            await ProductsPage.btnRemoveBackpack.click();

            expect(await ProductsPage.ShoppingCartLabel.isDisplayed()).toBe(false);
        });
    });

    xdescribe('Filter functionality Tests', () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("should display all the 6 products prices sorted in ascending order", async () => {
            //#TODO: sa introduc metoda de a ordona in pagina si a lua valorile si sa corectez diferite nume de variabile
            let expectedProductPrices = [];
            let productsPrices = [];

            const productPrice = await ProductsPage.allItemsPrices;
            for (let i = 0; i < productPrice.length; i++) {
                productsPrices.push(await productPrice[i].getText());
            }

            let sortedProductsPrices = [];
            for (let i = 0; i < productsPrices.length; i++) {
                sortedProductsPrices.push(Number(productsPrices[i].replace("$", "")));
                // console.log("type of: ", typeof Number(productsPrices[i].replace('$','')))
            }
            sortedProductsPrices.sort((a, b) => a - b);
            console.log("sorted prices: ", sortedProductsPrices);

            // let dictValues = Object.values(ProductPrices)
            // // expectedProductPrices.push(price)
            // console.log('expected prices: ', dictValues)
        });
    })
})

