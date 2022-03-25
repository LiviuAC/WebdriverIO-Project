const {PageObject} = require("./PageObject");
const LoginPage = require("./LoginPage");
const {CREDENTIALS} = require("../helper/testData");
const ProductsPage = require("./ProductsPage");
const CartPage = require("./CartPage");

class CheckoutPage extends PageObject {

    get url() {
        return '/checkout-step-one.html'
    }

    open() {
        return super.open(this.url);
    }

    // checkout step one
    get firstNameText() {
        return browser.$("//input[@id='first-name']");
    }

    get lastNameText() {
        return browser.$("//input[@id='last-name']");
    }

    get zipCodeText() {
        return browser.$("//input[@id='postal-code']");
    }

    get btnContinue() {
        return browser.$("//input[@id='continue']");
    }

    async completeCheckoutStepOne(firstName, lastName, zipCodeText) {
        await this.firstNameText.setValue(firstName)
        await this.lastNameText.setValue(lastName)
        await this.zipCodeText.setValue(zipCodeText)
        await this.btnContinue.click() }

    // checkout step two

    get summaryInfoText() {
        return browser.$("//div[@class='summary_info']");
    }

    get btnFinish() {
        return browser.$("//button[@id='finish']");
    }

    get itemTotalPriceText() {
        return browser.$("//div[@class='summary_subtotal_label']");
    }
    get taxPriceText() {
        return browser.$("//div[@class='summary_tax_label']");
    }
    get totalPriceText() {
        return browser.$("//div[@class='summary_total_label']");
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

    async addProductAndProceedToCheckout(option) {
        switch(option){
            case 'oneItem':
                await ProductsPage.btnAddBackpack.click()
                break
            case 'multipleItems':
                await ProductsPage.addMultipleItems()
                break
        }
        await ProductsPage.shoppingCartIcon.click()
        await CartPage.btnCheckout.click()
    }

    async checkoutProductData(data) {
        switch(data){
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
                let numberPrice
                for (let i = 0; i < productPrice.length; i++) {
                    numberPrice = await productPrice[i].getText()
                    productsPrices.push(numberPrice.replace("$", ""));
                }
                return productsPrices
            case 'descriptions':
                let productsDetailsText = [];
                const productDetail = await this.allItemsDescriptions;
                for (let i = 0; i < productDetail.length; i++) {
                    productsDetailsText.push(await productDetail[i].getText());
                }
                return productsDetailsText
        }
    }

    // checkout complete

    get btnBackHome() {
        return browser.$("//button[@id='back-to-products']");
    }
}

module.exports = new CheckoutPage();
