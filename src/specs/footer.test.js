import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Footer', async () => {
    before(async () => {
            await loginPage.open();
            await loginPage.login("standard_user", "secret_sauce");
        });
    it('Footer links', async () => {
        const links =  await inventoryPage.pageFooter.getSocialLinks();
        const urls = ['https://x.com/saucelabs',
                    'https://www.facebook.com/saucelabs',
                    'https://www.linkedin.com/company/sauce-labs/']
        const oldTabs = await browser.getWindowHandles();

        for (let i = 0; i < links.length; i++) {
            await inventoryPage.pageFooter.clickSocialLink(links[i]);

            const newTabs = await browser.getWindowHandles(); 
            const newTab = newTabs.find(tab => !oldTabs.includes(tab)); 

            if (!newTab) {
                throw new Error('No new tabs were opened');
            }      

            await browser.switchToWindow(newTab); 

            expect(await browser.getUrl()).toContain(urls[i]);

            await browser.closeWindow();
        }
    })
})