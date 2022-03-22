const {PageObject} = require("./PageObject");

class ProductDetailed extends PageObject {

    get detailsImage() {
        return browser.$("//img[@class='inventory_details_img']");
    }
}

module.exports = new ProductDetailed();
