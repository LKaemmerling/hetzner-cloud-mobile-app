import {Page} from './app.po';
import {browser, by, element} from 'protractor';
import {describe} from 'selenium-webdriver/testing';
import {click, getText, waitToBeDisplayed} from "@hetznercloud/protractor-test-helper";

describe('[0] Home Screen', () => {
  let page: Page;
  beforeAll(() => {
    browser.driver
      .manage()
      .window()
      .setSize(411, 731);
  });
  beforeEach(() => {
    page = new Page();
    page.navigateTo('/');
    browser.sleep(500);
  });

  it('[1] should have a title saying My Hetzner', () => {
    page.getTitle().then(title => {
      expect(title).toEqual('My Hetzner');
    });
  });
  it('[2] when i click at the button it should open the menu', () => {
    click('.bar-button-menutoggle');
    waitToBeDisplayed('[data-test=menu]');
    expect(element(by.css('[data-test=menu]')).isDisplayed()).toBeTruthy();
  });
  it('[3] should has the right menu structure', () => {
    click('.bar-button-menutoggle');
    waitToBeDisplayed('[data-test=menu]');
    waitToBeDisplayed('[data-test=module_cloud]');
    waitToBeDisplayed('[data-test=module_robot]');
    expect(element(by.buttonText(page.getLocal('PAGE.HOME.TITLE'))).isDisplayed()).toBeTruthy();
    expect(element(by.buttonText(page.getLocal('PAGE.PROJECTS.TITLE'))).isDisplayed()).toBeTruthy();
    expect(element(by.buttonText(page.getLocal('PAGE.STATUS.TITLE'))).isDisplayed()).toBeTruthy();
    expect(element(by.buttonText(page.getLocal('PAGE.SETTINGS.TITLE'))).isDisplayed()).toBeTruthy();
  });
});
