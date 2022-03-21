const LoginPage = require("../pageobjects/LoginPage");
const ProductsPage = require("../pageobjects/ProductsPage");
const CartPage = require("../pageobjects/YourCartPage");
const { CREDENTIALS } = require("../helper/credentials");
const { ImageSource, ProductPrices, filterOptions, ProductDescriptions, BurgerMenu} = require("../helper/inventoryData");
const { ProductNames } = require("../helper/inventoryData");
const {titleContains} = require("wdio-wait-for");

describe('Products Page Tests', () => {

    describe("Products Page UI Tests", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it(`should contain '${ProductsPage.url}' in url`, async () => {

            expect(await browser.getUrl()).toContain(ProductsPage.url);
        });

        it('check Header UI elements', async () => {
            const filterOptionsText = await ProductsPage.filterDropdownMenu.getText()

            expect(await ProductsPage.btnBurgerMenu.isDisplayed()).toBe(true);
            expect(await ProductsPage.appLogo.isDisplayed()).toBe(true);
            expect(await ProductsPage.shoppingCartIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.productsHeader.getText()).toEqual("PRODUCTS");
            expect(await ProductsPage.robotPeek.isDisplayed()).toBe(true);
            expect(await ProductsPage.filterDropdownMenu.isDisplayed()).toBe(true);
            expect(await ProductsPage.filterActiveOption.getText()).toEqual(filterOptions.nameAscending.toUpperCase());
            expect(filterOptionsText).toContain(filterOptions.nameAscending)
            expect(filterOptionsText).toContain(filterOptions.nameDescending)
            expect(filterOptionsText).toContain(filterOptions.priceAscending)
            expect(filterOptionsText).toContain(filterOptions.priceDescending)
        });

        it("should display all the 6 products names", async () => {
            const productsNamesText = await ProductsPage.productData('names');

            expect(productsNamesText).toContain(ProductNames.backpack);
            expect(productsNamesText).toContain(ProductNames.bikeLight);
            expect(productsNamesText).toContain(ProductNames.boltShirt);
            expect(productsNamesText).toContain(ProductNames.fleeceJacket);
            expect(productsNamesText).toContain(ProductNames.onesie);
            expect(productsNamesText).toContain(ProductNames.redShirt);
            expect(productsNamesText.length).toEqual(6)
        });

        it("should display all the 6 products images", async () => {
            const productsImagesSource = await ProductsPage.productData('images');

            expect(productsImagesSource).toContain(ImageSource.backpack);
            expect(productsImagesSource).toContain(ImageSource.bikeLight);
            expect(productsImagesSource).toContain(ImageSource.boltShirt);
            expect(productsImagesSource).toContain(ImageSource.fleeceJacket);
            expect(productsImagesSource).toContain(ImageSource.onesie);
            expect(productsImagesSource).toContain(ImageSource.redShirt);
            expect(productsImagesSource.length).toEqual(6)
        });

        it("should display all the 6 products prices", async () => {
            const productsPricesText = await ProductsPage.productData('prices');

            expect(productsPricesText).toContain(ProductPrices.backpack);
            expect(productsPricesText).toContain(ProductPrices.bikeLight);
            expect(productsPricesText).toContain(ProductPrices.boltShirt);
            expect(productsPricesText).toContain(ProductPrices.fleeceJacket);
            expect(productsPricesText).toContain(ProductPrices.onesie);
            expect(productsPricesText).toContain(ProductPrices.redShirt);
            expect(productsPricesText.length).toEqual(6)
        });

        it("should display all the 6 products descriptions", async () => {
            const productsDescriptionsText = await ProductsPage.productData('descriptions');

            expect(productsDescriptionsText).toContain(ProductDescriptions.backpack);
            expect(productsDescriptionsText).toContain(ProductDescriptions.bikeLight);
            expect(productsDescriptionsText).toContain(ProductDescriptions.boltShirt);
            expect(productsDescriptionsText).toContain(ProductDescriptions.fleeceJacket);
            expect(productsDescriptionsText).toContain(ProductDescriptions.onesie);
            expect(productsDescriptionsText).toContain(ProductDescriptions.redShirt);
            expect(productsDescriptionsText.length).toEqual(6)
        });

        it("should display all the 6 'ADD TO CART' buttons", async () => {
            const btnsAddToCart = await ProductsPage.addToCartButtons();

            expect(btnsAddToCart.every( (val) => val === "ADD TO CART" )).toBe(true);
            expect(btnsAddToCart.length).toEqual(6)
        });

        it("should not display the 'Remove' button", async () => {

            expect(await ProductsPage.btnRemoveBackpack.isDisplayed()).toBe(false);
            expect(await ProductsPage.btnRemoveBikeLight.isDisplayed()).toBe(false);
        });
    })

    describe("Access the Products page directly without login Test", () => {
        it(`should not be able to access the page directly without login`, async () => {
            await ProductsPage.open();

            expect(await LoginPage.errorMessage.getText()).toEqual(
                "Epic sadface: You can only access '/inventory.html' when you are logged in."
            );
        })
    })

    describe("Products Test", () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("the user should be able to add to cart and remove the 'Sauce Labs Backpack' product",
            async () => {
            await ProductsPage.btnAddBackpack.click();

            expect(await ProductsPage.btnAddBackpack.isDisplayed()).toBe(false);
            expect(await ProductsPage.shoppingCartLabel.getText()).toEqual("1");

            await ProductsPage.btnRemoveBackpack.click();

            expect(await ProductsPage.shoppingCartLabel.isDisplayed()).toBe(false);
        });

        it("the shopping cart label number should decrease after removing a product", async () => {
            await ProductsPage.addMultipleItems();
            await ProductsPage.btnRemoveBackpack.click();

            expect(await ProductsPage.shoppingCartLabel.getText()).toEqual("1");
            await ProductsPage.btnRemoveBikeLight.click();
        });
    });

    describe("Burger Menu Tests", () => {

        it("check Burger Menu UI elements", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            const bmItemsText = await ProductsPage.burgerMenuItemsText()

            expect(bmItemsText).toContain(BurgerMenu.allItems.toUpperCase());
            expect(bmItemsText).toContain(BurgerMenu.about.toUpperCase());
            expect(bmItemsText).toContain(BurgerMenu.logout.toUpperCase());
            expect(bmItemsText).toContain(BurgerMenu.resetAppState.toUpperCase());

            await ProductsPage.btnLogout.click();
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

    xdescribe('Filter functionality Tests', () => {

        beforeEach(async function () {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
        });

        afterEach(async function () {
            await ProductsPage.logout();
        });

        it("should display all the 6 products prices sorted in ascending order", async () => {
            //#TODO: sa introduc metoda de a ordona in pagina si a lua valorile si sa corectez diferite nume de variabile
            let expectedProductPrices = [];
            let productsPrices = [];

            const productPrice = await ProductsPage.allItemsPrices;
            for (let i = 0; i < productPrice.length; i++) {
                productsPrices.push(await productPrice[i].getText());
            }

            let sortedProductsPrices = [];
            for (let i = 0; i < productsPrices.length; i++) {
                sortedProductsPrices.push(Number(productsPrices[i].replace("$", "")));
                // console.log("type of: ", typeof Number(productsPrices[i].replace('$','')))
            }
            sortedProductsPrices.sort((a, b) => a - b);
            console.log("sorted prices: ", sortedProductsPrices);

            // let dictValues = Object.values(ProductPrices)
            // // expectedProductPrices.push(price)
            // console.log('expected prices: ', dictValues)

            // let dictValues = Object.values(ProductPrices)
            // // expectedProductPrices.push(price)
            // console.log('expected prices: ', dictValues)

            // let dictValues = Object.values(ProductPrices)
            // // expectedProductPrices.push(price)
            // console.log('expected prices: ', dictValues)

            // let dictValues = Object.values(ProductPrices)
            // // expectedProductPrices.push(price)
            // console.log('expected prices: ', dictValues)
        });
    })

    describe('Footer Tests', () => {

        it("check Footer UI elements", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);

            expect(await ProductsPage.twitterIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.facebookIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.linkedInIcon.isDisplayed()).toBe(true);
            expect(await ProductsPage.copyright.isDisplayed()).toBe(true);
            expect(await ProductsPage.copyright.getText()).toContain("© 2022 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
            expect(await ProductsPage.robotFooter.isDisplayed()).toBe(true);
            expect(await ProductsPage.robotFooter.getAttribute('src')).toEqual(ImageSource.footerRobot);

            await ProductsPage.logout();
        });

        it("the 'Twitter' icon should redirect to the 'https://twitter.com/saucelabs' url", async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.twitterIcon.waitForClickable()
            await ProductsPage.twitterIcon.click()
            await browser.switchWindow("https://twitter.com/saucelabs")

            expect(await browser.getUrl()).toEqual("https://twitter.com/saucelabs");
            await browser.closeWindow()
            await browser.switchWindow('Swag Labs')
        })

        it("the 'Facebook' icon should redirect to the 'https://www.facebook.com/saucelabs' url",
            async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.facebookIcon.waitForClickable()
            await ProductsPage.facebookIcon.click()
            await browser.switchWindow("https://www.facebook.com/saucelabs")

            expect(await browser.getUrl()).toEqual("https://www.facebook.com/saucelabs");
            await browser.closeWindow()
            await browser.switchWindow('Swag Labs')
        })


        it("the 'LinkedIn' icon should redirect to the 'https://www.linkedin.com/company/sauce-labs/' url",
            async () => {
            await LoginPage.open();
            await LoginPage.login(CREDENTIALS.standard, CREDENTIALS.password);
            await ProductsPage.linkedInIcon.waitForClickable()
            await ProductsPage.linkedInIcon.click()
            await browser.switchWindow("https://www.linkedin.com/company/sauce-labs/")


            expect(await browser.getUrl()).toEqual("https://www.linkedin.com/company/sauce-labs/");
            await browser.closeWindow()
            await browser.switchWindow('Swag Labs')
        })
    })
})
