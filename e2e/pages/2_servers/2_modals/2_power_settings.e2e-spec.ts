import {Page} from "../../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('[2][2][2] Power Settings', () => {
  let page: Page;
  beforeAll(() => {
    page = new Page();
    page.createProject();
    browser.sleep(100);
    page.createServer();
    browser.sleep(500);
  });
  beforeEach(() => {
    page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
    browser.sleep(500);
    element(by.css('[data-server*="E2E-Test-Server"]')).click();
    browser.sleep(2000);
    element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS').toUpperCase())).click();
    browser.sleep(2000);
    element(by.id('server_actions')).click();
    browser.sleep(500);
    element(by.id('power_settings')).click();
    browser.sleep(500);
  });

  it("[1] power off", () => {
    element(by.id('power_off')).click();
    browser.sleep(1000);
    page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
    browser.sleep(500);
    element(by.css('[data-server*="E2E-Test-Server"]')).click();
    browser.sleep(2000);
    element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS').toUpperCase())).click();
    browser.sleep(2000);
    element(by.id('server_actions')).click();
    browser.sleep(500);
    element(by.id('power_settings')).click();
    browser.sleep(500);
    expect(element(by.id('power_on')).isDisplayed()).toBeTruthy();
    element(by.id('power_on')).click();
    browser.sleep(1000 * 20).then(() => {
      //consolePage.debug('Give the Server some time to come up');
    });
  });
  /**
   * This test could fail, because of timing problems...
   */
  it("[2] shutdown", () => {
    browser.sleep(1000 * 30).then(() => {
      browser.sleep(500);
      element(by.id('shutdown')).click();
      browser.sleep(500);
      browser.sleep(1000 * 90).then(() => {
        //consolePage.debug('Give the Server some time to shutdown');
        page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
        browser.sleep(500);
        element(by.css('[data-server*="E2E-Test-Server"]')).click();
        browser.sleep(2000);
        element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS').toUpperCase())).click();
        browser.sleep(2000);
        element(by.id('server_actions')).click();
        browser.sleep(500);
        element(by.id('power_settings')).click();
        browser.sleep(500);
        expect(element(by.id('power_on')).isDisplayed()).toBeTruthy();
        browser.sleep(500);
        element(by.id('power_on')).click();
        browser.sleep(1000 * 10).then(() => {
          //consolePage.debug('Give the Server some time to come up');
        });
      });
    });
  });
  it("[3] reset", () => {
    element(by.id('reset')).click();
    browser.sleep(1000 * 30).then(() => {
      //consolePage.debug('Give the Server some time to reset');

      page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
      browser.sleep(500);
      element(by.css('[data-Server*="E2E-Test-Server"]')).click();
      browser.sleep(2000);
      element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS').toUpperCase())).click();
      browser.sleep(2000);
      element(by.id('server_actions')).click();
      browser.sleep(500);
      element(by.id('power_settings')).click();
      browser.sleep(500);
      expect(element(by.id('power_off')).isDisplayed()).toBeTruthy();
    });
  });

  afterAll(() => {
    page.deleteServer();
  });
});


