import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";
import {Page} from "../../app.po";

describe('Servers List', () => {
  let page: Page;

  beforeAll(() => {
    page = new Page();
    page.navigateTo('/');
    page.createProject();
    browser.sleep(100);
  });
  afterAll(() => {
    page.navigateTo('/');
    page.deleteProject();
  });
  beforeEach(() => {
    page.navigateTo('/');
    browser.sleep(100);
    page.navigateToMenuPoint('Meine Server');
  });

  it('first of all it should not have any servers', () => {
    expect(element(by.xpath('//*[@id="nav"]/page-servers[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/p[1]')).getText()).toEqual('Oh! Es sieht so aus als wäre hier noch kein Server erstellt worden.');
  })
});
