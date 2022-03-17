const {PageObject} = require("./PageObject");

class ProductsPage extends PageObject {

    get url() {
        return '/inventory'
    }

    open() {
        return super.open(this.url);
    }

    get btnAddBackpack() {
        return browser.$("//button[@id='add-to-cart-sauce-labs-backpack']"); //
    }

    get btnRemoveBackpack() {
        return browser.$("//button[@id='remove-sauce-labs-backpack']"); //
    }

    get btnAddBikeLight() {
        return browser.$("//button[@id='add-to-cart-sauce-labs-bike-light']"); //
    }

    get btnRemoveBikeLight() {
        return browser.$("//button[@id='remove-sauce-labs-bike-light']"); //
    }

    get ShoppingCartBadge() {
        return browser.$("//span[@class='shopping_cart_badge']");
    }

    get ProductsHeader() {
        return browser.$("//span[@class='title']");
    }

    get allItemsImages() {
        return browser.$$("//img[@class='inventory_item_img']");
    }

    get allItemsName() {
        return browser.$$("//div[@class='inventory_item_name']");
    }

    get allItemsPrices() {
        return browser.$$('//div[@class="inventory_item_price"]');
    }

    async addMultipleItems() {
        await this.btnAddBackpack.click();
        await this.btnAddBikeLight.click()
    }

    async productNames() {
        let productsNamesText = []
        const productNames = await this.allItemsName;
        for (let i = 0; i < productNames.length; i++) {
            productsNamesText.push(await productNames[i].getText())
        }
        return productsNamesText
    }
}

module.exports = new ProductsPage();
