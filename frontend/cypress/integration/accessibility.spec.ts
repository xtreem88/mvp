import 'cypress-axe';


describe('Component accessibility test', () => {
  it('product list page has no detectable accessibility violations on load', () => {
    cy.visit(`${Cypress.config().baseUrl}/product`);
    cy.injectAxe()
    cy.checkA11y();
  });
  it('product view page has no detectable accessibility violations on load', () => {
    cy.visit(`${Cypress.config().baseUrl}/product/1`);
    cy.injectAxe()
    cy.checkA11y();
  });
});
