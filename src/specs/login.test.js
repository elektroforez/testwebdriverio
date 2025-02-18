import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';


describe('Login', () => {
    before (async () => {
        browser.addCommand('login', async (username, password) => {
            await loginPage.open();
            await loginPage.login(username, password);
        })
    });
    it ('Login with invalid password', async () => {
        await browser.login("standard_user", "123");

        expect(loginPage.errorMessage).toBeDisplayed();
    });
    it ('Login with invalid login', async () => {
        await browser.login("123", "secret_sauce");

        expect(loginPage.errorMessage).toBeDisplayed();
    });
    it ('Valid Login', async () => {
        await browser.login("standard_user", "secret_sauce");

        const inventoryDisplayed = await inventoryPage.isInventoryDisplayed();

        expect(inventoryPage.pageHeader.shoppingCart).toBeDisplayed();
        expect(inventoryDisplayed).toBe(true);
    });
    it ('Logout', async () => {
        await browser.login("standard_user", "secret_sauce");
        await inventoryPage.logout();
        
        expect(await loginPage.usernameBox.getValue()).toBe('');
        expect(await loginPage.passwordBox.getValue()).toBe('');
    })
});