export default class Header {

    constructor() {
        this.headerContainerLocator = '[data-test="header-container"]';
    }

    get burgerButton() {
        return $(`${this.headerContainerLocator} button[id="react-burger-menu-btn"]`);
    }

    get burgerMenuLogOutButton() {
        return $(`${this.headerContainerLocator} [data-test="logout-sidebar-link"]`);
    }

    get shoppingCart() {
        return $(`${this.headerContainerLocator} [data-test="shopping-cart-link"]`);
    }

    get cartBadge() {
        return $(`${this.headerContainerLocator} [data-test="shopping-cart-badge"]`);
    }

    get filterDropdown() {
        return $(`${this.headerContainerLocator} [data-test="product-sort-container"]`);
    }

    async clickOnSlideMenu() {
        await this.burgerButton.click();
    }

    async clickOnLogOutInSlideMenu() {
        await this.burgerMenuLogOutButton.click();
    }

    async clickOnCartLink() {
        await this.shoppingCart.click();
    }

    async selectFilter(option){
        await this.filterDropdown.click();
        await this.filterDropdown.$('option[value='+ option +']');
    }
}