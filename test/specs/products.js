const LoginPage = require("../pageobjects/LoginPage");
const InventoryPage = require("../pageobjects/ProductsPage");
const { CREDENTIALS } = require("../helper/credentials");
const { ImageSource, ProductPrices } = require("../helper/inventoryData");
const { ProductNames } = require("../helper/inventoryData");

describe("Products Test", () => {
    beforeEach(async function () {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
    });

    afterEach(async function () {
        await InventoryPage.logout();
    });

    it("the shopping cart label number should increase after adding a product", async () => {
        await InventoryPage.btnAddBackpack.click();

        expect(await InventoryPage.ShoppingCartBadge.getText()).toEqual("1");
        await InventoryPage.btnRemoveBackpack.click();
    });

    it("the shopping cart label number should decrease after removing a product", async () => {
        await InventoryPage.addMultipleItems();
        await InventoryPage.btnRemoveBackpack.click();

        expect(await InventoryPage.ShoppingCartBadge.getText()).toEqual("1");
        await InventoryPage.btnRemoveBikeLight.click();
    });

    it("the shopping cart label should not be displayed upon removing the last item", async () => {
        await InventoryPage.btnAddBackpack.click();
        await InventoryPage.btnRemoveBackpack.click();
        console.log("badge: ", await InventoryPage.ShoppingCartBadge.isDisplayed())

        expect(await InventoryPage.ShoppingCartBadge.isDisplayed()).toBe(false);
    });

    it("should display all the 6 products names", async () => {
        const productsNamesText = await InventoryPage.productNames();

        expect(productsNamesText).toContain(ProductNames.backpack);
        expect(productsNamesText).toContain(ProductNames.bikeLight);
        expect(productsNamesText).toContain(ProductNames.boltShirt);
        expect(productsNamesText).toContain(ProductNames.fleeceJacket);
        expect(productsNamesText).toContain(ProductNames.onesie);
        expect(productsNamesText).toContain(ProductNames.redShirt);
    });

    it("should display all the 6 products images", async () => {
        let productsImagesSource = [];

        const productImage = await InventoryPage.allItemsImages;
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

        const productPrice = await InventoryPage.allItemsPrices;
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

        const productPrice = await InventoryPage.allItemsPrices;
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
