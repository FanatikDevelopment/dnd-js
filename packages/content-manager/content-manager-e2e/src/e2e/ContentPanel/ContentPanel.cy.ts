describe('content-manager-content-manager: ContentPanel component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=contentpanel--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ContentPanel!');
    });
});
