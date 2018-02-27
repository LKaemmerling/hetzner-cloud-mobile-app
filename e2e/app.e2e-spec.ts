import {Page} from './app.po';
import {by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
      browser.sleep(500);
    });

    it('should have a title saying Hetzner Cloud Mobile', () => {
      page.getTitle().then(title => {
        expect(title).toEqual('Hetzner Cloud Mobile');
      });
    });
    it('it should have a button on the start page if there are no projects', () => {
      expect(element(by.buttonText('Jetzt erstes Projekt hinzufügen!')).isDisplayed()).toBe(true);
    });


    it('should has the right menu structure', () => {
      element(by.xpath('//*[@id="nav"]/page-home[1]/ion-header[1]/ion-navbar[1]/button[2]')).click();
      browser.sleep(500);
      expect(element(by.buttonText('Meine Projekte')).isDisplayed()).toEqual(true);
      expect(element(by.buttonText('Hetzner Status')).isDisplayed()).toEqual(true);
      expect(element(by.buttonText('Einstellungen')).isDisplayed()).toEqual(true);
    });

  });
  describe('Project Screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
      browser.sleep(500);
      element(by.xpath('//*[@id="nav"]/page-home[1]/ion-header[1]/ion-navbar[1]/button[2]')).click();
      browser.sleep(500);
      element(by.buttonText('Meine Projekte')).click();
      browser.sleep(500);
    });
    it('when i click the menu and "meine Projekte" is should see message', () => {
      expect(element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/p[1]')).getText()).toEqual('Oh! Es sieht so aus als wäre hier noch kein Projekt hinterlegt.');
    });
    it('when i click the button is should open the modal and if you submit it there should be the error', () => {
      element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[1]/ion-fab[1]/button[1]/ion-icon[1]')).click();
      browser.sleep(500);
      expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-header[1]/ion-toolbar[1]/div[2]/ion-title[1]/div[1]')).getText()).toEqual('Projekt hinzufügen');
      element(by.buttonText('Speichern')).click();
      browser.sleep(500);
      expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/p[1]')).getText()).toEqual('Bitte geben Sie eine Projektbezeichnung ein.');
    })
  });
});
