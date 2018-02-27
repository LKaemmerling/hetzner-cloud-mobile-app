import {Page} from "../../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('Create Server', () => {
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
    browser.sleep(500);
  });


  it('when i click the button it should open the modal then i should test the form and then i create the server', () => {
    element(by.className('fab')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-header[1]/ion-toolbar[1]/div[2]/ion-title[1]/div[1]')).getText()).toEqual('Server hinzufügen');
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-content[1]/div[2]/p[1]')).getText()).toEqual('Bitte geben Sie einen Typen an.');
    element(by.id('select_type')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-0-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-content[1]/div[2]/p[1]')).getText()).toEqual('Bitte geben Sie einen Standort an.');
    element(by.id('location')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-1-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-content[1]/div[2]/p[1]')).getText()).toEqual('Bitte geben Sie ein Image an.');
    element(by.id('image')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-2-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-content[1]/div[2]/p[1]')).getText()).toEqual('Bitte geben Sie einen Namen an der länger als drei Zeichen ist.');
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addserver[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('E2E-Test-Server');
    browser.sleep(500);
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    console.log('Sorry the Server Creation could take up to 10 seconds');
    browser.sleep(1000 * 10).then(() => {
      expect(element(by.xpath('//*[@id="nav"]/page-servers[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/ion-item-sliding[1]/ion-item[1]/div[1]/div[1]/ion-label[1]/div[1]/h2[1]')).getText()).toEqual('E2E-Test-Server');
      console.log('wait 11 seconds again so the server could startup');
      browser.sleep(1000 * 11).then(() => {
        console.log('done');
      });
    });
  });

  it("deletes server", () => {
    element(by.xpath('//*[@id="nav"]/page-servers[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/ion-item-sliding[1]/ion-item[1]/div[1]/div[1]/ion-label[1]/div[1]/h2[1]')).click();
    browser.sleep(500);
    element(by.id('server_actions')).click();
    browser.sleep(500);
    element(by.id('delete_server')).click();
    browser.sleep(500);
    browser.switchTo().alert().accept();
  });
});


