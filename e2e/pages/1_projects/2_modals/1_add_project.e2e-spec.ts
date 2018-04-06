import {Page} from "../../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('[1][2][1] Create Project', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
    page.navigateToMenuPoint(page.getLocal('PAGE.PROJECTS.TITLE'));
    browser.sleep(500);
  });
  it('[1] when i click the button it should open the modal and if you submit it there should be the error', () => {
    element(by.className('fab')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-header[1]/ion-toolbar[1]/div[2]/ion-title[1]/div[1]')).getText()).toContain(page.getLocal('PAGE.PROJECTS.MODAL.ADD.TITLE'));
    element(by.buttonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/p[1]')).getText()).toContain(page.getLocal('PAGE.PROJECTS.MODAL.ADD.ERRORS.REQUIRED_NAME'));
  });
  it('[2] when i click the button it should open the modal and then i enter the correct credentials and the login-only menu entries should be there', () => {
    element(by.className('fab')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('Hetzner Cloud App E2E');
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[2]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(browser.params.global.api_key);
    browser.sleep(1000);
    element(by.buttonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(1000);
    expect(element(by.css('#project_0 h2')).getText()).toContain('Hetzner Cloud App E2E');
    page.screenshot('projects');
    browser.sleep(500);
    page.navigateTo('/');
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-home[1]/ion-header[1]/ion-navbar[1]/button[2]')).click();
    browser.sleep(500);
    expect(element(by.buttonText(page.getLocal('PAGE.SERVERS.TITLE'))).isDisplayed()).toBeTruthy();
  });

  it('[3] when i click the button is should open the modal and then i enter the wrong credentials', () => {
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[1]/ion-fab[1]/button[1]/ion-icon[1]')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('Hetzner Cloud App E2E WRONG');
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[2]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(browser.params.global.api_key + 'WRONG');
    browser.sleep(500);
    element(by.buttonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(1000);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/p[1]')).getText()).toContain(page.getLocal('PAGE.PROJECTS.MODAL.ADD.ERRORS.INVALID_KEY'));
  });

  it('[4] a project name must be unique', () => {
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[1]/ion-fab[1]/button[1]/ion-icon[1]')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('Hetzner Cloud App E2E');
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[2]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(browser.params.global.api_key);
    browser.sleep(500);
    element(by.buttonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(1000);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/p[1]')).getText()).toContain(page.getLocal('PAGE.PROJECTS.MODAL.ADD.ERRORS.NAME_ALREADY_USED'));
  });
});


