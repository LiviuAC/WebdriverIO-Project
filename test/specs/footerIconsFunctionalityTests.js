const LoginPage = require("../pageobjects/LoginPage");
const {CREDENTIALS} = require("../helper/credentials");
const ProductsPage = require("../pageobjects/ProductsPage");

describe('Footer Icons Functionality Tests', () => {

    beforeEach(async function () {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
    });

    afterEach(async function () {
        await ProductsPage.logout();
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
