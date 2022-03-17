const LoginPage = require("../pageobjects/LoginPage");
const {CREDENTIALS} = require("./credentials");
const ProductsPage = require("../pageobjects/ProductsPage");

// acest fisier a fost creat facand raspunsul de la
// https://stackoverflow.com/questions/60652008/is-there-a-way-to-not-execute-beforeeach-function-only-for-certain-tests-it-b
// dar nu a mers

module.exports = function () {

    beforeEach(async function () {
        await LoginPage.open();
        await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
    });

    afterEach(async function () {
        await ProductsPage.logout();
    });
}