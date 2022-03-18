const LoginPage = require("../pageobjects/LoginPage");
const InventoryPage = require("../pageobjects/ProductsPage");
const { CREDENTIALS } = require("../helper/credentials");
const { ImageSource} = require("../helper/inventoryData");

describe('Login Page Tests', () => {

    describe("Login Page UI Tests", () => {

        it(`should contain '${LoginPage.url}' in url`, async () => {
            await LoginPage.open();

            expect(await browser.getUrl()).toContain(LoginPage.url);
        });

        it('should have the "Swag Labs" title', async () => {
            await LoginPage.open();

            expect(await LoginPage.browserTitle()).toEqual("Swag Labs");
        });

        it('should have the "SWAGLABS" logo in header', async () => {
            await LoginPage.open();

            expect(await LoginPage.swaglabsLogo.isDisplayed()).toBe(true);
        });

        it('should have the "SWAGLABS" mascot', async () => {
            await LoginPage.open();

            expect(await LoginPage.swaglabsMascot.isDisplayed()).toBe(true);
        });

        it("should have the accepted usernames displayed", async () => {
            await LoginPage.open();
            const usernameFieldText = await LoginPage.usernamesText.getText();

            expect(usernameFieldText).toContain("Accepted usernames are:");
            expect(usernameFieldText).toContain(CREDENTIALS.standard);
            expect(usernameFieldText).toContain(CREDENTIALS.locked);
            expect(usernameFieldText).toContain(CREDENTIALS.problem);
            expect(usernameFieldText).toContain(CREDENTIALS.performance);
        });

        it("should have the accepted password displayed", async () => {
            await LoginPage.open();
            const passwordFieldText = await LoginPage.passwordText.getText();

            expect(passwordFieldText).toContain("Password for all users:");
            expect(passwordFieldText).toContain(CREDENTIALS.password);
        });
    });

    describe("Login Positive Tests", () => {
        it("should login with valid credentials", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);

            expect(await InventoryPage.ProductsHeader.getText()).toEqual("PRODUCTS");
        });

        it("should not login with locked credentials", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.locked, CREDENTIALS.password);

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: Sorry, this user has been locked out."
            );
        });

        it("incorect thumbnail image is displayed after login with problem credentials", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.problem, CREDENTIALS.password);

            expect(await LoginPage.imageLocation.getAttribute("src")).toEqual(
                ImageSource.backpack
            );
        });

        it("performance test after login with performance credentials", async () => {
            let timeStop;
            await LoginPage.open();
            let timeStart = new Date().getTime();
            await LoginPage.login(CREDENTIALS.performance, CREDENTIALS.password);
            if (await LoginPage.footerImage.isDisplayed()) {
                timeStop = new Date().getTime();
            }

            expect(Math.abs(timeStart - timeStop) / 1000).toBeLessThan(1);
        });

        it("should not keep the credentials after returning to login page", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await LoginPage.back();

            expect(await LoginPage.inputUsername.getText()).toEqual("");
            expect(await LoginPage.inputPassword.getText()).toEqual("");
        });
    });

    describe("Login Negative Tests", () => {
        it("should not login with no username and password", async () => {
            await LoginPage.open();
            await LoginPage.login(``, ``);

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: Username is required"
            );
        });

        it("should not login with no password", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, ``);

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: Password is required"
            );
        });

        it("should not login with no username", async () => {
            await LoginPage.open();
            await LoginPage.login(``, CREDENTIALS.password);

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: Username is required"
            );
        });

        it("should not login with wrong password", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, `test`);

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: Username and password do not match any user in this service"
            );
        });

        it("should not login with wrong username", async () => {
            await LoginPage.open();
            await LoginPage.login(`test`, CREDENTIALS.password);

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: Username and password do not match any user in this service"
            );
        });

        it("should not login with wrong username and wrong password", async () => {
            await LoginPage.open();
            await LoginPage.login(`test`, "test");

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: Username and password do not match any user in this service"
            );
        });
    });
})
