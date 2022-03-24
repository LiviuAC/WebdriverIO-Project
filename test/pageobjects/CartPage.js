const {PageObject} = require("./PageObject");

class CartPage extends PageObject {

    get url() {
        return '/cart.html'
    }

    open() {
        return super.open(this.url);
    }

    get cartQuantityLabelText() {
        return browser.$("//div[@class='cart_quantity_label']");
    }

    get cartDescriptionLabelText() {
        return browser.$("//div[@class='cart_desc_label']");
    }

    get productQuantityText() {
        return browser.$("//div[@class='cart_quantity']");
    }

    get productNameText() {
        return browser.$("//div[@class='inventory_item_name']");
    }

    get productDescriptionText() {
        return browser.$("//div[@class='inventory_item_desc']");
    }

    get btnContinueShopping() {
        return browser.$("//button[@id='continue-shopping']");
    }

    get btnCheckout() {
        return browser.$("//button[@id='checkout']");
    }
}

module.exports = new CartPage();
