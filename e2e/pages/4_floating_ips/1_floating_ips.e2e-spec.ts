import { browser, by, element } from 'protractor';
import { Page } from '../../app.po';

describe('[4][1] Floating IP List', () => {
    let page: Page;

    beforeAll(() => {
        page = new Page();
        page.createProject();
        browser.sleep(500);
        page.navigateToMenuPoint(page.getLocal('PAGE.FLOATING_IPS.TITLE'));
        browser.sleep(500);
    });

    it('[1] first of all there should not be any floating ips', () => {
        expect(element(by.id('no_floating_ips')).isDisplayed()).toBeTruthy();
        expect(element(by.id('no_floating_ips')).getText()).toContain(
            page.getLocal('PAGE.FLOATING_IPS.NO_FLOATING_IPS')
        );
    });
    it('[2] there should be a button to add floating ips', () => {
        expect(element(by.id('add_floating_ip')).isDisplayed()).toBeTruthy();
    });
});
