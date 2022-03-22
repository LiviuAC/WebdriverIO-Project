const {PageObject} = require("./PageObject");

class ProductDetails extends PageObject {

    get url() {
        return '/inventory-item.html?id=4'
    }

    open() {
        return super.open(this.url);
    }

    get btnBackToProducts() {
        return browser.$("//button[@id='back-to-products']"); //
    }

    get detailsImage() {
        return browser.$("//img[@class='inventory_details_img']");
    }

    get detailsName() {
        return browser.$("//div[@class='inventory_details_name large_size']");
    }

    get detailsDescription() {
        return browser.$("//div[@class='inventory_details_desc large_size']");
    }

    get detailsPrice() {
        return browser.$("//div[@class='inventory_details_price']");
    }
}

module.exports = new ProductDetails();
