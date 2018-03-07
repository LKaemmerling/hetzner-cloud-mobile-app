import {Page} from "../../app.po";
import {browser, by, element} from "protractor";
import {describe} from "selenium-webdriver/testing";

describe('[1][1] Projects List', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
    page.navigateToMenuPoint(page.getLocal('PAGE.PROJECTS.TITLE'));
  });
  it('[1] when i click the menu and "meine Projekte" i should see message that there are no projects', () => {
      expect(element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/p[1]')).getText()).toContain(page.getLocal('PAGE.PROJECTS.NO_PROJECT'));
  });

  it('[2] when project is created, delete it', () => {
    page.createProject();
    browser.sleep(500);
    element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-label[1]/div[1]/h2[1]')).click();
    browser.sleep(500);
    element(by.className('delete_project')).click();
    browser.sleep(500);
    expect(element(by.xpath('//*[@id="nav"]/page-projects[1]/ion-content[1]/div[2]/ion-card[1]/ion-list[1]/p[1]')).getText()).toContain(page.getLocal('PAGE.PROJECTS.NO_PROJECT'));
  });

});


