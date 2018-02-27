import {Page} from "../../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('Create Project', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
    page.navigateTo("/");
    browser.sleep(100);
    page.navigateToMenuPoint('Meine Projekte');
  });
  it('when i click the button it should open the modal and if you submit it there should be the error', () => {
    element(by.className('fab')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-header[1]/ion-toolbar[1]/div[2]/ion-title[1]/div[1]')).getText()).toEqual('Projekt hinzufügen');
    element(by.buttonText('Speichern')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/p[1]')).getText()).toEqual('Bitte geben Sie eine Projektbezeichnung ein.');
  });
  it('when i click the button it should open the modal and then i enter the correct credentials and the login-only menu entries should be there', () => {
    element(by.className('fab')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('Hetzner Cloud App E2E');
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[2]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(browser.params.global.api_key);
    browser.sleep(500);
    element(by.buttonText('Speichern')).click();
    browser.sleep(1000);
    expect(element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-label[1]')).getText()).toEqual('Hetzner Cloud App E2E');
    browser.sleep(500);
    page.navigateTo('/');
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-home[1]/ion-header[1]/ion-navbar[1]/button[2]')).click();
    browser.sleep(500);
    expect(element(by.buttonText('Meine Server')).isDisplayed()).toEqual(true);
  });

  it('when i click the button is should open the modal and then i enter the wrong credentials', () => {
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[1]/ion-fab[1]/button[1]/ion-icon[1]')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('Hetzner Cloud App E2E WRONG');
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[2]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(browser.params.global.api_key + 'WRONG');
    browser.sleep(500);
    element(by.buttonText('Speichern')).click();
    browser.sleep(1000);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/p[1]')).getText()).toEqual('Leider ist der eingegebene API-Token ungültig.');
  });

});


