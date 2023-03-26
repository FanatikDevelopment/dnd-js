describe('content-manager-content-manager: Item component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=item--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Item!');
    });
});
