import {browser, by, element} from 'protractor';

var fs = require('fs');

export class Page {
  protected local = Object;

  getLocal(_local) {
    this.loadLocalization();
    return this.fetchFromObject(this.local,_local);
  }

  private loadLocalization() {
    this.local = require('./../src/assets/i18n/' + browser.params.global.lang + '.json');
  }

  navigateTo(destination) {
    return browser.get(destination);
  }
  private fetchFromObject(obj, prop) {

    if(typeof obj === 'undefined') {
      return false;
    }

    var _index = prop.indexOf('.')
    if(_index > -1) {
      return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return obj[prop];
  }

  getTitle() {
    return browser.getTitle();
  }

  screenshot(name: string) {
    if (("" + browser.params.global.screenshots) == 'y') {
      name = "screenshots/"+browser.params.global.lang+"/"+ name + '.png';
      // within a test:
      browser.takeScreenshot().then(function (png) {
        var stream = fs.createWriteStream(name);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
      });
    }
  }


  createProject(name: string = "Hetzner Cloud App E2E") {
    this.navigateToMenuPoint(this.getLocal('PAGE.PROJECTS.TITLE'));
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[1]/ion-fab[1]/button[1]/ion-icon[1]')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(name);
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-addproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[2]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys(browser.params.global.api_key);
    browser.sleep(500);
    element(by.buttonText(this.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(500);
    this.navigateToMenuPoint(this.getLocal('PAGE.PROJECTS.TITLE'));
    browser.sleep(500);
  }

  deleteProject() {
    this.navigateToMenuPoint(this.getLocal('PAGE.PROJECTS.TITLE'));
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-label[1]/div[1]/h2[1]')).click();
    browser.sleep(500);
    element(by.className('delete_project')).click();
    browser.sleep(500);
  }

  createServer(name: string = "E2E-Test-Server", wait_on_startup: boolean = true, start_up_on_creation = true) {
    this.navigateToMenuPoint(this.getLocal('PAGE.SERVERS.TITLE'));
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
    if (!start_up_on_creation) {
      element(by.id('toggle-40-0')).click();
      browser.sleep(500);
    }
    element(by.buttonText(this.getLocal('ACTIONS.ORDER'))).click();

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
    this.navigateToMenuPoint(this.getLocal('PAGE.SERVERS.TITLE'));
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
