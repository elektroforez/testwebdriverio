import BasePage from "./base.page";

class LoginPage extends BasePage{
    get usernameBox() {return $('[data-test="username"]')}
    get passwordBox() {return $('[data-test="password"]')}
    get submitButton() { return $('[data-test="login-button"]'); }
    get errorMessage() {return $('[data-test="error"]')}

    constructor() {
        super('Login Page', '/'); 
    }

    async login(username, password){
        await this.usernameBox.setValue(username);
        await this.passwordBox.setValue(password);
        await this.submitButton.click();
    }

    async open(){
        await super.open(this.pageUrl);
    }
}

export default new LoginPage();