describe('content-manager-content-manager: Home component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=home--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Home!');
    });
});
