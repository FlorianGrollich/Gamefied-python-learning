describe('Code Editor', () => {
  it('should display autocomplete suggestions', () => {
    cy.visit('http://localhost:3000/editor');
    cy.get('.monaco-editor').type('import ', { delay: 100 });
    cy.get('.monaco-editor').should('contain', 'import');
    cy.get('.monaco-editor').type('{enter}', { delay: 100 });
    cy.get('.monaco-editor').type('im', { delay: 100 });
    cy.wait(500);
    cy.get('.suggest-widget').should('be.visible');
    cy.get('.suggest-widget .monaco-list-row').contains('import').click();
    cy.get('.monaco-editor').should('contain.text', 'import');
  });
});