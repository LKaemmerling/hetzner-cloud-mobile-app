import { browser, by, element } from 'protractor';
import { Page } from '../../app.po';

describe('[3][1] Images List', () => {
    let page: Page;

    beforeAll(() => {
        page = new Page();
        page.createProject();
        browser.sleep(500);
        page.navigateToMenuPoint(page.getLocal('PAGE.IMAGES.TITLE'));
        browser.sleep(500);
    });

    it('[1] first of all it should see three segment buttons', () => {
        expect(element.all(by.className('segment-button')).count()).toEqual(3);
        // Snapshot
        expect(element(by.css('[data-test~="button_1"]')).isDisplayed()).toBeTruthy();
        expect(element(by.css('[data-test~="button_1"]')).getText()).toContain(
            page.getLocal('PAGE.IMAGES.TYPES.SNAPSHOT.TITLE').toUpperCase()
        );

        // Backups
        expect(element(by.css('[data-test~="button_2"]')).isDisplayed()).toBeTruthy();
        expect(element(by.css('[data-test~="button_2"]')).getText()).toContain(
            page.getLocal('PAGE.IMAGES.TYPES.BACKUP.TITLE').toUpperCase()
        );

        // Hetzner Images
        expect(element(by.css('[data-test~="button_3"]')).isDisplayed()).toBeTruthy();
        expect(element(by.css('[data-test~="button_3"]')).getText()).toContain(
            page.getLocal('PAGE.IMAGES.TYPES.SYSTEM.TITLE').toUpperCase()
        );
    });
    it('[2] the segment snapshots should not be empty', () => {
        expect(element(by.id('no_snapshots')).isPresent()).toBeFalsy();
        expect(element.all(by.css('[data-test~="snapshot"]')).count()).toEqual(1);
    });
    it('[3] the segment backup should be empty', () => {
        element(by.css('[data-test~="button_2"]')).click();
        browser.sleep(500);
        expect(element(by.id('no_backups')).isDisplayed()).toBeTruthy();
        expect(element(by.id('no_backups')).getText()).toContain(page.getLocal('PAGE.IMAGES.TYPES.BACKUP.NO_BACKUP'));
    });
    it('[4] the segment system should not be empty', () => {
        element(by.css('[data-test~="button_3"]')).click();
        browser.sleep(500);
        expect(element(by.id('no_backups')).isPresent()).toBeFalsy();
        expect(element.all(by.css('[data-test~="system"]')).count()).toBeGreaterThan(1);
    });
});
