const {PageObject} = require("./PageObject");

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

    get btnCancel() {
        return browser.$("//button[@id='cancel']");
    }

    get btnContinue() {
        return browser.$("//input[@id='continue']");
    }

    async fillForm(firstName, lastName, zipCodeText) {
        await this.firstNameText.setValue(firstName)
        await this.lastNameText.setValue(lastName)
        await this.zipCodeText.setValue(zipCodeText)
        await this.btnContinue.click() }

    // checkout step two

}

module.exports = new CheckoutPage();
