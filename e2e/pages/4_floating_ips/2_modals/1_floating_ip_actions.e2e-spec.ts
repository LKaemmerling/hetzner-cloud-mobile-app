import {browser, by, element, protractor} from "protractor";
import {Page} from "../../../app.po";

describe('[5][2] Floating IP Actions', () => {
  let page: Page;

  beforeAll(() => {
    page = new Page();
    page.createProject();
    browser.sleep(500);
  });
  beforeEach(() => {
    page.navigateToMenuPoint(page.getLocal('PAGE.FLOATING_IPS.TITLE'));
    browser.sleep(500);
  });

  it('[1] click on add button and create a floating ip', () => {
    element(by.id('add_floating_ip')).click();
    browser.sleep(500);
    expect(element(by.css('modal-addFloatingIP')).isPresent()).toBeTruthy();

    element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
    browser.sleep(500);
    expect(element(by.id('error_floating_ip')).isPresent()).toBeTruthy();
    expect(element(by.id('error_floating_ip')).getText()).toContain(page.getLocal('PAGE.FLOATING_IPS.MODAL.ADD.ERRORS.REQUIRED_DESCRIPTION'));

    element(by.css('#description input')).sendKeys('test-floating-ip');
    browser.sleep(500);

    element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
    browser.sleep(500);
    expect(element(by.id('error_floating_ip')).isPresent()).toBeTruthy();
    expect(element(by.id('error_floating_ip')).getText()).toContain(page.getLocal('PAGE.FLOATING_IPS.MODAL.ADD.ERRORS.REQUIRED_NETWORK_PROTOCOL'));

    element(by.id('type')).click();
    browser.sleep(500);
    element(by.id('rb-16-0')).click();
    browser.sleep(1000);
    element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
    browser.sleep(500);
    expect(element(by.id('error_floating_ip')).isPresent()).toBeTruthy();
    expect(element(by.id('error_floating_ip')).getText()).toContain(page.getLocal('PAGE.FLOATING_IPS.MODAL.ADD.ERRORS.REQUIRED_SERVER_OR_LOCATION'));

    element(by.id('location')).click();
    browser.sleep(500);
    element(by.id('rb-18-0')).click();
    browser.sleep(1000);
    element(by.buttonText(page.getLocal('ACTIONS.ORDER'))).click();
    browser.sleep(3000);
    expect(element(by.id('no_floating_ips')).isPresent()).toBeFalsy();
    expect(element.all(by.css('[data-test~="floating_ips"]')).count()).toEqual(1);
    expect(element(by.css("[data-test-floating-ip~='test-floating-ip'] h2")).getText()).toContain('test-floating-ip');
  });

  it('[2] click on floating ip should display the actions', () => {
    element(by.css("[data-test-floating-ip~='test-floating-ip']")).click();
    browser.sleep(500);
    expect(element(by.css('[aria-labelledby~="acst-hdr-0"]')).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.DELETE'))).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS'))).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).isDisplayed()).toBeTruthy();
    expect(element(by.partialButtonText(page.getLocal('ACTIONS.CANCEL'))).isDisplayed()).toBeTruthy();
  });

  it('[3] click on floating ip action cancel should do nothing', () => {
    element(by.css("[data-test-floating-ip~='test-floating-ip']")).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.CANCEL'))).click();
    browser.sleep(500);
    expect(element(by.css('[aria-labelledby~="acst-hdr-1"]')).isPresent()).toBeFalsy();
    expect(element.all(by.css('[data-test~="floating_ips"]')).count()).toEqual(1);
    expect(element(by.css("[data-test-floating-ip~='test-floating-ip'] h2")).getText()).toContain('test-floating-ip');
  });
  it('[3] click on floating ip action edit and edit the floating ip', () => {
    element(by.css("[data-test-floating-ip~='test-floating-ip']")).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).click();
    browser.sleep(500);
    expect(element(by.css('modal-editFloatingIp')).isPresent()).toBeTruthy();
    browser.sleep(500);
    element(by.css('#description input')).sendKeys('-R');
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(1000);
    expect(element(by.css('[data-test-floating-ip~="test-floating-ip-R"] h2')).getText()).toContain('test-floating-ip-R');
    element(by.css('[data-test-floating-ip~="test-floating-ip-R"]')).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.EDIT'))).click();
    browser.sleep(500);
    element(by.css('#description input')).sendKeys(protractor.Key.BACK_SPACE);
    element(by.css('#description input')).sendKeys(protractor.Key.BACK_SPACE);
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.SAVE'))).click();
    browser.sleep(500);
    expect(element(by.css('[data-test-floating-ip~="test-floating-ip"] h2')).getText()).toContain('test-floating-ip');
  });
  it('[4] click on floating ip action open details and the details page should be opened', () => {
    element(by.css("[data-test-floating-ip~='test-floating-ip']")).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.OPEN_DETAILS'))).click();
    browser.sleep(500);
    expect(element(by.css('page-floatingIP')).isPresent()).toBeTruthy();
  });
  it('[5] click on floating ip action delete and the floating ip should be deleted', () => {
    element(by.css("[data-test-floating-ip~='test-floating-ip']")).click();
    browser.sleep(500);
    element(by.partialButtonText(page.getLocal('ACTIONS.DELETE'))).click();
    browser.sleep(500);
    browser.switchTo().alert().accept();
    browser.sleep(500);
    expect(element(by.id('no_floating_ips')).isDisplayed()).toBeTruthy();
    expect(element(by.id('no_floating_ips')).getText()).toContain(page.getLocal('PAGE.FLOATING_IPS.NO_FLOATING_IPS'));
  });
});
