const {PageObject} = require("./PageObject");

class InventoryPage extends PageObject {

    get btnAddBackpack () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get ShoppingCartBadge () {
        return $('#shopping_cart_container > a > span');
    }
}

module.exports = new InventoryPage();