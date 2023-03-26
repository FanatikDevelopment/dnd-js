describe('content-manager-content-manager: Races component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=races--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Races!');
    });
});
