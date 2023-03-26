describe('content-manager-content-manager: ItemManagement component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=itemmanagement--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ItemManagement!');
    });
});
