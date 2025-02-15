import BasePage from "./base.page";

class CheckoutStepTwo extends BasePage{
    get checkoutItems() {return $$('[data-test="inventory-item"]')}
    get totalLabel() {return $('[data-test="total-label"]')}
    get finishButton() {return $('[data-test="finish"]')}

    constructor() {
        super('Checkout Page Two', '/checkout-step-two'); 
    }

    async open(){
        await super.open(this.pageUrl);
    }   

    async clickFinish(){
        await this.finishButton.click();
    }

    async getTotal() {
        const totalText = await this.totalLabel.getText();
    const totalPrice = totalText.replace("Total: $", "").trim();
    return totalPrice;
    }

    async calculateTotalPrice(){
        let totalBeforeTax = 0;
    
        for (const element of await this.checkoutItems) {
            const priceText = await element.$('[data-test="inventory-item-price"]').getText();
            const price = parseFloat(priceText.replace('$', '').trim());
            totalBeforeTax += price;
        }
    
        const totalAfterTax = (totalBeforeTax * 0.08 + totalBeforeTax).toFixed(2);
        return totalAfterTax;
    }
}

export default new CheckoutStepTwo();