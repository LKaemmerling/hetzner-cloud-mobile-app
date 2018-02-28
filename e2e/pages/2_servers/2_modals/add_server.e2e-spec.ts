import {Page} from "../../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('[2][2] Create Server', () => {
  let page: Page;
  beforeAll(() => {
    page = new Page();
    page.createProject();
    browser.sleep(100);
  });
  beforeEach(() => {
    page.navigateToMenuPoint('Meine Server');
    browser.sleep(500);
  });


  it('[1] when i click the button it should open the modal then i should test the form and then i create the server', () => {
    element(by.className('fab')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-header[1]/ion-toolbar[1]/div[2]/ion-title[1]/div[1]')).getText()).toContain('Server hinzufügen');
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-content[1]/div[2]/p[1]')).getText()).toContain('Bitte geben Sie einen Typen an.');
    browser.sleep(500);
    element(by.id('select_type')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-0-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-content[1]/div[2]/p[1]')).getText()).toContain('Bitte geben Sie einen Standort an.');
    element(by.id('location')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-1-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-content[1]/div[2]/p[1]')).getText()).toContain('Bitte geben Sie ein Image an.');
    element(by.id('image')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-2-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.id('ssh_keys')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-3-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    browser.sleep(500);
    expect(element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addServer[1]/ion-content[1]/div[2]/p[1]')).getText()).toContain('Bitte geben Sie einen Namen an der länger als drei Zeichen ist.');
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addserver[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('E2E-Test-Server');
    browser.sleep(500);
    element(by.buttonText('Kostenpflichtig bestellen')).click();
    //console.debug('Sorry the Server Creation could take up to 15 seconds');
    browser.sleep(1000 * 15).then(() => {
      expect(element(by.partialButtonText('E2E-Test-Server')).getText()).toContain('E2E-Test-Server');
      //console.debug('wait 15 seconds again so the server could startup');
      browser.sleep(1000 * 15).then(() => {
        //console.debug('done');
      });
    });
  });

  it("[2] deletes server", () => {
    element(by.partialButtonText('E2E-Test-Server')).click();
    browser.sleep(500);
    element(by.id('server_actions')).click();
    browser.sleep(500);
    element(by.id('delete_server')).click();
    browser.sleep(500);
    browser.switchTo().alert().accept();
    //console.log('wait 5 seconds');
    browser.sleep(1000 * 5).then(() => {
      //console.log('done');
    });
  });
});

