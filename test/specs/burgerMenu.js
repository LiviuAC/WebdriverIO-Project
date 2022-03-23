const LoginPage = require("../pageobjects/LoginPage");
const {CREDENTIALS} = require("../helper/credentials");
const ProductsPage = require("../pageobjects/ProductsPage");
const {BurgerMenuText} = require("../helper/inventoryData");

describe("Burger Menu Tests", () => {

    it("check Burger Menu UI elements", async () => {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        const bmItemsText = await ProductsPage.burgerMenuItemsText()

        expect(bmItemsText).toContain(BurgerMenuText.allItems.toUpperCase());
        expect(bmItemsText).toContain(BurgerMenuText.about.toUpperCase());
        expect(bmItemsText).toContain(BurgerMenuText.logout.toUpperCase());
        expect(bmItemsText).toContain(BurgerMenuText.resetAppState.toUpperCase());

        await ProductsPage.btnLogout.click();
    })

    it("the 'X' button should close the burger menu", async () => {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        await ProductsPage.btnBurgerMenu.click();
        await ProductsPage.btnCloseBurgerMenu.waitForClickable();
        await ProductsPage.btnCloseBurgerMenu.click();
        await ProductsPage.btnBurgerMenu.waitForClickable();

        expect(await ProductsPage.btnCloseBurgerMenu.isDisplayed()).toBe(false)
        expect(await ProductsPage.btnLogout.isDisplayed()).toBe(false)
        expect(await ProductsPage.btnBurgerMenu.isDisplayed()).toBe(true)

        await LoginPage.logout();
    })

    it("the 'ALL ITEMS' button should redirect to the Products page", async () => {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        await ProductsPage.allItemsImages[0].click()
        await ProductsPage.btnBurgerMenu.click();
        await ProductsPage.btnAllItems.waitForClickable();
        await ProductsPage.btnAllItems.click();

        expect(await browser.getUrl()).toContain(ProductsPage.url);
        await LoginPage.logout();
    })

    it("the 'About' button should redirect to the 'https://saucelabs.com/' url", async () => {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        await ProductsPage.btnBurgerMenu.click();
        await ProductsPage.btnAbout.waitForClickable();
        await ProductsPage.btnAbout.click();

        expect(await browser.getUrl()).toEqual("https://saucelabs.com/");
    })

    it("the 'Logout' button should redirect to the Login page", async () => {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        await ProductsPage.btnBurgerMenu.click();
        await ProductsPage.btnLogout.waitForClickable();
        await ProductsPage.btnLogout.click();

        expect(await browser.getUrl()).toContain(LoginPage.url);
    })
})