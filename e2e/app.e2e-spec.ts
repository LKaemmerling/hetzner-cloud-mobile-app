import {Page} from './app.po';
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('[0] Home Screen', () => {
  let page: Page;
  beforeAll(() => {
    browser.driver.manage().window().setSize(411, 731);
    if(browser.params.global.lang == 'en'){
      page = new Page();
      page.navigateToMenuPoint('Einstellungen');
      browser.sleep(500);
      element(by.id('language')).click();
      browser.sleep(500);
      element(by.xpath('//*[@id="alert-input-0-1"]/span[1]/div[2]')).click();
      browser.sleep(1000);
      element(by.buttonText('OK')).click();
      browser.sleep(3000);
    }
  });
  beforeEach(() => {
    page = new Page();

    page.navigateTo('/');
    browser.sleep(500);
  });

  it('[1] should have a title saying Hetzner Cloud Mobile', () => {
    page.getTitle().then(title => {
      expect(title).toEqual('Hetzner Cloud Mobile');
      page.screenshot('home');
    });
  });
  it('[2] it should have a button on the start page if there are no projects', () => {
    expect(element(by.buttonText(page.getLocal('PAGE.HOME.ADD_PROJECT_BUTTON'))).isDisplayed()).toBeTruthy();
  });


  it('[3] should has the right menu structure', () => {
    element(by.xpath('//*[@id="nav"]/page-home[1]/ion-header[1]/ion-navbar[1]/button[2]')).click();
    browser.sleep(500);
    expect(element(by.buttonText(page.getLocal('PAGE.HOME.TITLE'))).isDisplayed()).toBeTruthy();
    expect(element(by.buttonText(page.getLocal('PAGE.PROJECTS.TITLE'))).isDisplayed()).toBeTruthy();
    expect(element(by.buttonText(page.getLocal('PAGE.STATUS.TITLE'))).isDisplayed()).toBeTruthy();
    expect(element(by.buttonText(page.getLocal('PAGE.SETTINGS.TITLE'))).isDisplayed()).toBeTruthy();
  });

});

