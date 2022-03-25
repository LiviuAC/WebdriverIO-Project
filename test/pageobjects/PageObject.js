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

    get errorMessage() {
        return browser.$("h3[data-test='error']");
    }

    get errorButton() {
        return browser.$("button[class='error-button']");
    }

    get appLogo(){
        return browser.$("div[class='app_logo']");
    }

    get header() {
        return browser.$("//span[@class='title']");
    }

    get btnBurgerMenu() {
        return browser.$("#react-burger-menu-btn");
    }

    get allBurgerMenuItems() {
        return browser.$$("a[class='bm-item menu-item']");
    }

    get btnCloseBurgerMenu() {
        return browser.$("button[id='react-burger-cross-btn']");
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

    get btnCancel() {
        return browser.$("//button[@id='cancel']");
    }

    get shoppingCartIcon() {
        return browser.$("a[class='shopping_cart_link']");
    }

    get shoppingCartLabel() {
        return browser.$("span[class='shopping_cart_badge']");
    }

    get quantityLabelText() {
        return browser.$("//div[@class='cart_quantity_label']");
    }

    get descriptionLabelText() {
        return browser.$("//div[@class='cart_desc_label']");
    }

    get productQuantityText() {
        return browser.$("//div[@class='cart_quantity']");
    }

    get productNameText() {
        return browser.$("//div[@class='inventory_item_name']");
    }

    get productDescriptionText() {
        return browser.$("//div[@class='inventory_item_desc']");
    }

    get productPriceText() {
        return browser.$("//div[@class='inventory_item_price']");
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

    async burgerMenuItemsText() {
        let bmItemsText = []

        await this.btnBurgerMenu.click();
        await this.btnResetAppState.waitForClickable();

        const bmItem = await this.allBurgerMenuItems;
        for (let i = 0; i < bmItem.length; i++) {
            bmItemsText.push(await bmItem[i].getText())
        }
        return bmItemsText
    }

    async closeWindowAndSwitchBack() {
        await browser.closeWindow()
        await browser.switchWindow('Swag Labs')
    }
}

exports.PageObject = PageObject;
