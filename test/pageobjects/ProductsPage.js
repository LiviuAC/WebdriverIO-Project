const {PageObject} = require("./PageObject");

class ProductsPage extends PageObject {

    get url() {
        return '/inventory.html'
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

    get filterDropdownMenu() {
        return browser.$("//span[@class='select_container']");
    }

    get filterActiveOption() {
        return browser.$("//span[@class='active_option']");
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

    get allItemsDescriptions() {
        return browser.$$('//div[@class="inventory_item_desc"]');
    }

    async addMultipleItems() {
        await this.btnAddBackpack.click();
        await this.btnAddBikeLight.click()
    }

    async productData(productDetail) {
        switch(productDetail){
            case 'names':
                let productsNamesText = []
                const productNames = await this.allItemsName;
                for (let i = 0; i < productNames.length; i++) {
                    productsNamesText.push(await productNames[i].getText())
                }
                return productsNamesText
            case 'prices':
                let productsPrices = [];
                const productPrice = await this.allItemsPrices;
                for (let i = 0; i < productPrice.length; i++) {
                    productsPrices.push(await productPrice[i].getText());
                }
                return productsPrices
            case 'images':
                let productsImagesSource = [];
                const productImage = await this.allItemsImages;
                for (let i = 0; i < productImage.length; i++) {
                    productsImagesSource.push(await productImage[i].getAttribute("src"));
                }
                return productsImagesSource
            case 'details':
                let productsDetailsText = [];
                const productDetail = await this.allItemsDescriptions;
                for (let i = 0; i < productDetail.length; i++) {
                    productsDetailsText.push(await productDetail[i].getText());
                }
                return productsDetailsText
        }
    }
}

module.exports = new ProductsPage();
