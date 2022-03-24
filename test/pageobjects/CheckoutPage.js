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

    async fillForm(option) {
        switch (option) {
            case "validInputs":
                await this.firstNameText.setValue("testFirstName")
                await this.lastNameText.setValue("testLastName")
                await this.zipCodeText.setValue("000000")
                await this.btnContinue.click()
                break
            case "emptyFormFields":
                await this.firstNameText.setValue("")
                await this.lastNameText.setValue("")
                await this.zipCodeText.setValue("")
                await this.btnContinue.click()
                break
            case "emptyFirstNameField":
                await this.firstNameText.setValue("")
                await this.lastNameText.setValue("testLastName")
                await this.zipCodeText.setValue("000000")
                await this.btnContinue.click()
                break
            case "emptyLastNameField":
                await this.firstNameText.setValue("testLastName")
                await this.lastNameText.setValue("")
                await this.zipCodeText.setValue("000000")
                await this.btnContinue.click()
                break
            case "emptyZipCodeField":
                await this.firstNameText.setValue("testFirstName")
                await this.lastNameText.setValue("testLastName")
                await this.zipCodeText.setValue("")
                await this.btnContinue.click()
                break
            case "fiveNumbersZipCodeField":
                await this.firstNameText.setValue("testFirstName")
                await this.lastNameText.setValue("testLastName")
                await this.zipCodeText.setValue("00000")
                await this.btnContinue.click()
                break
            case "lettersZipCodeField":
                await this.firstNameText.setValue("testFirstName")
                await this.lastNameText.setValue("testLastName")
                await this.zipCodeText.setValue("testZipCode")
                await this.btnContinue.click()
                break
        }
    }

    // checkout step two

}

module.exports = new CheckoutPage();
