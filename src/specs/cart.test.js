import { $, browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe ('Cart', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login("standard_user", "secret_sauce");
    });
    it ('Saving the cart after logout', async () => {
        
        await InventoryPage.addFirstProductToCart();

        expect(await InventoryPage.cartBadge.getText()).toBe('1');

        await InventoryPage.logout();
        await LoginPage.login("standard_user", "secret_sauce");

        expect(await InventoryPage.cartBadge.getText()).toBe('1');

    });
});