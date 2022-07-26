describe('End to end test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('MVP')
  })
})
