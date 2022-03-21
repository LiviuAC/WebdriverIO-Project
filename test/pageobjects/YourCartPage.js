const {PageObject} = require("./PageObject");

class CartPage extends PageObject {

    get productName() {
        return browser.$("//div[@class='inventory_item_name']");
    }

    get btnContinueShopping() {
        return browser.$("//button[@id='continue-shopping']");
    }
}

module.exports = new CartPage();
