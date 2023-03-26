describe('content-manager-content-manager: Classes component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=classes--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Classes!');
    });
});
