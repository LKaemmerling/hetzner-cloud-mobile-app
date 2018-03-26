import {Page} from "../../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('[2][2][3] Upgrade Server', () => {
  let page: Page;
  beforeAll(() => {
    page = new Page();
    page.createProject();
    browser.sleep(100);
    page.createServer('E2E-Test-Server', true);
    browser.sleep(500);
    page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
    browser.sleep(500);
    element(by.css('#server_0  .server_menu')).click();
    browser.sleep(2000);
    element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS'))).click();
    browser.sleep(500);
    element(by.id('server_actions')).click();
    browser.sleep(500);
    element(by.id('power_settings')).click();
    browser.sleep(500);
    element(by.id('power_off')).click();
    browser.sleep(1000);
  });
  beforeEach(() => {
    page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
    browser.sleep(500);
    element(by.css('#server_0  .server_menu')).click();
    browser.sleep(2000);
    element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS'))).click();
    browser.sleep(500);
    element(by.id('server_actions')).click();
    browser.sleep(500);
    element(by.id('upgrade_server')).click();
    browser.sleep(500);
  });

  it("[1] upgrade", () => {
    element(by.className('item-select')).click();
    browser.sleep(1000);
    element(by.id('alert-input-0-1')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
    browser.sleep(1000 * 30).then(() => { // Wait 30 Seconds
      page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
      browser.sleep(500);
      //consolePage.debug('Give the Server some time to upgrade');
      browser.sleep(1000 * 90).then(() => { // Wait 1 1/2 Minutes
          page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
          browser.sleep(500);
          element(by.css('#server_0  .server_menu')).click();
          browser.sleep(500);
          element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS'))).click();
          browser.sleep(500);
          expect(element(by.id('server_type_memory')).getText()).toContain('4096 MB');
        }
      );
    });
  });
  afterAll(() => {
    page.deleteServer('E2E-Test-Server');
  });
});


