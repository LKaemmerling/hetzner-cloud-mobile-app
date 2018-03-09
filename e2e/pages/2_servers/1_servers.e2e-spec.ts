import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";
import {Page} from "../../app.po";

describe('[2][1] Servers List', () => {
  let page: Page;


  beforeEach(() => {
    page = new Page();
    page.createProject();
    browser.sleep(500);
    page.navigateToMenuPoint(page.getLocal('PAGE.SERVERS.TITLE'));
    browser.sleep(500);
  });

  it('[1] first of all it should not have any servers', () => {
    expect(element(by.id('no_servers')).getText()).toContain(page.getLocal('PAGE.SERVERS.NO_SERVERS'));
  })
});
