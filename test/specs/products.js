const LoginPage = require("../pageobjects/LoginPage");
const ProductsPage = require("../pageobjects/ProductsPage");
const { CREDENTIALS } = require("../helper/credentials");
const { ImageSource, ProductPrices, URLS} = require("../helper/inventoryData");
const { ProductNames } = require("../helper/inventoryData");
// const { beforeAfterEach } = require("../helper/beforeAfterEach");

describe("Products Page UI Tests", () => {
    // TODO: sa sterg linia de dedesubt daca nu reusesc sa o rezolv cu Mihai
    // require("../helper/beforeAfterEach")()

    beforeEach(async function () {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
    });

    afterEach(async function () {
        await ProductsPage.logout();
    });


    it(`should have the '${URLS.products}' url`, async () => {

        expect(await LoginPage.browserUrl()).toEqual(URLS.products);
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

    //#TODO: sa continui cu testele de UI de aici
})

describe("Products Test", () => {

    beforeEach(async function () {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
    });

    afterEach(async function () {
        await ProductsPage.logout();
    });

    it(`should have the '${URLS.products}' url`, async () => {

        expect(await LoginPage.browserUrl()).toEqual(URLS.products);
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
        const productsNamesText = await ProductsPage.productNames();

        expect(productsNamesText).toContain(ProductNames.backpack);
        expect(productsNamesText).toContain(ProductNames.bikeLight);
        expect(productsNamesText).toContain(ProductNames.boltShirt);
        expect(productsNamesText).toContain(ProductNames.fleeceJacket);
        expect(productsNamesText).toContain(ProductNames.onesie);
        expect(productsNamesText).toContain(ProductNames.redShirt);
    });

    it("should display all the 6 products images", async () => {
        let productsImagesSource = [];

        const productImage = await ProductsPage.allItemsImages;
        for (let i = 0; i < productImage.length; i++) {
            productsImagesSource.push(await productImage[i].getAttribute("src"));
        }

        expect(productsImagesSource).toContain(ImageSource.backpack);
        expect(productsImagesSource).toContain(ImageSource.bikeLight);
        expect(productsImagesSource).toContain(ImageSource.boltShirt);
        expect(productsImagesSource).toContain(ImageSource.fleeceJacket);
        expect(productsImagesSource).toContain(ImageSource.onesie);
        expect(productsImagesSource).toContain(ImageSource.redShirt);
    });

    it("should display all the 6 products prices", async () => {
        let productsPrices = [];
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);

        const productPrice = await ProductsPage.allItemsPrices;
        for (let i = 0; i < productPrice.length; i++) {
            productsPrices.push(await productPrice[i].getText());
        }

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
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);

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

xdescribe("Access the Products page without login Test", () => {
    //TODO: sa discut cu Mihai legat de acest TC si dc before/after each afecteaza acest describe
    it(`should not be able to access '${URLS.products}' without login`, async () => {
        await ProductsPage.open();

        expect(await LoginPage.lockedMessage.getText()).toEqual(
            "Epic sadface: Username and password do not match any user in this service"
        );
    })
})