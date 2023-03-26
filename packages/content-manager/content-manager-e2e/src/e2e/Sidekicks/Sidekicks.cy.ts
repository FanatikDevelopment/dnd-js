describe('content-manager-content-manager: Sidekicks component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sidekicks--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Sidekicks!');
    });
});
