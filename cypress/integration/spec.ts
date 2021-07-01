it('loads examples', () => {
  cy.visit('/');
  cy.contains('p404 works!');
  cy.get('.nav > :nth-child(1) > .nav-link').click();
  cy.url().should('contain', '/home');
  cy.contains('Featured products');
  cy.get('.nav > :nth-child(2) > .nav-link').click();
});
