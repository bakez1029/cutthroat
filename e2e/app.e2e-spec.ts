import { JefftestfirebasePage } from './app.po';

describe('jefftestfirebase App', function() {
  let page: JefftestfirebasePage;

  beforeEach(() => {
    page = new JefftestfirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
