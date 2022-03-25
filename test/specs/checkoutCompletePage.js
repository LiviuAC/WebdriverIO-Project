const LoginPage = require("../pageobjects/LoginPage");
const {CREDENTIALS, checkoutURL} = require("../helper/testData");
const CheckoutPage = require("../pageobjects/CheckoutPage");
const {ImageSource} = require("../helper/inventoryData");

describe(" Checkout Complete Page Tests", () => {

    describe("Checkout Complete Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await CheckoutPage.addProductAndProceedToCheckout("oneItem")
            await CheckoutPage.completeCheckoutStepOne("testFirstName", "testLastName", "000000")
            await CheckoutPage.btnFinish.click()
        });

        afterEach(async function () {
            await CheckoutPage.logout();
        });

        it(`should contain '${checkoutURL.complete}' in url`, async () => {

            expect(await browser.getUrl()).toContain(checkoutURL.complete);
        });

        it('check Header UI elements', async () => {

            expect(await CheckoutPage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await CheckoutPage.appLogo.isDisplayed()).toBe(true);
            expect(await CheckoutPage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.header.getText()).toEqual("CHECKOUT: COMPLETE!");
        })

        it("check Footer UI elements", async () => {

            expect(await CheckoutPage.twitterIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.facebookIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.linkedInIcon.isDisplayed()).toBe(true);
            expect(await CheckoutPage.copyright.isDisplayed()).toBe(true);
            expect(await CheckoutPage.copyright.getText()).toContain("© 2022 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
            expect(await CheckoutPage.robotFooter.isDisplayed()).toBe(true);
            expect(await CheckoutPage.robotFooter.getAttribute('src')).toEqual(ImageSource.footerRobot);
        });
    })
})