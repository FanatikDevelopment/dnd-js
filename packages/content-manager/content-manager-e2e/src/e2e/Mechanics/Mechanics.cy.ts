describe('content-manager-content-manager: Mechanics component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=mechanics--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Mechanics!');
    });
});
