import BasePage from "./base.page.js";
import footer from "./components/footer.js";
import Header from "./components/header.js";

class InventoryPage extends BasePage{
    get inventoryList() { return $$('[data-test="inventory-list"]')}
    get shoppingCart() {return $('[data-test="shopping-cart-link"]')}
    pageHeader = new Header();
    pageFooter = new footer();


    constructor() {
        super('Inventory Page', '/inventory.html'); 
    }

    async open(){
        await super.open(this.pageUrl);
    }

    async logout(){
        await this.pageHeader.clickOnSlideMenu();
        await this.pageHeader.clickOnLogOutInSlideMenu();
    }

    async isInventoryDisplayed(){
        return (await this.inventoryList.length) > 0;
    }

    async addFirstProductToCart() {
        await (await this.inventoryList[0].$('button')).click();
    }

    async getFirstProductName() {
        const firstItem = this.inventoryList[0];
        return await firstItem.$('[data-test="inventory-item-name"]').getText();
    }

    async isSorted(comparator) {
        const values = [];
        const list = await this.inventoryList;
        for (const item of list) {
            const priceText = await item.$('[data-test="inventory-item-price"]').getText();
            values.push(parseFloat(priceText.replace('$', '').trim()));
        }
        const sortedValues = [...values].sort(comparator);
        return JSON.stringify(values) === JSON.stringify(sortedValues);
    }
    
}

export default new InventoryPage();