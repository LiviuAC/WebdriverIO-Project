const ProductsPage = require("../pageobjects/ProductsPage");
const LoginPage = require("../pageobjects/LoginPage");
const ProductDetailsPage = require("../pageobjects/ProductDetailsPage");
const {CREDENTIALS} = require("../helper/credentials");
const {ImageSource, ProductNames, ProductDescriptions, BurgerMenuText} = require("../helper/inventoryData");


describe(" Product Details Page Tests", () => {
    describe("Products Details Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.allItemsImages[0].click()
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it(`should contain '${ProductsPage.url}' in url`, async () => {

            expect(await browser.getUrl()).toContain(ProductDetailsPage.url);
        });

        it('check Header UI elements', async () => {

            expect(await ProductDetailsPage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await ProductDetailsPage.appLogo.isDisplayed()).toBe(true);
            expect(await ProductDetailsPage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await ProductDetailsPage.btnBackToProducts.isDisplayed()).toBe(true);
        })

        it("should display only the 'ADD TO CART' button when accessing the page", async () => {

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(true);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
        })

        it("should display only the 'Sauce Labs Backpack' details upon clicking on its image", async () => {

            expect(await ProductDetailsPage.detailsImage.getAttribute('src')).toEqual(ImageSource.backpack);
            expect(await ProductDetailsPage.detailsImage.getAttribute('src')).not.toEqual(ImageSource.bikeLight);
            expect(await ProductDetailsPage.detailsName.getText()).toEqual(ProductNames.backpack);
            expect(await ProductDetailsPage.detailsName.getText()).not.toEqual(ProductNames.bikeLight);
            expect(await ProductDetailsPage.detailsDescription.getText()).toEqual(ProductDescriptions.backpack);
            expect(await ProductDetailsPage.detailsDescription.getText()).not.toEqual(ProductDescriptions.bikeLight);
        });
    })

    describe("Access the Products Details page directly without login Test", () => {
        it(`should not be able to access the page directly without login`, async () => {
            await ProductDetailsPage.open();

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: You can only access '/inventory-item.html' when you are logged in."
            );
        })
    })

    describe("Burger Menu Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.allItemsImages[0].click()
        });

        it("check Burger Menu UI elements", async () => {
            const bmItemsText = await ProductsPage.burgerMenuItemsText()

            expect(bmItemsText).toContain(BurgerMenuText.allItems.toUpperCase());
            expect(bmItemsText).toContain(BurgerMenuText.about.toUpperCase());
            expect(bmItemsText).toContain(BurgerMenuText.logout.toUpperCase());
            expect(bmItemsText).toContain(BurgerMenuText.resetAppState.toUpperCase());

            await ProductsPage.btnLogout.click();
        })

        it("the 'X' button should close the burger menu", async () => {
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
            await ProductsPage.btnBurgerMenu.click();
            await ProductsPage.btnAllItems.waitForClickable();
            await ProductsPage.btnAllItems.click();

            expect(await browser.getUrl()).toContain(ProductsPage.url);
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

    describe('Products Details Tests', () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.allItemsImages[0].click()
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("the user should be able to add to cart and remove the product", async () => {
            await ProductsPage.btnAddBackpack.click();

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(false);
            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(true);
            expect(await ProductsPage.shoppingCartLabel.getText()).toEqual("1");

            await ProductsPage.btnRemoveBackpack.click();

            expect(await ProductsPage.shoppingCartLabel.isDisplayed()).toBe(false);
            });

        //TODO: sa continui de aici cu adaugarea testelor
    })

    describe('Footer Tests', () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.allItemsImages[0].click()
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("check Footer UI elements", async () => {

            expect(await ProductsPage.twitterIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.facebookIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.linkedInIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.copyright.isDisplayed()).toBe(true);
            expect(await ProductsPage.copyright.getText()).toContain("© 2022 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
            expect(await ProductsPage.robotFooter.isDisplayed()).toBe(true);
            expect(await ProductsPage.robotFooter.getAttribute('src')).toEqual(ImageSource.footerRobot);
        });

        it("the 'Twitter' icon should redirect to the Sauce Labs Twitter url", async () => {
            await ProductsPage.twitterIcon.waitForClickable()
            await ProductsPage.twitterIcon.click()
            await browser.switchWindow("https://twitter.com/saucelabs")

            expect(await browser.getUrl()).toEqual("https://twitter.com/saucelabs");
            await ProductsPage.closeWindowAndSwitchBack()
        })

        it("the 'Facebook' icon should redirect to the Sauce Labs Facebook url", async () => {
            await ProductsPage.facebookIcon.waitForClickable()
            await ProductsPage.facebookIcon.click()
            await browser.switchWindow("https://www.facebook.com/saucelabs")

            expect(await browser.getUrl()).toEqual("https://www.facebook.com/saucelabs");
            await ProductsPage.closeWindowAndSwitchBack()
        })

        it("the 'LinkedIn' icon should redirect to the Sauce Labs LinkedIn url", async () => {
            await ProductsPage.linkedInIcon.waitForClickable()
            await ProductsPage.linkedInIcon.click()
            await browser.switchWindow("https://www.linkedin.com/company/sauce-labs/")

            expect(await browser.getUrl()).toEqual("https://www.linkedin.com/company/sauce-labs/");
            await ProductsPage.closeWindowAndSwitchBack()
        })
    })
})
