const {PageObject} = require("./PageObject");

class CartPage extends PageObject {

    get url() {
        return '/cart.html'
    }

    open() {
        return super.open(this.url);
    }

    get productQuantityText() {
        return browser.$("//div[@class='cart_quantity']");
    }

    get btnContinueShopping() {
        return browser.$("//button[@id='continue-shopping']");
    }

    get btnCheckout() {
        return browser.$("//button[@id='checkout']");
    }
}

module.exports = new CartPage();
