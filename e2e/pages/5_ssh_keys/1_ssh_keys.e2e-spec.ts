import { browser, by, element } from 'protractor';
import { Page } from '../../app.po';

describe('[5][1] SSH Keys List', () => {
    let page: Page;

    beforeEach(() => {
        page = new Page();
        page.createProject();
        browser.sleep(500);
        page.navigateToMenuPoint(page.getLocal('PAGE.SSH_KEYS.TITLE'));
        browser.sleep(500);
    });

    it('[1] first of all there should be one ssh-key', () => {
        expect(element.all(by.className('ssh_key')).count()).toEqual(1);
        expect(element(by.css('[data-test~="kontakt@lukas-kaemmerling.de"] h2')).getText()).toContain(
            'kontakt@lukas-kaemmerling.de'
        );
        expect(element(by.css('[data-test~="kontakt@lukas-kaemmerling.de"] p')).getText()).toContain(
            '83:6e:fe:c0:69:c2:a9:ab:c5:b7:c0:59:03:10:5f:b2'
        );
    });
});
