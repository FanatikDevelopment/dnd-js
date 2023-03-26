describe('content-manager-content-manager: SecondaryBar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=secondarybar--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SecondaryBar!');
    });
});
