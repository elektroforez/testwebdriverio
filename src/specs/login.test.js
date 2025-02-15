import { $, browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';


describe('Login', () => {
    before (async () => {
        browser.addCommand('login', async (username, password) => {
            await LoginPage.open();
            await LoginPage.login(username, password);
        })
    });
    it ('Login with invalid password', async () => {
        await browser.login("standard_user", "123");
        const errorMessage = await LoginPage.isErrorMessageDisplayed();

        expect(errorMessage).toBe(true);
    });
    it ('Login with invalid login', async () => {
        await browser.login("123", "secret_sauce");
        const errorMessage = await LoginPage.isErrorMessageDisplayed();

        expect(errorMessage).toBe(true);
    });
    it ('Valid Login', async () => {
        await browser.login("standard_user", "secret_sauce");

        const cartDisplayed = await InventoryPage.isCartDisplayed();
        const inventoryDisplayed = await InventoryPage.isInventoryDisplayed();

        expect(cartDisplayed).toBe(true);
        expect(inventoryDisplayed).toBe(true);
    });
    it ('Logout', async () => {
        await browser.login("standard_user", "secret_sauce");
        await InventoryPage.logout();
        
        expect(await LoginPage.usernameBox.getValue()).toBe('');
        expect(await LoginPage.passwordBox.getValue()).toBe('');
    })
});