describe('content-manager-content-manager: TopBar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=topbar--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TopBar!');
    });
});
