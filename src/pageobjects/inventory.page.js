import BasePage from "./base.page";

class InventoryPage extends BasePage{
    get inventoryList() { return $$('[data-test="inventory-list"]')}
    get shoppingCart() {return $('[data-test="shopping-cart-link"]')}
    get burgerMenu() {return $('button[id="react-burger-menu-btn"]')}
    get logoutMenuItem() {return $('[data-test="logout-sidebar-link"]')}
    get cartBadge() {return $('[data-test="shopping-cart-badge"]')}
    get filterDropdown() {return $('[data-test="product-sort-container"]')}


    constructor() {
        super('Inventory Page', '/inventory.html'); 
    }

    async open(){
        await super.open(this.pageUrl);
    }

    async logout(){
        await this.burgerMenu.click();
                
        await this.logoutMenuItem.click();
    }

    async isInventoryDisplayed(){
        return (await this.inventoryList.length) > 0;
    }

    async isCartDisplayed(){
        return await (await this.shoppingCart).isDisplayed();
    }

    async addFirstProductToCart() {
        await (await this.inventoryList[0].$('button')).click();
    }

    async selectFilter(option){
        await this.filterDropdown.click();
        await this.filterDropdown.$('option[value='+ option +']');
    }

    async isSorted(comparator) {
        const values = [];
        for (const item of this.inventoryList) {
            const priceText = await item.$('[data-test="inventory-item-price"]').getText();
            values.push(parseFloat(priceText.replace('$', '').trim()));
        }
        const sortedValues = [...values].sort(comparator);
        return JSON.stringify(values) === JSON.stringify(sortedValues);
    }
    
}

export default new InventoryPage();