import {Page} from "../../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";
import {skip} from "rxjs/operator/skip";

describe('[2][2][3] Upgrade Server', () => {
  let page: Page;
  beforeAll(() => {
    page = new Page();
    page.createProject();
    browser.sleep(100);
    page.createServer('E2E-Test-Server', true);
    browser.sleep(500);
    page.navigateToMenuPoint('Meine Server');
    browser.sleep(500);
    element(by.partialButtonText('E2E-Test-Server')).click();
    browser.sleep(500);
    element(by.id('server_actions')).click();
    browser.sleep(500);
    element(by.id('power_settings')).click();
    browser.sleep(500);
    element(by.id('power_off')).click();
    browser.sleep(1000);
  });
  beforeEach(() => {
    page.navigateToMenuPoint('Meine Server');
    browser.sleep(500);
    element(by.partialButtonText('E2E-Test-Server')).click();
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
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    browser.sleep(1000 * 10).then(() => {
      page.navigateToMenuPoint('Meine Server');
      browser.sleep(500);
      var spinn = true;
      //console.debug('Give the Server some time to upgrade');
      browser.sleep(1000 * 60).then(() => {
          page.navigateToMenuPoint('Meine Server');
          browser.sleep(500);
          element(by.partialButtonText('E2E-Test-Server')).click();
          expect(element(by.id('server_type_memory')).getText()).toContain('4096 MB');
        }
      );
    });


  });
  afterAll(() => {
    page.deleteServer('E2E-Test-Server');
  });
});


