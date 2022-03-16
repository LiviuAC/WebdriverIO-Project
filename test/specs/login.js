const LoginPage = require('../pageobjects/LoginPage');
const {CREDENTIALS} = require("../helper/credentials");

xdescribe('Browser Tests', () => {

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
        let usernameList = []
        await LoginPage.open();
        const usernameText = await LoginPage.usernamesText.getText()
        usernameList.push(usernameText)
        expect(String(usernameList).replace(/^\[(.+)\]$/,'$1')).toEqual("Accepted" +
            " usernames are:\nstandard_user\nlocked_out_user\nproblem_user\nperformance_glitch_user")
    });

    it('should have the accepted password displayeda', async () => {
        let passwordList = []
        await LoginPage.open();
        const passwordText = await LoginPage.passwordText.getText()
        passwordList.push(passwordText)
        expect(String(passwordList).replace(/^\[(.+)\]$/,'$1')).toEqual("Password for" +
            " all users:\nsecret_sauce")
    });
})

xdescribe('Login Test', () => {

    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login(`${CREDENTIALS.standard}`, `${CREDENTIALS.password}`);
    });

    it('should keep the credentials after returning to login page', async () => {
        await LoginPage.open();
        await LoginPage.login(`${CREDENTIALS.standard}`, `${CREDENTIALS.password}`);
        await LoginPage.back()
        const usernameField = await LoginPage.inputUsername.getText()
        const passwordField = await LoginPage.inputPassword.getText()
        // sa vedem daca logica aceasta este buna sau daca putem folosi isEmpty(). Am incercat si nu mi-a mers
        expect(usernameField.length).toBeGreaterThan(0)
        expect(passwordField.length).toBeGreaterThan(0)
    });

    it('should not login with locked credentials', async () => {
        await LoginPage.open();
        await LoginPage.login(`${CREDENTIALS.locked}`, `${CREDENTIALS.password}`);
        const errorMessage = await LoginPage.lockedMessage.getText()
        expect(errorMessage).toEqual('Epic sadface: Sorry, this user has been locked out.')
    });

    it('dog thumbnail image is displayed after login with problem credentials', async () => {
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
        const footerImage = await LoginPage.footerImage.isDisplayed()
        if(footerImage) {
            timeStop = new Date().getTime()
        }
        expect(Math.abs(timeStart - timeStop)/1000).toBeLessThan(1)
    });
});

xdescribe("Login Negative Tests",  () => {
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