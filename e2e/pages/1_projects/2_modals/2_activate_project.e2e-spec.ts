import {Page} from "../../../app.po";
import {browser, by, element, ElementFinder} from "protractor";
import {describe} from "selenium-webdriver/testing";
import {ElementHandleEventFn} from "@angular/core/src/view";
import {promise, WebElement} from "selenium-webdriver";

describe('[1][2][1] Activate Project', () => {
  let page: Page;
  let first_active: promise.Promise<string>;
  let next_active: ElementFinder;
  let first_in_active: ElementFinder;
  let next_in_active: promise.Promise<string>;
  beforeAll(() => {
    let _page = new Page();
    _page.createProject('Inactive Project');
    browser.sleep(500);
  });
  beforeEach(() => {
    page = new Page();
    page.navigateToMenuPoint(page.getLocal('PAGE.PROJECTS.TITLE'));
    browser.sleep(500);
  });
  it('[1] when i select the other project and push "activate" it should activate the other', () => {
    let elements = element.all(by.className('project'));
    first_active = element(by.className('active-project')).getAttribute('id');
    first_in_active = elements.last();
    next_in_active = elements.first().getAttribute('id');
    browser.sleep(500);
    first_in_active.click();
    browser.sleep(500);
    element(by.className('activate_project')).click();
    browser.sleep(1000);
    next_active = element(by.className('active-project'));
    browser.sleep(1000);
    expect(first_active).toBe(next_in_active);
    browser.sleep(1000);
    expect(first_in_active.getAttribute('id')).toBe(next_active.getAttribute('id'));
    browser.sleep(1000);
    next_active.click();
    browser.sleep(500);
    element(by.className('delete_project')).click();
    browser.sleep(1000);
  });
});


