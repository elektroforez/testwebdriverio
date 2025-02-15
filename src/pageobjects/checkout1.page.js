import BasePage from "./base.page";

class CheckoutStepOne extends BasePage{
    get inputFirstNameField() {
        return $('[data-test="firstName"]');
    }

    get inputSecondNameField() {
        return $('[data-test="lastName"]');
    }

    get inputCodeField() {
        return $('[data-test="postalCode"]');
    }

    get continueButton() {
        return $('[data-test="continue"]');
    }
    
    constructor() {
        super('Checkout page one', '/checkout-step-one'); 
    }

    async open(){
        await super.open(this.pageUrl);
    }   

    async fillInfo(firstName, secondName, postalCode) {
        await (await this.inputFirstNameField).setValue(firstName);
        await (await this.inputSecondNameField).setValue(secondName);
        await (await this.inputCodeField).setValue(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}

export default new CheckoutStepOne();