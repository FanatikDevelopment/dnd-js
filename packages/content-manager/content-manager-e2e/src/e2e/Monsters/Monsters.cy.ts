describe('content-manager-content-manager: Monsters component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=monsters--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Monsters!');
    });
});
