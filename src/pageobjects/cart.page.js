import BasePage from "./base.page";

class CartPage extends BasePage{
    get cartList() {return $$('[data-test="inventory-item"]')}
    get checkoutButton() {return $('[data-test="checkout"]')}

    constructor() {
        super('Cart Page', '/cart'); 
    }

    async open(){
        await super.open(this.pageUrl);
    }   

    async clickCheckout(){
        await this.checkoutButton.click();
    }

}

export default new CartPage();