describe('content-manager-content-manager: Npcs component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=npcs--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Npcs!');
    });
});
