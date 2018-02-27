import {Page} from './app.po';
import {by, element} from "protractor";

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
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
      expect(element(by.buttonText('Meine Projekte')).getCssValue('display')).toEqual('flex');
      expect(element(by.buttonText('Hetzner Status')).getCssValue('display')).toEqual('flex');
      expect(element(by.buttonText('Einstellungen')).getCssValue('display')).toEqual('flex');

    });
  });
});
