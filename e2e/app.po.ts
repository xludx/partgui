import { browser, element, by } from 'protractor';

export class PartguiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('partgui-root h1')).getText();
  }
}
