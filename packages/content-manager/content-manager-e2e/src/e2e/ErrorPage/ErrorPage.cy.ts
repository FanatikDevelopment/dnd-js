describe('content-manager-content-manager: ErrorPage component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=errorpage--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ErrorPage!');
    });
});
