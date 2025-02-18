export default class Footer{
    get twitterLink() { return $('[data-test="social-twitter"]'); }
    get facebookLink() { return $('[data-test="social-facebook"]');}
    get linkedinLink() { return $('[data-test="social-linkedin"]');}

    
    async getSocialLinks() {
        return [this.twitterLink, this.facebookLink, this.linkedinLink];
    }

    async clickSocialLink(link) {
        await link.waitForClickable();
        await link.click();
    }
}