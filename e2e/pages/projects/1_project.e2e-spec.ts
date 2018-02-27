import {Page} from "../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('Projects List', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();

    page.navigateTo('/');
    page.navigateToMenuPoint('Meine Projekte');
  });
  it('when i click the menu and "meine Projekte" i should see message that there are no projects', () => {
    expect(element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/p[1]')).getText()).toEqual('Oh! Es sieht so aus als wäre hier noch kein Projekt hinterlegt.');
  });

  it('when project is created, delete it', () => {
    page.navigateTo('/');
    browser.sleep(500);
    page.createProject();
    browser.sleep(500);
    page.navigateToMenuPoint('Meine Projekte');
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-label[1]/div[1]/h2[1]')).click();
    browser.sleep(500);
    element(by.buttonText('Löschen')).click();
    browser.sleep(500);
    expect(element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/p[1]')).getText()).toEqual('Oh! Es sieht so aus als wäre hier noch kein Projekt hinterlegt.');
  });

});


