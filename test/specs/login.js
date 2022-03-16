const LoginPage = require('../pageobjects/LoginPage');
const {CREDENTIALS} = require("../helper/credentials");

describe('Browser Tests', () => {

    it('should have the "Swag Labs" title', async () => {
        await LoginPage.open();
        const browserTitle = await LoginPage.browserTitle()
        expect(browserTitle).toEqual('Swag Labs')
    });

    it('should have the "SWAGLABS" logo in header', async () => {
        await LoginPage.open();
        const swaglabsLogo = await LoginPage.swaglabsLogo.isDisplayed()
        expect(swaglabsLogo).toBe(true)
    });

    it('should have the "SWAGLABS" mascot', async () => {
        await LoginPage.open();
        const swaglabsLogo = await LoginPage.swaglabsMascot.isDisplayed()
        expect(swaglabsLogo).toBe(true)
    });

    it('should have the accepted usernames displayed', async () => {
        await LoginPage.open();
        const usernameText = await LoginPage.usernamesText.getText()
        expect(usernameText).toContain('Accepted usernames are:')
        expect(usernameText).toContain(CREDENTIALS.standard)
        expect(usernameText).toContain(CREDENTIALS.locked)
        expect(usernameText).toContain(CREDENTIALS.problem)
        expect(usernameText).toContain(CREDENTIALS.performance)
    });

    it('should have the accepted password displayed', async () => {
        await LoginPage.open();
        const passwordText = await LoginPage.passwordText.getText()
        expect(passwordText).toContain("Password for all users:")
        expect(passwordText).toContain(CREDENTIALS.password)
    });
})

describe('Login Test', () => {

    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
    });

    it('should keep the credentials after returning to login page', async () => {
        await LoginPage.open();
        await LoginPage.login(`${CREDENTIALS.standard}`, `${CREDENTIALS.password}`);
        await LoginPage.back()
        const usernameField = await LoginPage.inputUsername.getText()
        const passwordField = await LoginPage.inputPassword.getText()
        console.log(`The username field: `, usernameField)
        expect(usernameField).toEqual('')
        expect(passwordField).toEqual('')
    });

    it('should not login with locked credentials', async () => {
        await LoginPage.open();
        await LoginPage.login(`${CREDENTIALS.locked}`, `${CREDENTIALS.password}`);
        const errorMessage = await LoginPage.lockedMessage.getText()
        expect(errorMessage).toEqual('Epic sadface: Sorry, this user has been locked out.')
    });

    it('dog thumbnail image is displayed after login with problem credentials', async () => {
        // TODO: sa corectez TC-ul prin a compara img source-urile
        await LoginPage.open();
        await LoginPage.login(`${CREDENTIALS.problem}`, `${CREDENTIALS.password}`);
        const imageDisplayed = await LoginPage.problemImage.isDisplayed()
        expect(imageDisplayed).toBe(true)
    });

    it('performance test after login with performance credentials', async () => {
        let timeStop
        await LoginPage.open();
        let timeStart = new Date().getTime()
        await LoginPage.login(`${CREDENTIALS.performance}`, `${CREDENTIALS.password}`);
        const isFooterImageDisplayed = await LoginPage.footerImage.isDisplayed()
        if(isFooterImageDisplayed) {
            timeStop = new Date().getTime()
        }
        expect(Math.abs(timeStart - timeStop)/1000).toBeLessThan(1)
    });
});

describe("Login Negative Tests",  () => {
    it('should not login with no credentials', async () => {
        await LoginPage.open();
        await LoginPage.login(``, ``);
        const errorMessage = await LoginPage.lockedMessage.getText()
        console.log(errorMessage)
        expect(errorMessage).toEqual('Epic sadface: Username is required')
    });

    it('should not login with no password', async () => {
        await LoginPage.open();
        await LoginPage.login(`${CREDENTIALS.standard}`, ``);
        const errorMessage = await LoginPage.lockedMessage.getText()
        console.log(errorMessage)
        expect(errorMessage).toEqual('Epic sadface: Password is required')
    });

    it('should not login with no username', async () => {
        await LoginPage.open();
        await LoginPage.login(``, `${CREDENTIALS.password}`);
        const errorMessage = await LoginPage.lockedMessage.getText()
        console.log(errorMessage)
        expect(errorMessage).toEqual('Epic sadface: Username is required')
    });

    it('should not login with wrong password', async () => {
        await LoginPage.open();
        await LoginPage.login(`${CREDENTIALS.standard}`, `test`);
        const errorMessage = await LoginPage.lockedMessage.getText()
        console.log(errorMessage)
        expect(errorMessage).toEqual('Epic sadface: Username and password do not match any user in this service')
    });

    it('should not login with wrong username', async () => {
        await LoginPage.open();
        await LoginPage.login(`test`, `${CREDENTIALS.standard}`);
        const errorMessage = await LoginPage.lockedMessage.getText()
        console.log(errorMessage)
        expect(errorMessage).toEqual('Epic sadface: Username and password do not match any user in this service')
    });
})