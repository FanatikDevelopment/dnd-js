describe('content-manager-content-manager: ItemCategory component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=itemcategory--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ItemCategory!');
    });
});
