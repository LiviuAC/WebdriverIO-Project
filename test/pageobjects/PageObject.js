/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

class PageObject {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path) {
        return browser.url(path);
    }

    back() {
        return browser.back();
    }

    browserTitle() {
        return browser.getTitle();
    }

    get appLogo(){
        return browser.$("div[class='app_logo']");
    }

    get btnBurgerMenu() {
        return browser.$("#react-burger-menu-btn");
    }

    get btnAllItems() {
        return browser.$("a[id='inventory_sidebar_link']");
    }

    get btnAbout() {
        return browser.$("a[id='about_sidebar_link']");
    }

    get btnLogout() {
        return browser.$("a[id='logout_sidebar_link']");
    }

    get btnResetAppState() {
        return browser.$("a[id='reset_sidebar_link']");
    }

    get ShoppingCartIcon() {
        return browser.$("a[class='shopping_cart_link']");
    }

    get ShoppingCartLabel() {
        return browser.$("span[class='shopping_cart_badge']");
    }

    get twitterIcon() {
        return browser.$('//a[@href="https://twitter.com/saucelabs"]');
    }

    get facebookIcon() {
        return browser.$('//a[@href="https://www.facebook.com/saucelabs"]');
    }

    get linkedInIcon() {
        return browser.$('//a[@href="https://www.linkedin.com/company/sauce-labs/"]');
    }

    get copyright() {
        return browser.$('//div[@class="footer_copy"]');
    }

    get robotFooter() {
        return browser.$('//img[@alt="Swag Bot Footer"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async logout() {
        await this.btnBurgerMenu.click();
        await this.btnLogout.waitForClickable();
        await this.btnLogout.click();
    }
}

exports.PageObject = PageObject;
