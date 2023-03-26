describe('content-manager-content-manager: Backgrounds component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=backgrounds--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Backgrounds!');
    });
});
