import {Page} from './app.po';
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('[0] Home Screen', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();

    page.navigateTo('/');
    browser.sleep(500);
  });

  it('[1] should have a title saying Hetzner Cloud Mobile', () => {
    page.getTitle().then(title => {
      expect(title).toEqual('Hetzner Cloud Mobile');
    });
  });
  it('[2] it should have a button on the start page if there are no projects', () => {
    expect(element(by.buttonText('Jetzt erstes Projekt hinzufügen!')).isDisplayed()).toBeTruthy();
  });


  it('[3] should has the right menu structure', () => {
    element(by.xpath('//*[@id="nav"]/page-home[1]/ion-header[1]/ion-navbar[1]/button[2]')).click();
    browser.sleep(500);
    expect(element(by.buttonText('Meine Projekte')).isDisplayed()).toBeTruthy();
    expect(element(by.buttonText('Hetzner Status')).isDisplayed()).toBeTruthy();
    expect(element(by.buttonText('Einstellungen')).isDisplayed()).toBeTruthy();
  });

});
