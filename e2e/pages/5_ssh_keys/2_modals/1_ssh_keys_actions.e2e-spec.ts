import {browser, by, element, protractor} from "protractor";
import {Page} from "../../../app.po";

describe('[5][2] SSH-Key Actions', () => {
  let page: Page;

  beforeAll(() => {
    page = new Page();
    page.createProject();
    browser.sleep(500);
  });
  beforeEach(() => {
    page.navigateToMenuPoint(page.getLocal('PAGE.SSH_KEYS.TITLE'));
    browser.sleep(500);
  });

  it('[1] click on ssh key should display the actions', () => {
    element(by.css('[data-test~="kontakt@lukas-kaemmerling.de"]')).click();
    browser.sleep(500);
    expect(element(by.css('[aria-labelledby~="acst-hdr-0"]')).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.DELETE'))).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.CANCEL'))).isDisplayed()).toBeTruthy();
  });
  it('[2] click on ssh key and click cancel - nothing should happend', () => {
    element(by.css('[data-test~="kontakt@lukas-kaemmerling.de"]')).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.CANCEL'))).click();
    browser.sleep(500);
    expect(element(by.css('[aria-labelledby~="acst-hdr-0"]')).isPresent()).toBeFalsy();
    expect(element(by.css('[data-test~="kontakt@lukas-kaemmerling.de"] h2')).getText()).toContain('kontakt@lukas-kaemmerling.de');
    expect(element(by.css('[data-test~="kontakt@lukas-kaemmerling.de"] p')).getText()).toContain('83:6e:fe:c0:69:c2:a9:ab:c5:b7:c0:59:03:10:5f:b2');
  });
  it('[3] click on ssh key and click edit - type a new name', () => {
    element(by.css('[data-test~="kontakt@lukas-kaemmerling.de"]')).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).click();
    browser.sleep(500);
    expect(element(by.css('modal-editsshkey')).isPresent()).toBeTruthy();
    browser.sleep(500);
    element(by.css('#description input')).sendKeys('-R');
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(1000);
    expect(element(by.css('[data-test~="kontakt@lukas-kaemmerling.de-R"] h2')).getText()).toContain('kontakt@lukas-kaemmerling.de-R');
    expect(element(by.css('[data-test~="kontakt@lukas-kaemmerling.de-R"] p')).getText()).toContain('83:6e:fe:c0:69:c2:a9:ab:c5:b7:c0:59:03:10:5f:b2');
    element(by.css('[data-test~="kontakt@lukas-kaemmerling.de-R"]')).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).click();
    browser.sleep(500);
    element(by.css('#description input')).sendKeys(protractor.Key.BACK_SPACE);
    element(by.css('#description input')).sendKeys(protractor.Key.BACK_SPACE);
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(500);
    expect(element(by.css('[data-test~="kontakt@lukas-kaemmerling.de"] h2')).getText()).toContain('kontakt@lukas-kaemmerling.de');
    expect(element(by.css('[data-test~="kontakt@lukas-kaemmerling.de"] p')).getText()).toContain('83:6e:fe:c0:69:c2:a9:ab:c5:b7:c0:59:03:10:5f:b2');
  });
});
