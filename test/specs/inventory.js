const LoginPage = require("../pageobjects/LoginPage");
const InventoryPage = require("../pageobjects/InventoryPage");
const {CREDENTIALS} = require("../helper/credentials");

describe('Login Test', () => {
    it('should be able to buy a product', async () => {
        await LoginPage.open();
        await LoginPage.login(`${CREDENTIALS.standard}`, `${CREDENTIALS.password}`);
        await InventoryPage.btnAddBackpack.click()
        const shoppingCart = await InventoryPage.ShoppingCartBadge.getText()
        expect(shoppingCart).toEqual('1')
    });
})

