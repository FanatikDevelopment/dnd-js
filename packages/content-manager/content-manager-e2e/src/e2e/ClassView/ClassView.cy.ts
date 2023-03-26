describe('content-manager-content-manager: ClassView component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=classview--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ClassView!');
    });
});
