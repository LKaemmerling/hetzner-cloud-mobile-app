import {browser, by, element, protractor} from "protractor";
import {Page} from "../../../app.po";

describe('[3][2] Images Actions', () => {
  let page: Page;

  beforeAll(() => {
    page = new Page();
    page.createProject();
    browser.sleep(500);
  });
  beforeEach(() => {
    page.navigateToMenuPoint(page.getLocal('PAGE.IMAGES.TITLE'));
    browser.sleep(500);
  });

  it('[1] click on snapshot should display the actions', () => {
    element(by.css('[data-test-snapshot~="test-snapshot"]')).click();
    browser.sleep(500);
    expect(element(by.css('[aria-labelledby~="acst-hdr-0"]')).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.DELETE'))).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).isDisplayed()).toBeTruthy();
    //expect(element(by.partialButtonText(page.getLocal('ACTIONS.CREATE_SERVER'))).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.CANCEL'))).isDisplayed()).toBeTruthy();
  });
  it('[2] click on snapshot and click cancel - nothing should happend', () => {
    element(by.css('[data-test-snapshot~="test-snapshot"]')).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.CANCEL'))).click();
    browser.sleep(500);
    expect(element(by.css('[aria-labelledby~="acst-hdr-0"]')).isPresent()).toBeFalsy();
    expect(element(by.css('[data-test-snapshot~="test-snapshot"] h2')).getText()).toContain('test-snapshot');
  });
  it('[3] click on snapshot and click edit - type a new name', () => {
    element(by.css('[data-test-snapshot~="test-snapshot"]')).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).click();
    browser.sleep(500);
    expect(element(by.css('modal-editimage')).isPresent()).toBeTruthy();
    browser.sleep(500);
    element(by.css('#description input')).sendKeys('-R');
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(1000);
    expect(element(by.css('[data-test-snapshot~="test-snapshot-R"] h2')).getText()).toContain('test-snapshot-R');
    element(by.css('[data-test-snapshot~="test-snapshot-R"]')).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).click();
    browser.sleep(500);
    element(by.css('#description input')).sendKeys(protractor.Key.BACK_SPACE);
    element(by.css('#description input')).sendKeys(protractor.Key.BACK_SPACE);
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(500);
    expect(element(by.css('[data-test-snapshot~="test-snapshot"] h2')).getText()).toContain('test-snapshot');
  });

  it('[4] click on system image should display the actions', () => {
    element(by.css('[data-test~="button_3"]')).click();
    browser.sleep(500);
    element(by.css('[data-test-system-image~="0"]')).click();
    browser.sleep(500);
    expect(element(by.css('[aria-labelledby~="acst-hdr-0"]')).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.DELETE'))).isPresent()).toBeFalsy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).isPresent()).toBeFalsy();
    //expect(element(by.partialButtonText(page.getLocal('ACTIONS.CREATE_SERVER'))).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.CANCEL'))).isDisplayed()).toBeTruthy();
  });
});
