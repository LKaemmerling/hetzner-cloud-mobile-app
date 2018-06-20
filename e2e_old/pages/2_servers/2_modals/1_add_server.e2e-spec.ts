import { Page } from '../../../app.po';
import { browser, by, element } from 'protractor';
import { describe } from 'selenium-webdriver/testing';

describe('[2][2][1] Create Server', () => {
    let page: Page;
    beforeAll(() => {
        page = new Page();
        page.createProject();
        browser.sleep(100);
    });
    beforeEach(() => {
        page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
        browser.sleep(500);
    });

    it('[1] when i click the button it should open the modal then i should test the form and then i create the Server', () => {
        element(by.className('fab')).click();
        browser.sleep(500);
        expect(element(by.css('[data-test~="title"]')).getText()).toContain(
            page.getLocal('PAGE.SERVERS.MODAL.ADD.TITLE')
        );
        element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
        browser.sleep(500);
        expect(element(by.id('error_box')).getText()).toContain(
            page.getLocal('PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_TYPE')
        );
        browser.sleep(500);
        element(by.css('[data-test-type~="cx11"]')).click();
        browser.sleep(500);
        element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
        browser.sleep(500);
        expect(element(by.id('error_box')).getText()).toContain(
            page.getLocal('PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_LOCATION')
        );
        element(by.css('[data-test-datacenter~="Falkenstein_dc8"]')).click();
        browser.sleep(500);
        element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
        browser.sleep(500);
        expect(element(by.id('error_box')).getText()).toContain(
            page.getLocal('PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_IMAGE')
        );
        element(by.css('[data-test-image~="ubuntu_16.04"]')).click();
        browser.sleep(500);
        element(by.css('.ssh_key:first-child')).click();
        browser.sleep(500);
        element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
        browser.sleep(500);
        expect(element(by.id('error_box')).getText()).toContain(
            page.getLocal('PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_NAME')
        );
        element(by.css('#name input')).sendKeys('E2E-Test-Server');
        browser.sleep(500);
        page.screenshot('add_server');
        element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
        //consolePage.debug('Sorry the Server Creation could take up to 15 seconds');
        browser.sleep(1000 * 15).then(() => {
            page.screenshot('servers_list');
            expect(element(by.css('#server_0 h2')).getText()).toContain('E2E-Test-Server');
            element(by.css('#server_0  .server_menu')).click();
            browser.sleep(2000);
            element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS'))).click();
            browser.sleep(500);
            page.screenshot('server_detail');
            browser.sleep(500);
            element(by.id('server_actions')).click();
            browser.sleep(500);
            page.screenshot('server_actions');
            //consolePage.debug('wait 15 seconds again so the Server could startup');
            browser.sleep(1000 * 15).then(() => {
                //consolePage.debug('done');
            });
        });
    });

    it('[2] deletes Server', () => {
        element(by.css('#server_0  .server_menu')).click();
        browser.sleep(500);
        element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS'))).click();
        browser.sleep(500);
        element(by.id('server_actions')).click();
        browser.sleep(500);
        element(by.id('delete_server')).click();
        browser.sleep(500);
        browser
            .switchTo()
            .alert()
            .accept();
        //consolePage.log('wait 5 seconds');
        browser.sleep(1000 * 5).then(() => {
            //consolePage.log('done');
        });
    });
});
