import { TestAppFrontEndPage } from './app.po';

describe('test-app-front-end App', function() {
  let page: TestAppFrontEndPage;

  beforeEach(() => {
    page = new TestAppFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
