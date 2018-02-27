import {browser, by, element} from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }


  getTitle() {
    return browser.getTitle();
  }

  createProject(){
    this.navigateToMenuPoint('Meine Projekte');
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[1]/ion-fab[1]/button[1]/ion-icon[1]')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('Hetzner Cloud App E2E');
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[2]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(browser.params.global.api_key);
    browser.sleep(500);
    element(by.buttonText('Speichern')).click();
    browser.sleep(500);
    this.navigateTo('/');
    browser.sleep(500);
  }

  navigateToMenuPoint(entry){
    this.navigateTo('/');
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-home[1]/ion-header[1]/ion-navbar[1]/button[2]')).click();
    browser.sleep(500);
    element(by.buttonText(entry)).click();
    browser.sleep(500);
  }

}
