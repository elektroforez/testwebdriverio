import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe ('Cart', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login("standard_user", "secret_sauce");
    });
    it ('Saving the cart after logout', async () => {
        
        await inventoryPage.addFirstProductToCart();

        expect(await inventoryPage.pageHeader.cartBadge.getText()).toBe('1');

        await inventoryPage.logout();
        await loginPage.login("standard_user", "secret_sauce");

        expect(await inventoryPage.pageHeader.cartBadge.getText()).toBe('1');

    });
});