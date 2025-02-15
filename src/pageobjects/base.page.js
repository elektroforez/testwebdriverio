export default class BasePage {
  constructor(pageTitle, pageUrl) {
    this.pageTitle = pageTitle;
    this.pageUrl = pageUrl;
  }
  
  async open(path) {
      await browser.url(path);
    }
  
    async getTitle() {
      return browser.getTitle();
    }
  }