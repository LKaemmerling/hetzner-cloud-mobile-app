import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";
import {Page} from "../../app.po";

describe('Servers List', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
    page.navigateTo('/');
    page.createProject();
    page.navigateToMenuPoint('Meine Server');
    browser.sleep(500);
  });

  it('first of all it should have any servers', () => {
    expect(element(by.xpath('//*[@id="nav"]/page-servers[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/p[1]')).getText()).toEqual('Oh! Es sieht so aus als wäre hier noch kein Server erstellt worden.');
  })
});
