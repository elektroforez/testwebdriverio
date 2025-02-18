import BasePage from "./base.page";

class CheckoutComplete extends BasePage {
    get header() { return $('[data-test="complete-header"]');}

    constructor (){
        super('Checkout complete', '/checkout-complete.html');
    }

    async getHeaderText(){
        return await this.header.getText();
    }

    async open(){
        await super.open(this.pageUrl);
    }
}

export default new CheckoutComplete();