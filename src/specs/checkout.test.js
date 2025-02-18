import loginPage from '../pageobjects/login.page.js';
import cartPage from '../pageobjects/cart.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import checkoutStepTwo from '../pageobjects/checkout2.page.js';
import checkoutStepOne from '../pageobjects/checkout1.page.js';
import checkoutcomplete from '../pageobjects/checkoutcomplete.page.js';

describe('Checkout', async () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login("standard_user", "secret_sauce");
    });
    it('Checkout without products', async () => {
        await inventoryPage.pageHeader.shoppingCart.click();

        expect((await cartPage.cartList).length).toBe(0);

        //TODO: There is no error message on the page
    });
    it('Valid checkout', async () => {
        await inventoryPage.addFirstProductToCart();
        const selectedItemName = await inventoryPage.getFirstProductName();
        await inventoryPage.pageHeader.shoppingCart.click();
        const cartItemName = await cartPage.firstItemName;
        expect(cartItemName).toBe(selectedItemName);
        
        cartPage.clickCheckout();        
        await checkoutStepOne.fillInfo('name', 'surname', '00000');
        checkoutStepOne.clickContinue();

        const displayedTotal = await checkoutStepTwo.getTotal();
        const calculatedTotal = await checkoutStepTwo.calculateTotalPrice();
        const checkoutItemName = await checkoutStepTwo.firstCheckoutItemName;
        
        expect(displayedTotal).toBe(calculatedTotal);
        expect(checkoutItemName).toBe(selectedItemName);

        await checkoutStepTwo.clickFinish();

        const successMessage = await checkoutcomplete.getHeaderText();
        expect(successMessage).toContain('Thank you for your order!');
    })
})