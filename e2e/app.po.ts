import {browser, by, element} from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }


  getTitle() {
    return browser.getTitle();
  }

  createProject(name: string = "Hetzner Cloud App E2E") {
    this.navigateToMenuPoint('Meine Projekte');
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[1]/ion-fab[1]/button[1]/ion-icon[1]')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(name);
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[2]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(browser.params.global.api_key);
    browser.sleep(500);
    element(by.buttonText('Speichern')).click();
    browser.sleep(1000);
  }

  deleteProject() {
    this.navigateToMenuPoint('Meine Projekte');
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-label[1]/div[1]/h2[1]')).click();
    browser.sleep(500);
    element(by.buttonText('Löschen')).click();
    browser.sleep(500);
  }

  navigateToMenuPoint(entry) {
    element(by.className('bar-button-menutoggle')).click();
    browser.sleep(500);
    element(by.buttonText(entry)).click();
    browser.sleep(500);
  }

}
