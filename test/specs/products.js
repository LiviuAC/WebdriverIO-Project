const LoginPage = require("../pageobjects/LoginPage");
const ProductsPage = require("../pageobjects/ProductsPage");
const { CREDENTIALS } = require("../helper/credentials");
const { ImageSource, ProductPrices, filterOptions} = require("../helper/inventoryData");
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

        it('should have the "SWAGLABS" logo in header', async () => {

            expect(await ProductsPage.appLogo.isDisplayed()).toBe(true);
        });

        it('should have the Burger Menu button in header', async () => {

            expect(await ProductsPage.btnBurgerMenu.isDisplayed()).toBe(true);
        });

        it('should have the Cart Icon in header', async () => {

            expect(await ProductsPage.ShoppingCartIcon.isDisplayed()).toBe(true);
        });

        it('should have the filter dropdown menu in header', async () => {
            const filterOptionsText = await ProductsPage.filterDropdownMenu.getText()

            expect(await ProductsPage.filterDropdownMenu.isDisplayed()).toBe(true);
            expect(await ProductsPage.filterActiveOption.getText()).toEqual(filterOptions.nameAscending.toUpperCase());
            expect(filterOptionsText).toContain(filterOptions.nameAscending)
            expect(filterOptionsText).toContain(filterOptions.nameDescending)
            expect(filterOptionsText).toContain(filterOptions.priceAscending)
            expect(filterOptionsText).toContain(filterOptions.priceDescending)
        });
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

        it("should display all the 6 products names", async () => {
            const productsNamesText = await ProductsPage.productData('names');

            expect(productsNamesText).toContain(ProductNames.backpack);
            expect(productsNamesText).toContain(ProductNames.bikeLight);
            expect(productsNamesText).toContain(ProductNames.boltShirt);
            expect(productsNamesText).toContain(ProductNames.fleeceJacket);
            expect(productsNamesText).toContain(ProductNames.onesie);
            expect(productsNamesText).toContain(ProductNames.redShirt);
        });

        it("should display all the 6 products images", async () => {
            const productsImagesSource = await ProductsPage.productData('images');

            expect(productsImagesSource).toContain(ImageSource.backpack);
            expect(productsImagesSource).toContain(ImageSource.bikeLight);
            expect(productsImagesSource).toContain(ImageSource.boltShirt);
            expect(productsImagesSource).toContain(ImageSource.fleeceJacket);
            expect(productsImagesSource).toContain(ImageSource.onesie);
            expect(productsImagesSource).toContain(ImageSource.redShirt);
        });

        it("should display all the 6 products prices", async () => {
            const productsPrices = await ProductsPage.productData('prices');

            expect(productsPrices).toContain(ProductPrices.backpack);
            expect(productsPrices).toContain(ProductPrices.bikeLight);
            expect(productsPrices).toContain(ProductPrices.boltShirt);
            expect(productsPrices).toContain(ProductPrices.fleeceJacket);
            expect(productsPrices).toContain(ProductPrices.onesie);
            expect(productsPrices).toContain(ProductPrices.redShirt);
        });

        xit("should display all the 6 products prices", async () => {
            const productsPrices = await ProductsPage.productData('prices');

            expect(productsPrices).toContain(ProductPrices.backpack);
            expect(productsPrices).toContain(ProductPrices.bikeLight);
            expect(productsPrices).toContain(ProductPrices.boltShirt);
            expect(productsPrices).toContain(ProductPrices.fleeceJacket);
            expect(productsPrices).toContain(ProductPrices.onesie);
            expect(productsPrices).toContain(ProductPrices.redShirt);
        });

        xit("should display all the 6 products prices sorted in ascending order", async () => {
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
    });

    describe("Access the Products page without loging in Test", () => {
        it(`should not be able to access the page directly without login`, async () => {
            await ProductsPage.open();

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: You can only access '/inventory.html' when you are logged in."
            );
        })
    })
})


