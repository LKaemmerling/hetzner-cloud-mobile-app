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
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[1]/ion-fab[1]/button[1]/ion-icon[1]')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(name);
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[2]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(browser.params.global.api_key);
    browser.sleep(500);
    element(by.buttonText('Speichern')).click();
    browser.sleep(500);
    this.navigateToMenuPoint('Meine Projekte');
    browser.sleep(500);
  }

  deleteProject() {
    this.navigateToMenuPoint('Meine Projekte');
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-label[1]/div[1]/h2[1]')).click();
    browser.sleep(500);
    element(by.className('delete_project')).click();
    browser.sleep(500);
  }

  createServer(name: string = "E2E-Test-Server", wait_on_startup: boolean = true, start_up_on_creation = true) {
    this.navigateToMenuPoint('Meine Server');
    browser.sleep(500);
    element(by.className('fab')).click();
    browser.sleep(500);
    element(by.id('select_type')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-0-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.id('select_location')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-1-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.id('select_image')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-2-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.id('select_ssh_keys')).click();
    browser.sleep(500);
    element(by.xpath('//*[@id="alert-input-3-0"]/span[1]/div[2]')).click();
    browser.sleep(500);
    element(by.buttonText('OK')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addserver[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('E2E-Test-Server');
    browser.sleep(500);
    if(!start_up_on_creation){
      element(by.id('toggle-40-0')).click();
      browser.sleep(500);
    }
    element(by.buttonText('Kostenpflichtig bestellen')).click();

    //console.debug('Sorry the Server Creation could take up to 15 seconds');
    browser.sleep(1000 * 15).then(() => {
      if (wait_on_startup) {
        //console.debug('wait 15 seconds again so the server could startup');
        browser.sleep(1000 * 15).then(() => {
          //console.debug('done');
        });
      }
    });
  }

  deleteServer(name: string = "E2E-Test-Server") {
    this.navigateToMenuPoint('Meine Server');
    browser.sleep(500);
    element(by.partialButtonText(name)).click();
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
  }

  navigateToMenuPoint(entry) {
    this.navigateTo('/');
    browser.sleep(500);
    if (element(by.className('show-menu')).isPresent()) {
      this.navigateTo('/');
      browser.sleep(500);
    }
    element(by.className('bar-button-menutoggle')).click();
    browser.sleep(500);
    element(by.buttonText(entry)).click();
    browser.sleep(500);
  }

}
