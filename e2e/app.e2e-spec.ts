import { Ng2FuzhutechBlogPage } from './app.po';

describe('ng2-fuzhutech-blog App', () => {
  let page: Ng2FuzhutechBlogPage;

  beforeEach(() => {
    page = new Ng2FuzhutechBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
