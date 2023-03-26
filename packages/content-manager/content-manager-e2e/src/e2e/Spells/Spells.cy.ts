describe('content-manager-content-manager: Spells component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=spells--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Spells!');
    });
});
