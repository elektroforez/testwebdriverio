import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe ('Sorting', async () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login("standard_user", "secret_sauce");
    });
    it('Price (high to low)', async () => {
        await inventoryPage.pageHeader.selectFilter('hilo');
        
        expect(await inventoryPage.isSorted((a, b) => b - a)).toBe(true);
    });
    it('Price (low to high)', async () => {
        await inventoryPage.pageHeader.selectFilter('lohi');

        expect(await inventoryPage.isSorted((a, b) => a - b)).toBe(true);
    });
    it('Name A-Z', async () => {
        await inventoryPage.pageHeader.selectFilter('az');

        expect(await inventoryPage.isSorted((a, b) => a.localeCompare(b))).toBe(true);
    });
    it('Name A-Z', async () => {
        await inventoryPage.pageHeader.selectFilter('za');

        expect(await inventoryPage.isSorted((a, b) => b.localeCompare(a))).toBe(true);
    });
})