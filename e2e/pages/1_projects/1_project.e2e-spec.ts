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
      expect(element(by.id('no_projects')).getText()).toContain(page.getLocal('PAGE.PROJECTS.NO_PROJECT'));
  });

  it('[2] when project is created, delete it', () => {
    page.createProject();
    browser.sleep(500);
    element(by.css('#project_0  .project_menu')).click();
    browser.sleep(500);
    element(by.className('delete_project')).click();
    browser.sleep(500);
    expect(element(by.id('no_projects')).getText()).toContain(page.getLocal('PAGE.PROJECTS.NO_PROJECT'));
  });

});


