import { $, browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js';
import CartPage from '../pageobjects/cart.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CheckoutStepTwo from '../pageobjects/checkout2.page.js';
import CheckoutStepOne from '../pageobjects/checkout1.page.js';

describe('Checkout', async () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login("standard_user", "secret_sauce");
    });
    it('Checkout without products', async () => {
        await InventoryPage.shoppingCart.click();

        expect((await CartPage.cartList).length).toBe(0);

        //TODO: There is no error message on the page
    });
    it('Valid checkout', async () => {
        await InventoryPage.addFirstProductToCart();
        const firstItem = await InventoryPage.inventoryList[0];
        const selectedItemName = await firstItem.$('[data-test="inventory-item-name"]').getText();
        await InventoryPage.shoppingCart.click();

        const cartItems = await CartPage.cartList;
        const cartItemName = await cartItems[0].$('[data-test="inventory-item-name"]').getText();
        expect(cartItemName).toBe(selectedItemName);
        
        CartPage.clickCheckout();        
        await CheckoutStepOne.fillInfo('name', 'surname', '00000');
        CheckoutStepOne.clickContinue();

        const displayedTotal = await CheckoutStepTwo.getTotal();
        const calculatedTotal = await CheckoutStepTwo.calculateTotalPrice();
        const checkoutItems = await CheckoutStepTwo.checkoutItems;
        const checkoutItemName = await checkoutItems[0].$('[data-test="inventory-item-name"]').getText();
        
        expect(displayedTotal).toBe(calculatedTotal);
        expect(checkoutItemName).toBe(selectedItemName);

        await CheckoutStepTwo.clickFinish();

        const successMessage = await $('[data-test="complete-header"]').getText();
        expect(successMessage).toContain('Thank you for your order!');
    })
})