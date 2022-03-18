const {ProductsPage} = require("./ProductsPage");

class ProductDetailed extends ProductsPage {
    //TODO: sa discut cu Mihai cum sa fac sa pot mosteni ProductsPage

    get detailsImage() {
        return browser.$("//img[@class='inventory_details_img']");
    }
}

module.exports = new ProductDetailed();
