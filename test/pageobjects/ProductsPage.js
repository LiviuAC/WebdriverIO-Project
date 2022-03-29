const {PageObject} = require("./PageObject");
const {ProductPrices} = require("../helper/inventoryData");
const CartPage = require("./CartPage");

class ProductsPage extends PageObject {

    get url() {
        return '/inventory.html'
    }

    open() {
        return super.open(this.url);
    }

    get btnAddBackpack() {
        return browser.$("//button[@id='add-to-cart-sauce-labs-backpack']");
    }

    get btnRemoveBackpack() {
        return browser.$("//button[@id='remove-sauce-labs-backpack']");
    }

    get btnAddBikeLight() {
        return browser.$("//button[@id='add-to-cart-sauce-labs-bike-light']");
    }

    get btnRemoveBikeLight() {
        return browser.$("//button[@id='remove-sauce-labs-bike-light']");
    }

    get filterDropdownMenu() {
        return browser.$("//span[@class='select_container']");
    }

    get filterActiveOption() {
        return browser.$("//span[@class='active_option']");
    }

    get btnLoHiPrice() {
        return browser.$('//option[@value="lohi"]');
    }

    get btnHiLoPrice() {
        return browser.$('//option[@value="hilo"]');
    }

    get btnAZName() {
        return browser.$('//option[@value="az"]');
    }

    get btnZAName() {
        return browser.$('//option[@value="za"]');
    }

    get robotPeek() {
        return browser.$("//div[@class='peek']");
    }

    get allItemsImages() {
        return browser.$$("//img[@class='inventory_item_img']");
    }

    get allItemsName() {
        return browser.$$("//div[@class='inventory_item_name']");
    }

    get allItemsPrices() {
        return browser.$$("//div[@class = 'inventory_item_price']");
    }

    get allItemsDescriptions() {
        return browser.$$('//div[@class="inventory_item_desc"]');
    }

    get btnAddToCart() {
        return browser.$$('//button[@class="btn btn_primary btn_small btn_inventory"]');
    }

    async addMultipleItems() {
        await this.btnAddBackpack.click();
        await this.btnAddBikeLight.click()
    }

    async addToCartButtons() {
        let addToCartButtons = [];
        const addToCart = await this.btnAddToCart;
        for (let i = 0; i < addToCart.length; i++) {
            addToCartButtons.push(await addToCart[i].getText());
        }
        return addToCartButtons
    }

    async filterData(option) {
        await this.filterDropdownMenu.click()
        switch (option){
            case 'priceAscending':
                await this.btnLoHiPrice.click()
                break
            case 'priceDescending':
                await this.btnHiLoPrice.click()
                break
            case 'nameAscending':
                await this.btnAZName.click()
                break
            case 'nameDescending':
                await this.btnZAName.click()
                break
        }
    }

    async addProductAndProceedToCheckout(option) {
        switch(option){
            case 'oneItem':
                await this.btnAddBackpack.click()
                break
            case 'multipleItems':
                await this.addMultipleItems()
                break
        }
        await this.shoppingCartIcon.click()
        await CartPage.btnCheckout.click()
    }
}

module.exports = new ProductsPage();
