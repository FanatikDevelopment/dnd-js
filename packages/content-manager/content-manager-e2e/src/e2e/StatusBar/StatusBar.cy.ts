describe('content-manager-content-manager: StatusBar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=statusbar--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to StatusBar!');
    });
});
