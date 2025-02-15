import { $, browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Footer', async () => {
    before(async () => {
            await LoginPage.open();
            await LoginPage.login("standard_user", "secret_sauce");
        });
    it('Footer links', async () => {
        const twitter = await $('[data-test="social-twitter"]');
        const facebook = await $('[data-test="social-facebook"]');
        const linkedin = await $('[data-test="social-linkedin"]');
        const links =  [twitter, facebook, linkedin];
        const urls = ['https://x.com/saucelabs',
                    'https://www.facebook.com/saucelabs',
                    'https://www.linkedin.com/company/sauce-labs/']
        const oldTabs = await browser.getWindowHandles();

        for (let i = 0; i < links.length; i++) {
            await links[i].waitForClickable();
            await links[i].click();

            await browser.pause(1000);

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