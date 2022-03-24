const {PageObject} = require("./PageObject");

class CheckoutPage extends PageObject {

    get url() {
        return '/checkout-step-one.html'
    }

    open() {
        return super.open(this.url);
    }
}

module.exports = new CheckoutPage();
