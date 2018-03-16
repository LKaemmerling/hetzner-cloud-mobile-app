import {Page} from "../../../app.po";
import {browser, by, element, ElementFinder} from "protractor";
import {describe} from "selenium-webdriver/testing";
import {ElementHandleEventFn} from "@angular/core/src/view";
import {promise, WebElement} from "selenium-webdriver";

describe('[1][2][3] Edit Project', () => {
  let page: Page;
  beforeAll(() => {
    let _page = new Page();
    _page.createProject('Editable Project');
    browser.sleep(500);
  });
  beforeEach(() => {
    page = new Page();
    page.navigateToMenuPoint(page.getLocal('PAGE.PROJECTS.TITLE'));
    browser.sleep(500);
  });
  it('[1] when i edit the form it should change the name', () => {
    let menu_element = element(by.css('[data-project-menupoint*="Editable Project"]'));
    let old_id = menu_element.getAttribute('data-project-menu-id');
    menu_element.click();
    browser.sleep(4000);
    element(by.css('[data-project-menupoint-edit*="Editable Project"]')).click();
    browser.sleep(500);
    element(by.xpath('/html[1]/body[1]/ion-app[1]/ion-modal[1]/div[1]/modal-editproject[1]/ion-content[1]/div[2]/ion-list[1]/ion-item[1]/div[1]/div[1]/ion-input[1]/input[1]')).sendKeys('-EDIT');
    browser.sleep(500);
    element(by.buttonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(500);
    page.navigateToMenuPoint(page.getLocal('PAGE.PROJECTS.TITLE'));
    browser.sleep(500);
    let menu_element_new = element(by.css('[data-project-menupoint*="Editable Project-EDIT"]'));
    expect(menu_element_new.getAttribute('data-project-menu-id')).toEqual(old_id);
  });
});


