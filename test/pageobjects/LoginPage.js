const {PageObject} = require("./PageObject");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends PageObject {

    /**
     * define selectors using getter methods
     */

    get url() {
        return '/'
    }

    open () {
        return super.open(this.url);
    }

    back() {
        return super.back();
    }

    browserTitle() {
        return super.title();
    }

    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    get lockedMessage(){
        return $('div.error-message-container.error > h3')
    }

    get problemImage(){
        return $('#item_4_img_link > img')
    }

    get footerImage(){
        return $('#page_wrapper > footer > img')
    }

    get swaglabsLogo(){
        return $('#root > div > div.login_logo')
    }

    get swaglabsMascot(){
        return $('div.login_wrapper-inner > div.bot_column')
    }

    get usernamesText(){
        return $('#login_credentials')
    }

    get passwordText(){
        return $(' div.login_password')

    }

    // get titlePage() {
    //     // browser.url(this.url)
    //     // const $title = browser.getTitle()
    //     return $('head > title')
    // }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */

}

module.exports = new LoginPage();
