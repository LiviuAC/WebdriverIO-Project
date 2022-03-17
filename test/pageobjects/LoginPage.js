const { PageObject } = require("./PageObject");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends PageObject {
    /**
     * define selectors using getter methods
     */

    get url() {
        return "/";
    }

    open() {
        return super.open(this.url);
    }

    get inputUsername() {
        return browser.$("#user-name");
    }

    get inputPassword() {
        return browser.$("#password");
    }

    get btnSubmit() {
        return browser.$("#login-button");
    }

    get lockedMessage() {
        return browser.$("h3[data-test='error']");
    }

    get imageLocation() {
        return browser.$("#item_4_img_link > img");
    }

    get footerImage() {
        return browser.$('img[alt="Swag Bot Footer"]');
    }

    get swaglabsLogo() {
        return browser.$("div.login_logo");
    }

    get swaglabsMascot() {
        return browser.$("div.bot_column");
    }

    get usernamesText() {
        return browser.$("#login_credentials");
    }

    get passwordText() {
        return browser.$("div.login_password");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
}

module.exports = new LoginPage();
