import {Page} from "../../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";
import {skip} from "rxjs/operator/skip";

describe('[2][2][3] Rename Server', () => {
  let page: Page;
  beforeAll(() => {
    page = new Page();
    page.createProject();
    browser.sleep(100);
    page.createServer('E2E-Test-Server', false);
    browser.sleep(500);
  });
  beforeEach(() => {
    page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
    browser.sleep(500);
    element(by.css('#server_0  .server_menu')).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS'))).click();
    browser.sleep(2000);
    element(by.id('server_actions')).click();
    browser.sleep(500);
    element(by.id('rename_server')).click();
    browser.sleep(500);
  });

  it("[1] rename", () => {
    element(by.css('#server_name input')).sendKeys('-Renamed');
    browser.sleep(1000);
    element(by.id('save')).click();
    browser.sleep(2000);
    expect(element(by.css('#server_detail_name div')).getText()).toContain('E2E-Test-Server-Renamed');
  });
  afterAll(() => {
    page.deleteServer('E2E-Test-Server-Renamed');
  });
});


