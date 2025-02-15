import { $, browser, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe ('Sorting', async () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login("standard_user", "secret_sauce");
    });
    it('Price (high to low)', async () => {
        await InventoryPage.selectFilter('hilo');
        
        expect(await InventoryPage.isSorted((a, b) => b - a)).toBe(true);
    });
    it('Price (low to high)', async () => {
        await InventoryPage.selectFilter('lohi');

        expect(await InventoryPage.isSorted((a, b) => a - b)).toBe(true);
    });
    it('Name A-Z', async () => {
        await InventoryPage.selectFilter('az');

        expect(await InventoryPage.isSorted((a, b) => a.localeCompare(b))).toBe(true);
    });
    it('Name A-Z', async () => {
        await InventoryPage.selectFilter('za');

        expect(await InventoryPage.isSorted((a, b) => b.localeCompare(a))).toBe(true);
    });
})