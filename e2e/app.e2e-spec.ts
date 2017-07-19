import { EdutivePage } from './app.po';

describe('edutive App', () => {
  let page: EdutivePage;

  beforeEach(() => {
    page = new EdutivePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
